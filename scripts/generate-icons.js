/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');
const { pascalCase } = require('change-case');
const fg = require('fast-glob');

// Fuente de SVGs (actualizado a assets/icons)
const svgDir = path.resolve(__dirname, '../assets/icons');
const outDir = path.resolve(__dirname, '../src/icons');

if (!fs.existsSync(svgDir)) fs.mkdirSync(svgDir, { recursive: true });
// Evitar borrar completamente para no perder trabajo manual
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function extractViewBox(svg) {
  const m = svg.match(/viewBox=\"([^\"]+)\"/);
  return m ? m[1] : '0 0 24 24';
}

function extractInner(svg) {
  const noNewlines = svg.replace(/\r?\n/g, '');
  const mOpen = noNewlines.match(/<svg[^>]*>/);
  if (!mOpen) return svg;
  const start = mOpen.index + mOpen[0].length;
  const end = noNewlines.lastIndexOf('</svg>');
  return noNewlines.slice(start, end).trim();
}

function toCurrentColor(svgInner) {
  return svgInner
    .replace(/stroke=\"(?!none)[^\"]+\"/g, 'stroke="currentColor"')
    .replace(/fill=\"(?!none)[^\"]+\"/g, 'fill="currentColor"');
}

function sanitizeIdentifier(input, prefix = 'Icon') {
  // Quitar extensión y normalizar caracteres
  const withoutExt = input.replace(/\.[^\/.]+$/, '');
  const normalized = pascalCase(withoutExt.replace(/[^a-zA-Z0-9]+/g, ' '));
  if (!normalized) return prefix;
  return /^[0-9]/.test(normalized) ? prefix + normalized : normalized;
}

// Kebab-case seguro para carpetas (reemplaza espacios y & por '-')
function sanitizeFolderName(name) {
  return name
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

function buildComponent(importBase, importTypes, name, viewBox, inner) {
  return `import React from 'react';\nimport IconBase from '${importBase}';\nimport { IconProps } from '${importTypes}';\n\nconst ${name} = (props: IconProps) => (\n  <IconBase {...props} viewBox="${viewBox}">\n    ${inner}\n  </IconBase>\n);\n\nexport default ${name};\n`;
}

function run() {
  const files = fg.sync('**/*.svg', { cwd: svgDir, absolute: true });
  if (files.length === 0) {
    console.log('No se encontraron SVG en assets/icons.');
    return;
  }
  files.forEach((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = optimize(raw, {
      multipass: true,
      plugins: [
        'removeDimensions',
        {
          name: 'preset-default',
          params: { overrides: { removeViewBox: false } },
        },
      ],
    });
    const viewBox = extractViewBox(data);
    const inner = toCurrentColor(extractInner(data));
    const relSvgPath = path.relative(svgDir, filePath); // e.g. 'Arrows/chevron-left.svg'
    const dirSvg = path.dirname(relSvgPath); // e.g. 'Arrows'
    const rawBase = path.basename(filePath, '.svg');
    const name = sanitizeIdentifier(rawBase, 'Icon');

    // Normalizar cada segmento de carpeta a kebab-case seguro
    const sanitizedDir = dirSvg
      .split(path.sep)
      .filter(Boolean)
      .map(sanitizeFolderName)
      .join(path.sep);

    const outDirForFile = path.join(outDir, sanitizedDir);
    if (!fs.existsSync(outDirForFile)) fs.mkdirSync(outDirForFile, { recursive: true });
    const depth = sanitizedDir === '' ? 1 : sanitizedDir.split(path.sep).length + 1; // relative import depth to src
    // compute relative imports to IconBase and types from nested folder
    const up = Array(depth).fill('..').join('/');
    const importBase = `${up}/IconBase`;
    const importTypes = `${up}/types`;
    const outFile = path.join(outDirForFile, `${name}.tsx`);
    fs.writeFileSync(outFile, buildComponent(importBase, importTypes, name, viewBox, inner));
    console.log(`✓ Generado ${path.basename(outFile)} → ${sanitizedDir || '.'}`);
  });
  // Regenerar índices recursivamente
  function writeIndexRecursively(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile() && e.name.endsWith('.tsx'));
    const folders = entries.filter((e) => e.isDirectory());

    const exportLines = [];
    files
      .map((f) => path.basename(f.name, '.tsx'))
      .sort()
      .forEach((name) => {
        exportLines.push(`export { default as ${name} } from './${name}';`);
      });
    folders
      .map((f) => f.name)
      .sort()
      .forEach((folder) => {
        const alias = sanitizeIdentifier(folder, 'Group');
        exportLines.push(`export * as ${alias} from './${folder}';`);
      });

    fs.writeFileSync(path.join(dir, 'index.ts'), exportLines.join('\n') + '\n');
    folders.forEach((f) => writeIndexRecursively(path.join(dir, f.name)));
  }
  writeIndexRecursively(outDir);
  console.log('✓ Índices recursivos generados en src/icons');
}

run();


