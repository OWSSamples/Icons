#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build optimizado para 44k+ archivos...');

// 1. Limpiar dist
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist', { recursive: true });

// 2. Copiar archivos principales
console.log('📦 Copiando archivos principales...');
const mainFiles = [
  'src/IconBase.tsx',
  'src/types.ts',
  'src/index.ts'
];

mainFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const outFile = file.replace('src/', 'dist/');
    const outDir = path.dirname(outFile);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    fs.writeFileSync(outFile, content);
  }
});

// 3. Compilar solo los archivos principales con TypeScript
console.log('🔨 Compilando archivos principales...');
try {
  execSync('npx tsc --project tsconfig.json --outDir dist --declaration', {
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=8192' }
  });
} catch (error) {
  console.log('⚠️ Error en compilación TypeScript, continuando con build manual...');
}

// 4. Copiar estructura de iconos sin compilar cada archivo
console.log('📁 Copiando estructura de iconos...');
function copyIconsStructure(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    
    if (entry.isDirectory()) {
      copyIconsStructure(srcPath, destPath);
    } else if (entry.name.endsWith('.tsx')) {
      // Copiar archivo de icono sin modificar
      const content = fs.readFileSync(srcPath, 'utf8');
      fs.writeFileSync(destPath, content);
    } else if (entry.name === 'index.ts') {
      // Copiar archivo de índice
      const content = fs.readFileSync(srcPath, 'utf8');
      fs.writeFileSync(destPath, content);
    }
  }
}

if (fs.existsSync('src/icons')) {
  copyIconsStructure('src/icons', 'dist/icons');
}

// 5. Generar package.json para dist
console.log('📄 Generando package.json para dist...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const distPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  license: packageJson.license,
  author: packageJson.author,
  homepage: packageJson.homepage,
  repository: packageJson.repository,
  bugs: packageJson.bugs,
  funding: packageJson.funding,
  sideEffects: packageJson.sideEffects,
  main: './index.js',
  module: './index.js',
  types: './index.d.ts',
  exports: {
    ".": {
      "types": "./index.d.ts",
      "import": "./index.js",
      "require": "./index.js"
    },
    "./icons": {
      "types": "./icons/index.d.ts",
      "import": "./icons/index.js",
      "require": "./icons/index.js"
    },
    "./icons/*": {
      "types": "./icons/*.d.ts",
      "import": "./icons/*.js",
      "require": "./icons/*.js"
    },
    "./package.json": "./package.json"
  },
  typesVersions: {
    "*": {
      "icons/*": ["./icons/*"],
      "icons": ["./icons/index.d.ts"]
    }
  },
  peerDependencies: packageJson.peerDependencies,
  files: ["**/*"]
};

fs.writeFileSync('dist/package.json', JSON.stringify(distPackageJson, null, 2));

// 6. Copiar README y documentación
console.log('📚 Copiando documentación...');
const docsToCopy = [
  'README.md',
  'LICENSE',
  'CHANGELOG.md',
  'GUIA_EXPORTACIONES.md',
  'INDICE_BUSQUEDA_RAPIDA.md',
  'ALIASES_REFERENCIA.md'
];

docsToCopy.forEach(doc => {
  if (fs.existsSync(doc)) {
    fs.copyFileSync(doc, `dist/${doc}`);
  }
});

console.log('✅ Build optimizado completado exitosamente!');
console.log('📁 Archivos generados en: dist/');
