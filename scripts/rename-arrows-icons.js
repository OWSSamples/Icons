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
    return;
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

// Función principal para renombrar todos los estilos de una categoría
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
    return;
  }

  console.log(`\n🔄 Renombrando iconos de la categoría: ${categoryName}`);
  console.log('='.repeat(50));

  let totalRenamed = 0;

  Object.entries(styles).forEach(([styleFolder, suffix]) => {
    console.log(`\n📁 Procesando estilo: ${styleFolder}`);
    const renamed = renameFilesInStyleFolder(categoryPath, styleFolder, suffix);
    if (renamed) {
      totalRenamed += renamed;
    }
  });

  console.log(
    `\n🎉 ¡Completado! Total de archivos renombrados: ${totalRenamed}`
  );
}

// Ejecutar el script
if (require.main === module) {
  const category = process.argv[2] || 'Arrows';
  renameCategoryIcons(category);
}

module.exports = { renameCategoryIcons, styles };
