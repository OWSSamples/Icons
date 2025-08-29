#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Publicación Manual - Sin GitHub Actions\n');

// 1. Verificar argumentos
const args = process.argv.slice(2);
const versionType = args[0]; // 'major', 'minor', 'patch'

if (!versionType || !['major', 'minor', 'patch'].includes(versionType)) {
  console.log('❌ Uso: node scripts/publish-manual.js [major|minor|patch]');
  console.log('   major: Cambios incompatibles');
  console.log('   minor: Nuevas funcionalidades');
  console.log('   patch: Correcciones de bugs');
  process.exit(1);
}

// 2. Ejecutar release
console.log(`🔄 Ejecutando release ${versionType}...`);
try {
  execSync(`npm run release:${versionType}`, { stdio: 'inherit' });
} catch (error) {
  console.log('❌ Error en release');
  process.exit(1);
}

// 3. Leer nueva versión
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const newVersion = packageJson.version;

// 4. Push a GitHub
console.log('📤 Haciendo push a GitHub...');
try {
  execSync('git push origin main', { stdio: 'inherit' });
  execSync('git push --tags', { stdio: 'inherit' });
} catch (error) {
  console.log('❌ Error en push');
  process.exit(1);
}

// 5. Publicar a NPM
console.log('📦 Publicando a NPM...');
try {
  execSync('npm publish', { stdio: 'inherit' });
} catch (error) {
  console.log('❌ Error publicando a NPM');
  process.exit(1);
}

// 6. Crear release manual en GitHub
console.log('🏷️ Creando release en GitHub...');
console.log(`\n📝 Para crear el release manualmente:`);
console.log(`1. Ve a: https://github.com/0rigon/Icons/releases/new`);
console.log(`2. Tag: v${newVersion}`);
console.log(`3. Title: Release v${newVersion}`);
console.log(`4. Description: Ver CHANGELOG.md para detalles`);

console.log('\n🎉 ¡Publicación completada!');
console.log(`📦 Versión: ${newVersion}`);
console.log(`📤 Push realizado`);
console.log(`📦 NPM publicado`);
console.log(`🏷️ Release manual pendiente en GitHub`);
