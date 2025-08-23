const fs = require('fs');
const path = require('path');

// Configuración de estilos y sus sufijos
const styles = {
  Duotone: '-duotone',
  'Duotone Line': '-duotone-line',
  Filled: '-filled',
  Light: '-light',
  Regular: '-regular',
};

// Función para renombrar archivos en una carpeta de estilo
function renameFilesInStyleFolder(categoryPath, styleFolder, suffix) {
  const stylePath = path.join(categoryPath, styleFolder);

  if (!fs.existsSync(stylePath)) {
    console.log(`⚠️  Carpeta no encontrada: ${stylePath}`);
    return 0;
  }

  const files = fs.readdirSync(stylePath);
  let renamedCount = 0;

  files.forEach(file => {
    if (file.endsWith('.svg')) {
      const oldPath = path.join(stylePath, file);
      const fileName = path.parse(file).name;
      const extension = path.parse(file).ext;

      // Verificar si ya tiene el sufijo
      if (fileName.endsWith(suffix)) {
        console.log(`✅ ${file} ya tiene el sufijo correcto`);
        return;
      }

      const newFileName = `${fileName}${suffix}${extension}`;
      const newPath = path.join(stylePath, newFileName);

      try {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ Renombrado: ${file} → ${newFileName}`);
        renamedCount++;
      } catch (error) {
        console.error(`❌ Error renombrando ${file}:`, error.message);
      }
    }
  });

  return renamedCount;
}

// Función para renombrar todos los estilos de una categoría
function renameCategoryIcons(categoryName) {
  const categoryPath = path.join(
    __dirname,
    '..',
    'assets',
    'svg',
    categoryName
  );

  if (!fs.existsSync(categoryPath)) {
    console.error(`❌ Categoría no encontrada: ${categoryPath}`);
    return 0;
  }

  console.log(`\n🔄 Renombrando iconos de la categoría: ${categoryName}`);
  console.log('='.repeat(50));

  let totalRenamed = 0;

  Object.entries(styles).forEach(([styleFolder, suffix]) => {
    console.log(`\n📁 Procesando estilo: ${styleFolder}`);
    const renamed = renameFilesInStyleFolder(categoryPath, styleFolder, suffix);
    totalRenamed += renamed;
  });

  console.log(
    `\n✅ Categoría ${categoryName} completada. Archivos renombrados: ${totalRenamed}`
  );
  return totalRenamed;
}

// Función principal para procesar todas las categorías
function renameAllCategories() {
  const svgPath = path.join(__dirname, '..', 'assets', 'svg');

  if (!fs.existsSync(svgPath)) {
    console.error(`❌ Directorio SVG no encontrado: ${svgPath}`);
    return;
  }

  const categories = fs.readdirSync(svgPath).filter(item => {
    const itemPath = path.join(svgPath, item);
    return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
  });

  console.log(`🚀 Iniciando renombrado de ${categories.length} categorías...`);
  console.log('='.repeat(60));

  let grandTotal = 0;

  categories.forEach((category, index) => {
    console.log(
      `\n📂 [${index + 1}/${categories.length}] Procesando: ${category}`
    );
    const renamed = renameCategoryIcons(category);
    grandTotal += renamed;
  });

  console.log(`\n🎉 ¡PROCESO COMPLETADO!`);
  console.log('='.repeat(60));
  console.log(`📊 Total de archivos renombrados: ${grandTotal}`);
  console.log(`📁 Categorías procesadas: ${categories.length}`);
  console.log(`🎨 Estilos por categoría: ${Object.keys(styles).length}`);
}

// Ejecutar el script
if (require.main === module) {
  const category = process.argv[2];

  if (category) {
    // Procesar una categoría específica
    renameCategoryIcons(category);
  } else {
    // Procesar todas las categorías
    renameAllCategories();
  }
}

module.exports = { renameCategoryIcons, renameAllCategories, styles };
