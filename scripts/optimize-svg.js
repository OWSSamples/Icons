const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');

const ICONS_DIR = path.join(__dirname, '../assets/icons');

// Configuración de optimización SVGO
const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Mantener viewBox para escalabilidad
          removeViewBox: false,
          // Mantener IDs para compatibilidad
          cleanupIds: false,
          // Optimizar paths
          convertPathData: true,
          // Remover metadatos innecesarios
          removeMetadata: true,
          removeComments: true,
          removeEditorsNSData: true,
          // Optimizar colores
          convertColors: true,
          // Remover elementos vacíos
          removeEmptyContainers: true,
          // Optimizar transformaciones
          convertTransform: true,
          // Remover atributos por defecto
          removeDefaultAttributes: true,
          // Optimizar grupos
          mergePaths: true,
          // Remover elementos ocultos
          removeHiddenElems: true,
          // Optimizar texto
          removeEmptyText: true,
          // Remover elementos no utilizados
          removeUnusedNS: true,
        }
      }
    },
    // Plugin personalizado para optimizaciones específicas
    {
      name: 'removeDimensions',
      type: 'visitor',
      params: {},
      visitor: {
        element: {
          enter: (node) => {
            // Remover width y height si existe viewBox
            if (node.attributes.viewBox && (node.attributes.width || node.attributes.height)) {
              delete node.attributes.width;
              delete node.attributes.height;
            }
          }
        }
      }
    }
  ]
};

async function optimizeSVG(filePath) {
  try {
    const svgContent = fs.readFileSync(filePath, 'utf8');
    const result = optimize(svgContent, {
      path: filePath,
      ...svgoConfig
    });

    if (result.data) {
      const originalSize = Buffer.byteLength(svgContent, 'utf8');
      const optimizedSize = Buffer.byteLength(result.data, 'utf8');
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);

      return {
        success: true,
        originalSize,
        optimizedSize,
        savings: parseFloat(savings),
        data: result.data
      };
    } else {
      return {
        success: false,
        error: 'No se pudo optimizar el SVG'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function optimizeAllSVGs() {
  console.log('🔧 Iniciando optimización de SVGs...');
  
  let totalFiles = 0;
  let optimizedFiles = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let errors = [];

  function scanDirectory(dirPath) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.isFile() && item.name.endsWith('.svg')) {
        totalFiles++;
        processSVGFile(fullPath);
      }
    }
  }

  async function processSVGFile(filePath) {
    try {
      const result = await optimizeSVG(filePath);
      
      if (result.success) {
        // Solo sobrescribir si hay ahorro significativo (>1%)
        if (result.savings > 1) {
          fs.writeFileSync(filePath, result.data, 'utf8');
          optimizedFiles++;
          totalOriginalSize += result.originalSize;
          totalOptimizedSize += result.optimizedSize;
          
          if (result.savings > 10) {
            console.log(`✅ ${path.basename(filePath)}: ${result.savings}% ahorro`);
          }
        }
      } else {
        errors.push({ file: filePath, error: result.error });
      }
    } catch (error) {
      errors.push({ file: filePath, error: error.message });
    }
  }

  // Procesar archivos en lotes para evitar sobrecarga de memoria
  const svgFiles = [];
  function collectSVGFiles(dirPath) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isDirectory()) {
        collectSVGFiles(fullPath);
      } else if (item.isFile() && item.name.endsWith('.svg')) {
        svgFiles.push(fullPath);
      }
    }
  }

  collectSVGFiles(ICONS_DIR);
  totalFiles = svgFiles.length;

  console.log(`📁 Procesando ${totalFiles} archivos SVG...`);

  // Procesar en lotes de 50
  const batchSize = 50;
  for (let i = 0; i < svgFiles.length; i += batchSize) {
    const batch = svgFiles.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (filePath) => {
      try {
        const result = await optimizeSVG(filePath);
        
        if (result.success && result.savings > 1) {
          fs.writeFileSync(filePath, result.data, 'utf8');
          optimizedFiles++;
          totalOriginalSize += result.originalSize;
          totalOptimizedSize += result.optimizedSize;
        }
      } catch (error) {
        errors.push({ file: filePath, error: error.message });
      }
    }));

    // Mostrar progreso
    const progress = Math.min(i + batchSize, svgFiles.length);
    console.log(`⏳ Progreso: ${progress}/${totalFiles} archivos procesados`);
  }

  // Mostrar resultados
  const totalSavings = totalOriginalSize > 0 ? 
    ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(2) : 0;

  console.log('\n📊 Resultados de optimización:');
  console.log(`   Archivos procesados: ${totalFiles}`);
  console.log(`   Archivos optimizados: ${optimizedFiles}`);
  console.log(`   Tamaño original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Tamaño optimizado: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Ahorro total: ${totalSavings}% (${((totalOriginalSize - totalOptimizedSize) / 1024).toFixed(2)} KB)`);

  if (errors.length > 0) {
    console.log(`\n❌ Errores (${errors.length}):`);
    errors.slice(0, 10).forEach(error => {
      console.log(`   ${path.basename(error.file)}: ${error.error}`);
    });
    if (errors.length > 10) {
      console.log(`   ... y ${errors.length - 10} errores más`);
    }
  }

  return {
    totalFiles,
    optimizedFiles,
    totalOriginalSize,
    totalOptimizedSize,
    totalSavings: parseFloat(totalSavings),
    errors
  };
}

// Ejecutar si se llama directamente
if (require.main === module) {
  optimizeAllSVGs().catch(console.error);
}

module.exports = { optimizeSVG, optimizeAllSVGs };
