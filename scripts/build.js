const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build optimizado...');

// Crear directorio dist si no existe
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('📦 Copiando archivos principales...');

// Crear un tsconfig temporal para el build completo
const buildTsConfig = {
  extends: './tsconfig.json',
  include: ['src/**/*'],
  exclude: ['src/setupTests.ts'],
};

fs.writeFileSync(
  path.join(__dirname, '../tsconfig.build-temp.json'),
  JSON.stringify(buildTsConfig, null, 2)
);

// Crear package.json para el build
const packageJson = {
  name: '@opendex-origon/icons',
  version: '2.9.2',
  main: './index.js',
  module: './index.js',
  types: './index.d.ts',
  exports: {
    '.': {
      types: './index.d.ts',
      import: './index.js',
      require: './index.js',
    },
    './icons': {
      types: './icons/index.d.ts',
      import: './icons/index.js',
      require: './icons/index.js',
    },
    './icons/*': {
      types: './icons/*.d.ts',
      import: './icons/*.js',
      require: './icons/*.js',
    },
  },
  peerDependencies: {
    react: '>=16.8',
  },
};

fs.writeFileSync(
  path.join(distDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Compilar todos los archivos con TypeScript
console.log('🔨 Compilando archivos principales...');

try {
  // Usar tsc con el tsconfig temporal
  execSync('npx tsc --project tsconfig.build-temp.json', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });

  console.log('✅ Build completado exitosamente!');
  console.log('📁 Archivos generados en: dist/');

  // Limpiar archivo temporal
  if (fs.existsSync(path.join(__dirname, '../tsconfig.build-temp.json'))) {
    fs.unlinkSync(path.join(__dirname, '../tsconfig.build-temp.json'));
  }
} catch (error) {
  console.error('❌ Error durante el build:', error.message);

  // Limpiar archivo temporal en caso de error
  if (fs.existsSync(path.join(__dirname, '../tsconfig.build-temp.json'))) {
    fs.unlinkSync(path.join(__dirname, '../tsconfig.build-temp.json'));
  }

  process.exit(1);
}
