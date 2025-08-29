#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 DIAGNÓSTICO COMPLETO DEL PROYECTO\n');

// 1. Estadísticas básicas
console.log('📊 ESTADÍSTICAS BÁSICAS:');
try {
  const totalIcons = execSync('find src/icons -name "*.tsx" | wc -l', {
    encoding: 'utf8',
  }).trim();
  const totalIndexes = execSync('find src/icons -name "index.ts" | wc -l', {
    encoding: 'utf8',
  }).trim();
  const totalFolders = execSync('find src/icons -type d | wc -l', {
    encoding: 'utf8',
  }).trim();

  console.log(`✅ Total de iconos: ${totalIcons}`);
  console.log(`✅ Total de índices: ${totalIndexes}`);
  console.log(`✅ Total de carpetas: ${totalFolders}`);
} catch (error) {
  console.log('❌ Error obteniendo estadísticas:', error.message);
}

// 2. Verificar estructura de carpetas principales
console.log('\n📁 ESTRUCTURA DE CARPETAS PRINCIPALES:');
const mainFolders = [
  'Arrows',
  'Business-and-Finance',
  'Devices-and-Hardware',
  'UI-Basics',
  'Communication',
  'E-Commerce-Shopping',
];

mainFolders.forEach(folder => {
  const folderPath = path.join('src/icons', folder);
  if (fs.existsSync(folderPath)) {
    const hasIndex = fs.existsSync(path.join(folderPath, 'index.ts'));
    const hasSubfolders = fs
      .readdirSync(folderPath)
      .some(item => fs.statSync(path.join(folderPath, item)).isDirectory());
    console.log(
      `✅ ${folder}: ${hasIndex ? 'Tiene índice' : '❌ Sin índice'} | ${hasSubfolders ? 'Tiene subcarpetas' : 'Sin subcarpetas'}`
    );
  } else {
    console.log(`❌ ${folder}: No existe`);
  }
});

// 3. Verificar archivos críticos
console.log('\n📄 ARCHIVOS CRÍTICOS:');
const criticalFiles = [
  'src/icons/index.ts',
  'src/icons/aliases.ts',
  'src/icons/flat-index.ts',
  'src/icons/thematic-index.ts',
  'src/IconBase.tsx',
  'src/types.ts',
  'package.json',
  'tsconfig.json',
];

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    console.log(`✅ ${file}: ${(stats.size / 1024).toFixed(1)}KB`);
  } else {
    console.log(`❌ ${file}: No existe`);
  }
});

// 4. Verificar imports en archivos de iconos
console.log('\n🔗 VERIFICACIÓN DE IMPORTS:');
try {
  const sampleIcon = execSync('find src/icons -name "*.tsx" | head -1', {
    encoding: 'utf8',
  }).trim();
  if (sampleIcon) {
    const content = fs.readFileSync(sampleIcon, 'utf8');
    const hasReactImport = content.includes('import React');
    const hasIconBaseImport = content.includes('import IconBase');
    const hasIconPropsImport = content.includes('import { IconProps }');
    const hasDefaultExport = content.includes('export default');

    console.log(`✅ Icono de muestra: ${path.basename(sampleIcon)}`);
    console.log(`   React import: ${hasReactImport ? '✅' : '❌'}`);
    console.log(`   IconBase import: ${hasIconBaseImport ? '✅' : '❌'}`);
    console.log(`   IconProps import: ${hasIconPropsImport ? '✅' : '❌'}`);
    console.log(`   Default export: ${hasDefaultExport ? '✅' : '❌'}`);
  }
} catch (error) {
  console.log('❌ Error verificando imports:', error.message);
}

