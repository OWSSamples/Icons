const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ENDPOINT_URL = 'https://685457b7c4529ea63b6daef6bd6fac0b.r2.cloudflarestorage.com';
const BUCKET_NAME = 'origonlabs';
const ICONS_DIR = path.join(__dirname, '../assets/icons');

// Configuración del cliente S3
const s3Client = new S3Client({
  endpoint: ENDPOINT_URL,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY
  }
});

/**
 * Calcular hash MD5 de un archivo
 */
function calculateFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

/**
 * Verificar si un objeto existe en S3 y obtener su metadata
 */
async function checkObjectExists(key) {
  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });
    
    const response = await s3Client.send(command);
    return {
      exists: true,
      etag: response.ETag?.replace(/"/g, ''),
      lastModified: response.LastModified,
      size: response.ContentLength
    };
  } catch (error) {
    if (error.name === 'NotFound') {
      return { exists: false };
    }
    throw error;
  }
}

/**
 * Subir archivo a S3 con headers optimizados
 */
async function uploadFile(localPath, s3Key, contentType = 'image/svg+xml') {
  const fileContent = fs.readFileSync(localPath);
  const fileHash = calculateFileHash(localPath);
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: s3Key,
    Body: fileContent,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
    ETag: `"${fileHash}"`,
    Metadata: {
      'origon-version': '1.0.0',
      'upload-timestamp': new Date().toISOString(),
      'file-hash': fileHash
    }
  });

  await s3Client.send(command);
  return { success: true, etag: fileHash };
}

/**
 * Sincronización optimizada de iconos
 */
async function syncIconsOptimized(options = {}) {
  const {
    dryRun = false,
    force = false,
    batchSize = 50,
    includePattern = '*.svg',
    excludePattern = null
  } = options;

  console.log('🚀 Iniciando sincronización optimizada...');
  console.log(`📊 Configuración:`);
  console.log(`   - Modo: ${dryRun ? 'DRY RUN' : 'UPLOAD'}`);
  console.log(`   - Forzar: ${force ? 'SÍ' : 'NO'}`);
  console.log(`   - Lote: ${batchSize} archivos`);
  console.log(`   - Patrón: ${includePattern}\n`);

  const stats = {
    total: 0,
    uploaded: 0,
    skipped: 0,
    errors: 0,
    bytesUploaded: 0,
    startTime: Date.now()
  };

  // Recopilar todos los archivos SVG
  const svgFiles = [];
  
  function collectSVGFiles(dirPath, relativePath = '') {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      const relPath = path.join(relativePath, item.name);
      
      if (item.isDirectory()) {
        collectSVGFiles(fullPath, relPath);
      } else if (item.isFile() && item.name.endsWith('.svg')) {
        svgFiles.push({
          localPath: fullPath,
          s3Key: `icons/${relPath}`,
          size: fs.statSync(fullPath).size
        });
      }
    }
  }

  collectSVGFiles(ICONS_DIR);
  stats.total = svgFiles.length;

  console.log(`📁 Encontrados ${stats.total} archivos SVG`);

  // Procesar archivos en lotes
  for (let i = 0; i < svgFiles.length; i += batchSize) {
    const batch = svgFiles.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(svgFiles.length / batchSize);

    console.log(`\n⏳ Procesando lote ${batchNumber}/${totalBatches} (${batch.length} archivos)...`);

    const batchPromises = batch.map(async (file) => {
      try {
        // Verificar si el archivo ya existe en S3
        const remoteInfo = await checkObjectExists(file.s3Key);
        
        if (remoteInfo.exists && !force) {
          // Verificar si el archivo local ha cambiado
          const localHash = calculateFileHash(file.localPath);
          
          if (remoteInfo.etag === localHash) {
            stats.skipped++;
            return { status: 'skipped', reason: 'sin cambios' };
          }
        }

        if (dryRun) {
          stats.skipped++;
          return { status: 'would_upload', reason: 'dry run' };
        }

        // Subir archivo
        await uploadFile(file.localPath, file.s3Key);
        stats.uploaded++;
        stats.bytesUploaded += file.size;
        
        return { status: 'uploaded', size: file.size };

      } catch (error) {
        stats.errors++;
        console.error(`❌ Error procesando ${file.s3Key}:`, error.message);
        return { status: 'error', error: error.message };
      }
    });

    // Esperar a que termine el lote
    const batchResults = await Promise.all(batchPromises);
    
    // Mostrar progreso del lote
    const uploaded = batchResults.filter(r => r.status === 'uploaded').length;
    const skipped = batchResults.filter(r => r.status === 'skipped').length;
    const errors = batchResults.filter(r => r.status === 'error').length;
    
    console.log(`   ✅ Subidos: ${uploaded}, ⏭️ Omitidos: ${skipped}, ❌ Errores: ${errors}`);
  }

  // Calcular estadísticas finales
  const duration = (Date.now() - stats.startTime) / 1000;
  const mbUploaded = (stats.bytesUploaded / 1024 / 1024).toFixed(2);
  const avgSpeed = stats.bytesUploaded > 0 ? (mbUploaded / duration).toFixed(2) : 0;

  console.log('\n📊 Resumen de sincronización:');
  console.log(`   Archivos totales: ${stats.total}`);
  console.log(`   Archivos subidos: ${stats.uploaded}`);
  console.log(`   Archivos omitidos: ${stats.skipped}`);
  console.log(`   Errores: ${stats.errors}`);
  console.log(`   Tamaño subido: ${mbUploaded} MB`);
  console.log(`   Tiempo total: ${duration.toFixed(2)}s`);
  console.log(`   Velocidad promedio: ${avgSpeed} MB/s`);

  if (dryRun) {
    console.log('\n💡 Este fue un DRY RUN. Para subir archivos, ejecuta sin --dry-run');
  }

  return stats;
}

/**
 * Sincronización incremental (solo archivos modificados)
 */
async function syncIncremental() {
  console.log('🔄 Iniciando sincronización incremental...');
  return await syncIconsOptimized({
    dryRun: false,
    force: false,
    batchSize: 100
  });
}

/**
 * Sincronización completa (forzar todos los archivos)
 */
async function syncFull() {
  console.log('🔄 Iniciando sincronización completa...');
  return await syncIconsOptimized({
    dryRun: false,
    force: true,
    batchSize: 50
  });
}

/**
 * Verificar estado de sincronización
 */
async function checkSyncStatus() {
  console.log('🔍 Verificando estado de sincronización...');
  return await syncIconsOptimized({
    dryRun: true,
    force: false,
    batchSize: 100
  });
}

// Manejo de argumentos de línea de comandos
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0] || 'incremental';

  switch (command) {
    case 'incremental':
      syncIncremental().catch(console.error);
      break;
    case 'full':
      syncFull().catch(console.error);
      break;
    case 'check':
      checkSyncStatus().catch(console.error);
      break;
    case 'dry-run':
      syncIconsOptimized({ dryRun: true }).catch(console.error);
      break;
    default:
      console.log('Uso: node sync-optimized.js [incremental|full|check|dry-run]');
      console.log('  incremental - Sincronizar solo archivos modificados (por defecto)');
      console.log('  full        - Forzar sincronización de todos los archivos');
      console.log('  check       - Verificar estado sin subir archivos');
      console.log('  dry-run     - Simular sincronización sin subir archivos');
  }
}

module.exports = {
  syncIconsOptimized,
  syncIncremental,
  syncFull,
  checkSyncStatus
};
