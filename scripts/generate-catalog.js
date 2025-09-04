const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://cdn.origonlabs.opendex.dev';
const ICONS_DIR = path.join(__dirname, '../assets/icons');

function generateCatalog() {
  const catalog = {
    version: '1.0.0',
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    totalIcons: 0,
    totalVariants: 0,
    categories: {},
    sizes: new Set(),
    styles: new Set(),
    icons: [],
    searchIndex: {},
  };

  function scanDirectory(dirPath, categoryName = '') {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);

      if (item.isDirectory()) {
        // Si es una carpeta SVG, es un icono
        if (item.name === 'SVG') {
          const iconName = path.basename(path.dirname(fullPath));
          const svgFiles = fs
            .readdirSync(fullPath)
            .filter(f => f.endsWith('.svg'));

          const icon = {
            name: iconName,
            category: categoryName || 'General',
            variants: [],
          };

          for (const svgFile of svgFiles) {
            const match = svgFile.match(/ic_origon_(.+)_(\d+)_(.+)\.svg$/);
            if (match) {
              const [, name, size, style] = match;
              const url = `${BASE_URL}/icons/${encodeURIComponent(iconName)}/SVG/${svgFile}`;
              const sizeNum = parseInt(size);

              icon.variants.push({
                size: sizeNum,
                style: style,
                url: url,
                filename: svgFile,
              });

              // Agregar a sets globales
              catalog.sizes.add(sizeNum);
              catalog.styles.add(style);
              catalog.totalVariants++;
            }
          }

          if (icon.variants.length > 0) {
            catalog.icons.push(icon);
            catalog.totalIcons++;

            // Agregar a categorías
            if (!catalog.categories[icon.category]) {
              catalog.categories[icon.category] = 0;
            }
            catalog.categories[icon.category]++;
          }
        } else {
          // Recursivamente escanear subcarpetas
          scanDirectory(fullPath, item.name);
        }
      }
    }
  }

  // Escanear directorio de iconos
  scanDirectory(ICONS_DIR);

  // Ordenar iconos por nombre
  catalog.icons.sort((a, b) => a.name.localeCompare(b.name));

  // Convertir Sets a Arrays y ordenar
  catalog.sizes = Array.from(catalog.sizes).sort((a, b) => a - b);
  catalog.styles = Array.from(catalog.styles).sort();

  // Generar índice de búsqueda
  catalog.icons.forEach((icon, index) => {
    const searchTerms = [
      icon.name.toLowerCase(),
      icon.category.toLowerCase(),
      ...icon.name.toLowerCase().split(' '),
      ...icon.category.toLowerCase().split(' '),
    ];

    searchTerms.forEach(term => {
      if (!catalog.searchIndex[term]) {
        catalog.searchIndex[term] = [];
      }
      catalog.searchIndex[term].push(index);
    });
  });

  // Generar archivo JSON
  const outputPath = path.join(__dirname, '../catalog.json');
  fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2));

  console.log(
    `✅ Catálogo generado: ${catalog.totalIcons} iconos, ${catalog.totalVariants} variantes en ${Object.keys(catalog.categories).length} categorías`
  );
  console.log(`📏 Tamaños disponibles: ${catalog.sizes.join(', ')}`);
  console.log(`🎨 Estilos disponibles: ${catalog.styles.join(', ')}`);
  console.log(`📁 Archivo: ${outputPath}`);

  return catalog;
}

if (require.main === module) {
  generateCatalog();
}

module.exports = { generateCatalog };
