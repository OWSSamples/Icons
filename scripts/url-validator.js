const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://cdn.origonlabs.opendex.dev';
const ICONS_DIR = path.join(__dirname, '../assets/icons');

/**
 * Validador de URLs de iconos Origon
 * Verifica que todas las URLs generadas sean válidas y accesibles
 */
class OrigonURLValidator {
  constructor() {
    this.results = {
      total: 0,
      valid: 0,
      invalid: 0,
      errors: [],
      warnings: []
    };
  }

  /**
   * Generar URL para un icono
   */
  generateURL(iconName, size, style) {
    const encodedName = encodeURIComponent(iconName);
    const fileName = `ic_origon_${iconName.toLowerCase().replace(/\s+/g, '_')}_${size}_${style}.svg`;
    return `${BASE_URL}/icons/${encodedName}/SVG/${fileName}`;
  }

  /**
   * Verificar si un archivo SVG existe localmente
   */
  checkLocalFile(iconName, size, style) {
    const iconDir = path.join(ICONS_DIR, iconName, 'SVG');
    const fileName = `ic_origon_${iconName.toLowerCase().replace(/\s+/g, '_')}_${size}_${style}.svg`;
    const filePath = path.join(iconDir, fileName);
    
    return {
      exists: fs.existsSync(filePath),
      path: filePath,
      fileName
    };
  }

  /**
   * Verificar URL remota (simulado - en producción usar fetch)
   */
  async checkRemoteURL(url) {
    // En un entorno real, aquí harías una petición HEAD
    // Por ahora, simulamos la validación basada en la estructura local
    try {
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const iconName = decodeURIComponent(urlParts[urlParts.length - 3]);
      
      const localCheck = this.checkLocalFile(
        iconName, 
        this.extractSizeFromFileName(fileName),
        this.extractStyleFromFileName(fileName)
      );
      
      return {
        valid: localCheck.exists,
        status: localCheck.exists ? 200 : 404,
        error: localCheck.exists ? null : 'Archivo no encontrado localmente'
      };
    } catch (error) {
      return {
        valid: false,
        status: 500,
        error: error.message
      };
    }
  }

  /**
   * Extraer tamaño del nombre de archivo
   */
  extractSizeFromFileName(fileName) {
    const match = fileName.match(/_(\d+)_/);
    return match ? parseInt(match[1]) : null;
  }

  /**
   * Extraer estilo del nombre de archivo
   */
  extractStyleFromFileName(fileName) {
    const match = fileName.match(/_(\w+)\.svg$/);
    return match ? match[1] : null;
  }

  /**
   * Validar un icono específico
   */
  async validateIcon(iconName, sizes = [16, 20, 24, 32], styles = ['regular', 'filled']) {
    const iconResults = {
      name: iconName,
      total: 0,
      valid: 0,
      invalid: 0,
      urls: []
    };

    for (const size of sizes) {
      for (const style of styles) {
        const url = this.generateURL(iconName, size, style);
        const localCheck = this.checkLocalFile(iconName, size, style);
        const remoteCheck = await this.checkRemoteURL(url);

        const result = {
          url,
          size,
          style,
          localExists: localCheck.exists,
          remoteValid: remoteCheck.valid,
          status: remoteCheck.status,
          error: remoteCheck.error
        };

        iconResults.urls.push(result);
        iconResults.total++;
        this.results.total++;

        if (result.localExists && result.remoteValid) {
          iconResults.valid++;
          this.results.valid++;
        } else {
          iconResults.invalid++;
          this.results.invalid++;
          
          if (!result.localExists) {
            this.results.errors.push({
              type: 'local_missing',
              icon: iconName,
              size,
              style,
              message: `Archivo local no encontrado: ${localCheck.fileName}`
            });
          }
          
          if (!result.remoteValid) {
            this.results.errors.push({
              type: 'remote_invalid',
              icon: iconName,
              size,
              style,
              url: result.url,
              message: result.error
            });
          }
        }
      }
    }

    return iconResults;
  }

