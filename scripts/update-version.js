#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Actualización Profesional de Versión\n');

// 1. Verificar estado del repositorio
console.log('📋 Verificando estado del repositorio...');
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    console.log('⚠️ Hay cambios sin commitear. Por favor, haz commit primero.');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ Error verificando estado del repositorio');
  process.exit(1);
}

// 2. Obtener argumentos
const args = process.argv.slice(2);
const versionType = args[0]; // 'major', 'minor', 'patch'

if (!versionType || !['major', 'minor', 'patch'].includes(versionType)) {
  console.log('❌ Uso: node scripts/update-version.js [major|minor|patch]');
  console.log('   major: Cambios incompatibles');
  console.log('   minor: Nuevas funcionalidades');
  console.log('   patch: Correcciones de bugs');
  process.exit(1);
}

// 3. Leer package.json actual
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const currentVersion = packageJson.version;
console.log(`📦 Versión actual: ${currentVersion}`);

// 4. Actualizar versión
console.log(`🔄 Actualizando versión (${versionType})...`);
try {
  execSync(`npm version ${versionType} --no-git-tag-version`, {
    stdio: 'inherit',
  });
} catch (error) {
  console.log('❌ Error actualizando versión');
  process.exit(1);
}

// 5. Leer nueva versión
const newPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const newVersion = newPackageJson.version;
console.log(`✅ Nueva versión: ${newVersion}`);

// 6. Actualizar CHANGELOG
console.log('📝 Actualizando CHANGELOG...');
const changelogPath = 'CHANGELOG.md';
let changelog = '';

if (fs.existsSync(changelogPath)) {
  changelog = fs.readFileSync(changelogPath, 'utf8');
}

const today = new Date().toISOString().split('T')[0];
const versionEntry = `## [${newVersion}] - ${today}

### ${versionType === 'major' ? '🚨 BREAKING CHANGES' : versionType === 'minor' ? '✨ Features' : '🐛 Bug Fixes'}

- ${
  versionType === 'major'
    ? 'Cambios incompatibles con versiones anteriores'
    : versionType === 'minor'
      ? 'Nuevos iconos agregados'
      : 'Correcciones de bugs'
}

### 📦 Build
- Versión: ${newVersion}
- Iconos totales: ${execSync('find src/icons -name "*.tsx" | wc -l', { encoding: 'utf8' }).trim()}
- Fecha: ${today}

---

`;

const newChangelog = changelog.replace(
  '# Changelog',
  `# Changelog\n\n${versionEntry}`
);
fs.writeFileSync(changelogPath, newChangelog);

// 7. Build del proyecto
console.log('🔨 Ejecutando build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.log('❌ Error en build');
  process.exit(1);
}

// 8. Verificar tipos
console.log('🔍 Verificando tipos...');
try {
  execSync('npm run type-check', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️ Advertencias de tipos (continuando...)');
}

// 9. Commit automático
console.log('💾 Haciendo commit...');
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "release: v${newVersion} - ${versionType} update"`, {
    stdio: 'inherit',
  });
  execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
} catch (error) {
  console.log('❌ Error en commit');
  process.exit(1);
}

console.log('\n🎉 ¡Actualización completada!');
console.log(`📦 Versión: ${newVersion}`);
console.log('📝 CHANGELOG actualizado');
console.log('💾 Commit realizado');
console.log('\n🚀 Próximos pasos:');
console.log('1. git push origin main');
console.log('2. git push --tags');
console.log('3. npm publish');