// 5. Verificar configuración de TypeScript
console.log('\n⚙️ CONFIGURACIÓN DE TYPESCRIPT:');
try {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  const hasInclude = tsconfig.include && tsconfig.include.includes('src/**/*');
  const hasExclude = tsconfig.exclude && tsconfig.exclude.includes('dist');
  const hasDeclaration =
    tsconfig.compilerOptions && tsconfig.compilerOptions.declaration;

  console.log(`✅ Include src/**/*: ${hasInclude ? '✅' : '❌'}`);
  console.log(`✅ Exclude dist: ${hasExclude ? '✅' : '❌'}`);
  console.log(`✅ Declaration: ${hasDeclaration ? '✅' : '❌'}`);
} catch (error) {
  console.log('❌ Error verificando tsconfig.json:', error.message);
}

// 6. Verificar package.json
console.log('\n📦 CONFIGURACIÓN DE PACKAGE.JSON:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const hasMain = packageJson.main;
  const hasTypes = packageJson.types;
  const hasExports = packageJson.exports;
  const hasFiles = packageJson.files && packageJson.files.includes('dist');

  console.log(`✅ Main entry: ${hasMain ? '✅' : '❌'}`);
  console.log(`✅ Types entry: ${hasTypes ? '✅' : '❌'}`);
  console.log(`✅ Exports config: ${hasExports ? '✅' : '❌'}`);
  console.log(`✅ Files includes dist: ${hasFiles ? '✅' : '❌'}`);
} catch (error) {
  console.log('❌ Error verificando package.json:', error.message);
}

// 7. Verificar build
console.log('\n🔨 VERIFICACIÓN DE BUILD:');
try {
  if (fs.existsSync('dist')) {
    const distStats = fs.statSync('dist');
    const distSize = (distStats.size / 1024 / 1024).toFixed(1);
    console.log(`✅ Carpeta dist existe: ${distSize}MB`);

    const distFiles = fs.readdirSync('dist');
    const hasIndex =
      distFiles.includes('index.js') && distFiles.includes('index.d.ts');
    const hasIcons = fs.existsSync('dist/icons');

    console.log(`✅ Archivos principales: ${hasIndex ? '✅' : '❌'}`);
    console.log(`✅ Carpeta icons: ${hasIcons ? '✅' : '❌'}`);
  } else {
    console.log('❌ Carpeta dist no existe - ejecuta npm run build');
  }
} catch (error) {
  console.log('❌ Error verificando build:', error.message);
}

// 8. Problemas identificados
console.log('\n🚨 PROBLEMAS IDENTIFICADOS:');

// Verificar si hay carpetas con espacios
try {
  const foldersWithSpaces = execSync('find src/icons -type d -name "* *"', {
    encoding: 'utf8',
  }).trim();
  if (foldersWithSpaces) {
    console.log('❌ Carpetas con espacios encontradas:');
    foldersWithSpaces.split('\n').forEach(folder => {
      if (folder) console.log(`   - ${folder}`);
    });
  } else {
    console.log('✅ No hay carpetas con espacios');
  }
} catch (error) {
  console.log('✅ No hay carpetas con espacios');
}

// Verificar si hay archivos duplicados
try {
  const duplicateNames = execSync(
    'find src/icons -name "*.tsx" | sed "s/.*\\///" | sort | uniq -d',
    { encoding: 'utf8' }
  ).trim();
  if (duplicateNames) {
    console.log('❌ Nombres de archivos duplicados:');
    duplicateNames.split('\n').forEach(name => {
      if (name) console.log(`   - ${name}`);
    });
  } else {
    console.log('✅ No hay nombres duplicados');
  }
} catch (error) {
  console.log('✅ No hay nombres duplicados');
}

console.log('\n🎯 RECOMENDACIONES:');
console.log('1. Si hay carpetas con espacios, renómbralas');
console.log('2. Si hay nombres duplicados, resuélvelos');
console.log('3. Ejecuta npm run build para generar dist/');
console.log('4. Considera usar --max-old-space-size=8192 para TypeScript');
console.log('5. Verifica que todos los imports sean correctos');

console.log('\n✅ Diagnóstico completado');