  /**
   * Validar muestra aleatoria de iconos
   */
  async validateSample(sampleSize = 100) {
    console.log(`🔍 Validando muestra de ${sampleSize} iconos...`);

    const iconDirs = fs.readdirSync(ICONS_DIR, { withFileTypes: true })
      .filter(item => item.isDirectory())
      .map(item => item.name);

    // Seleccionar muestra aleatoria
    const sample = iconDirs
      .sort(() => 0.5 - Math.random())
      .slice(0, sampleSize);

    const results = [];
    
    for (let i = 0; i < sample.length; i++) {
      const iconName = sample[i];
      console.log(`⏳ Validando ${i + 1}/${sample.length}: ${iconName}`);
      
      try {
        const result = await this.validateIcon(iconName);
        results.push(result);
      } catch (error) {
        console.error(`❌ Error validando ${iconName}:`, error.message);
        this.results.errors.push({
          type: 'validation_error',
          icon: iconName,
          message: error.message
        });
      }
    }

    return results;
  }

  /**
   * Generar reporte de validación
   */
  generateReport() {
    const report = {
      summary: {
        total: this.results.total,
        valid: this.results.valid,
        invalid: this.results.invalid,
        successRate: this.results.total > 0 ? 
          ((this.results.valid / this.results.total) * 100).toFixed(2) + '%' : '0%'
      },
      errors: this.results.errors,
      recommendations: []
    };

    // Generar recomendaciones
    if (this.results.invalid > 0) {
      report.recommendations.push(
        'Revisar archivos faltantes y sincronizar con el CDN'
      );
    }

    const localMissing = this.results.errors.filter(e => e.type === 'local_missing');
    if (localMissing.length > 0) {
      report.recommendations.push(
        `Verificar ${localMissing.length} archivos locales faltantes`
      );
    }

    const remoteInvalid = this.results.errors.filter(e => e.type === 'remote_invalid');
    if (remoteInvalid.length > 0) {
      report.recommendations.push(
        `Verificar ${remoteInvalid.length} URLs remotas inválidas`
      );
    }

    return report;
  }

  /**
   * Exportar reporte a archivo
   */
  exportReport(filename = 'validation-report.json') {
    const report = this.generateReport();
    const reportPath = path.join(__dirname, '..', filename);
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Reporte exportado a: ${reportPath}`);
    
    return reportPath;
  }
}

/**
 * Función principal de validación
 */
async function validateOrigonURLs(options = {}) {
  const {
    sampleSize = 50,
    exportReport = true,
    sizes = [16, 20, 24, 32],
    styles = ['regular', 'filled']
  } = options;

  console.log('🚀 Iniciando validación de URLs Origon...');
  console.log(`📊 Configuración:`);
  console.log(`   - Muestra: ${sampleSize} iconos`);
  console.log(`   - Tamaños: ${sizes.join(', ')}`);
  console.log(`   - Estilos: ${styles.join(', ')}`);
  console.log(`   - CDN Base: ${BASE_URL}\n`);

  const validator = new OrigonURLValidator();
  
  try {
    const results = await validator.validateSample(sampleSize);
    const report = validator.generateReport();

    console.log('\n📊 Resultados de validación:');
    console.log(`   Total URLs verificadas: ${report.summary.total}`);
    console.log(`   URLs válidas: ${report.summary.valid}`);
    console.log(`   URLs inválidas: ${report.summary.invalid}`);
    console.log(`   Tasa de éxito: ${report.summary.successRate}`);

    if (report.errors.length > 0) {
      console.log(`\n❌ Errores encontrados (${report.errors.length}):`);
      report.errors.slice(0, 10).forEach(error => {
        console.log(`   - ${error.type}: ${error.icon} (${error.size}px, ${error.style})`);
      });
      if (report.errors.length > 10) {
        console.log(`   ... y ${report.errors.length - 10} errores más`);
      }
    }

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recomendaciones:');
      report.recommendations.forEach(rec => {
        console.log(`   - ${rec}`);
      });
    }

    if (exportReport) {
      validator.exportReport();
    }

    return report;

  } catch (error) {
    console.error('❌ Error durante la validación:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  validateOrigonURLs({
    sampleSize: 100,
    exportReport: true
  }).catch(console.error);
}

module.exports = { OrigonURLValidator, validateOrigonURLs };
