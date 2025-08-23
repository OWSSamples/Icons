# 🛠️ Guía de Desarrollo - @opendex-origon/icons

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)

**Guía completa para desarrolladores que quieran contribuir al proyecto**

</div>

---

## 📋 Tabla de Contenidos

1. [🚀 Configuración del Entorno](#-configuración-del-entorno)
2. [🔧 Scripts y Comandos](#-scripts-y-comandos)
3. [📁 Estructura del Código](#-estructura-del-código)
4. [🎨 Generación de Iconos](#-generación-de-iconos)
5. [🧪 Testing y Quality Assurance](#-testing-y-quality-assurance)
6. [📦 Build y Distribución](#-build-y-distribución)
7. [🔍 Debugging](#-debugging)
8. [📝 Convenciones de Código](#-convenciones-de-código)
9. [🤝 Contribución](#-contribución)

---

## 🚀 Configuración del Entorno

### 🔧 Requisitos del Sistema

```bash
# Versiones mínimas requeridas
Node.js >= 16.0.0
npm >= 8.0.0
Git >= 2.0.0
```

### 📥 Configuración Inicial

#### 1. **Clonar el Repositorio**
```bash
git clone https://github.com/opendex-origon/opendex-icons.git
cd opendex-icons
```

#### 2. **Instalar Dependencias**
```bash
npm install
```

#### 3. **Verificar la Instalación**
```bash
# Verificar que todo funciona
npm run type-check
npm run lint
npm run build
```

### ⚙️ Configuración del Editor

#### **VS Code (Recomendado)**

Instalar las siguientes extensiones:
- **TypeScript Importer**
- **ESLint**
- **Prettier**
- **SVG Viewer**

#### **Configuración de VS Code**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.associations": {
    "*.tsx": "typescriptreact"
  }
}
```

---

## 🔧 Scripts y Comandos

### 📋 Scripts Principales

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `npm run dev` | Desarrollo con watch mode |
| **Build** | `npm run build` | Build de producción |
| **Limpieza** | `npm run clean` | Limpiar directorio dist |
| **Generación** | `npm run generate` | Generar iconos desde SVG |
| **Testing** | `npm run test` | Ejecutar tests |
| **Linting** | `npm run lint` | Linting con ESLint |
| **Type Check** | `npm run type-check` | Verificar tipos TypeScript |
| **Formateo** | `npm run format` | Formatear código con Prettier |

### 🔄 Scripts de Desarrollo

#### **Desarrollo con Watch**
```bash
npm run dev
```
- Compila TypeScript en modo watch
- Regenera archivos automáticamente
- Muestra errores en tiempo real

#### **Build de Desarrollo**
```bash
npm run build:dev
```
- Build sin optimizaciones
- Incluye source maps
- Más rápido para desarrollo

#### **Build de Producción**
```bash
npm run build
```
- Build optimizado
- Sin source maps
- Minificado y comprimido

### 🎨 Scripts de Generación

#### **Generar Lista de Iconos**
```bash
npm run generate:list
```
- Genera `ICON_LIST.md` con todos los iconos
- Muestra estadísticas por categoría
- Útil para documentación

#### **Generar Iconos desde SVG**
```bash
npm run generate
```
- Convierte SVGs a componentes React
- Genera archivos TypeScript
- Actualiza índices automáticamente

---

## 📁 Estructura del Código

### 🏗️ Arquitectura del Proyecto

```
📁 src/
├── 📁 icons/                    # Iconos generados
│   ├── 📁 [Categoria]/         # Categoría de iconos
│   │   ├── 📁 Regular/         # Estilo Regular
│   │   ├── 📁 Light/           # Estilo Light
│   │   ├── 📁 Filled/          # Estilo Filled
│   │   ├── 📁 Duotone/         # Estilo Duotone
│   │   ├── 📁 Duotone Line/    # Estilo Duotone Line
│   │   └── 📄 index.ts         # Exportaciones
│   └── 📄 index.ts             # Exportaciones principales
├── 📄 IconBase.tsx             # Componente base
├── 📄 types.ts                 # Tipos TypeScript
└── 📄 index.ts                 # Punto de entrada
```

### 🔧 Componentes Core

#### **IconBase.tsx**
```tsx
import React from 'react';
import { IconProps } from './types';

export function IconBase({
  size = 24,
  color = 'currentColor',
  children,
  ...rest
}: React.PropsWithChildren<IconProps>) {
  const resolvedSize = typeof size === 'number' ? `${size}` : size;
  return (
    <svg
      width={resolvedSize}
      height={resolvedSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
}
```

#### **types.ts**
```tsx
import type React from 'react';

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, 'color'> & {
  size?: number | string;
  color?: string;
};
```

### 📄 Estructura de un Icono

#### **Template de Icono**
```tsx
import React from 'react';
import IconBase from '../../../IconBase';
import { IconProps } from '../../../types';

const IconNameStyle = (props: IconProps) => (
  <IconBase {...props} viewBox="0 0 24 24">
    {/* SVG path aquí */}
  </IconBase>
);

export default IconNameStyle;
```

#### **Ejemplo Real**
```tsx
import React from 'react';
import IconBase from '../../../IconBase';
import { IconProps } from '../../../types';

const ArrowUpRegular = (props: IconProps) => (
  <IconBase {...props} viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.97 11.03a.75.75 0 1 0 1.06-1.06l-7.5-7.5a.75.75 0 0 0-1.06 0l-7.5 7.5a.75.75 0 1 0 1.06 1.06l6.22-6.22V21a.75.75 0 0 0 1.5 0V4.81z"/>
  </IconBase>
);

export default ArrowUpRegular;
```

---

## 🎨 Generación de Iconos

### 🔄 Proceso de Generación

#### **1. Preparar Archivos SVG**
```bash
# Colocar SVGs en la estructura correcta
assets/svg/[Categoria]/[Estilo]/[Nombre].svg
```

#### **2. Ejecutar Generador**
```bash
npm run generate
```

#### **3. Verificar Resultados**
```bash
# Verificar que se generaron los archivos
ls src/icons/[Categoria]/[Estilo]/

# Verificar tipos
npm run type-check
```

### 📋 Convenciones de Nomenclatura

#### **Archivos SVG**
```
✅ Correcto:
- arrow-up.svg
- user-profile.svg
- credit-card.svg

❌ Incorrecto:
- ArrowUp.svg
- user_profile.svg
- creditCard.svg
```

#### **Componentes React**
```
✅ Correcto:
- ArrowUpRegular.tsx
- UserProfileFilled.tsx
- CreditCardDuotone.tsx

❌ Incorrecto:
- arrowUpRegular.tsx
- user_profile_filled.tsx
- creditCardDuotone.tsx
```

### 🎯 Estructura de Categorías

#### **Categorías Existentes**
- **Arrows**: Flechas y navegación
- **UI Basics**: Iconos básicos de interfaz
- **Business & Finance**: Negocios y finanzas
- **Devices & Hardware**: Dispositivos y hardware
- **Communication**: Comunicación y mensajería
- **E-Commerce & Shopping**: Comercio electrónico
- **Documents**: Documentos y archivos
- **Files**: Gestión de archivos
- **Multimedia**: Medios y entretenimiento
- **Date & Time**: Fechas y tiempo
- **Currencies**: Monedas y divisas
- **Charts & Diagrams**: Gráficos y diagramas
- **Buildings**: Edificios y arquitectura
- **Location & Map**: Ubicación y mapas
- **Connectivity**: Conectividad y redes
- **Chatting**: Chat y conversaciones
- **Messaging**: Mensajería
- **Commenting**: Comentarios
- **Coding**: Programación
- **Design & Editing**: Diseño y edición
- **Education**: Educación
- **Menu & Grids**: Menús y cuadrículas
- **Other**: Otros iconos
- **Payment & Money**: Pagos y dinero
- **Security**: Seguridad
- **Sign & Indices**: Signos e índices
- **Support & Reviews**: Soporte y reseñas
- **Text Formatting**: Formato de texto
- **Users & People**: Usuarios y personas

### 🎭 Estilos de Iconos

#### **Los 5 Estilos**
1. **Regular**: Trazos simples y limpios
2. **Light**: Versión sutil con trazos finos
3. **Filled**: Iconos completamente rellenados
4. **Duotone**: Iconos con dos colores/tonos
5. **Duotone Line**: Versión de línea del estilo duotono

---

## 🧪 Testing y Quality Assurance

### 🔍 Verificaciones Automáticas

#### **TypeScript Check**
```bash
npm run type-check
```
- Verifica tipos en todo el proyecto
- Detecta errores de tipado
- Asegura compatibilidad

#### **ESLint**
```bash
npm run lint
```
- Verifica estilo de código
- Detecta problemas potenciales
- Aplica reglas de calidad

#### **Prettier**
```bash
npm run format
```
- Formatea código automáticamente
- Mantiene consistencia
- Aplica estilo uniforme

### 📋 Checklist de Calidad

#### **Antes de Commit**
- [ ] `npm run type-check` pasa sin errores
- [ ] `npm run lint` no muestra warnings
- [ ] `npm run format` aplicado
- [ ] Tests pasan (si existen)
- [ ] Build funciona correctamente

#### **Antes de Pull Request**
- [ ] Código revisado personalmente
- [ ] Documentación actualizada
- [ ] Ejemplos probados
- [ ] Compatibilidad verificada

### 🐛 Debugging

#### **Problemas Comunes**

##### **Error de Tipos TypeScript**
```bash
# Verificar configuración
npx tsc --noEmit

# Verificar archivos específicos
npx tsc --noEmit src/icons/Arrows/Regular/ArrowUpRegular.tsx
```

##### **Error de Linting**
```bash
# Verificar reglas específicas
npx eslint src/icons/Arrows/Regular/ArrowUpRegular.tsx

# Auto-fix
npx eslint src/icons/Arrows/Regular/ArrowUpRegular.tsx --fix
```

##### **Error de Build**
```bash
# Limpiar y reconstruir
npm run clean
npm run build

# Verificar dependencias
npm ls
```

---

## 📦 Build y Distribución

### 🔨 Proceso de Build

#### **Build Completo**
```bash
npm run build
```

#### **Pasos del Build**
1. **Limpieza**: Elimina directorio `dist/`
2. **Compilación**: Compila TypeScript a JavaScript
3. **Optimización**: Optimiza y minifica
4. **Empaquetado**: Crea archivos de distribución

#### **Archivos Generados**
```
📁 dist/
├── 📄 index.js              # Punto de entrada principal
├── 📄 index.d.ts            # Tipos TypeScript
├── 📁 icons/               # Iconos compilados
│   ├── 📄 index.js
│   ├── 📄 index.d.ts
│   └── 📁 [Categoria]/
└── 📄 package.json          # Package.json para distribución
```

### 📊 Optimizaciones

#### **Tree-Shaking**
- Exportaciones nombradas para optimización
- Imports selectivos recomendados
- Eliminación automática de código no usado

#### **Bundle Size**
- Cada icono: ~1-2KB
- Categoría completa: ~50-200KB
- Bundle total: ~5MB (comprimido)

### 🚀 Distribución

#### **Publicar a npm**
```bash
# Verificar que todo está listo
npm run build
npm run test

# Publicar
npm publish
```

#### **Versionado**
```bash
# Incrementar versión
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

---

## 🔍 Debugging

### 🐛 Problemas Comunes

#### **1. Error de Importación**
```tsx
// ❌ Error
import { NonExistentIcon } from '@opendex-origon/icons';

// ✅ Solución
import { User } from '@opendex-origon/icons';
```

#### **2. Error de Tipos**
```tsx
// ❌ Error
<User size="invalid" />

// ✅ Solución
<User size={24} />
<User size="1.5rem" />
```

#### **3. Error de Build**
```bash
# ❌ Error
npm run build

# ✅ Solución
npm run clean
npm install
npm run build
```

### 🔧 Herramientas de Debugging

#### **TypeScript Debug**
```bash
# Verificar tipos específicos
npx tsc --noEmit --listFiles

# Ver configuración
npx tsc --showConfig
```

#### **ESLint Debug**
```bash
# Ver reglas aplicadas
npx eslint --print-config src/icons/Arrows/Regular/ArrowUpRegular.tsx

# Debug específico
npx eslint --debug src/icons/Arrows/Regular/ArrowUpRegular.tsx
```

#### **Build Debug**
```bash
# Ver proceso detallado
npm run build --verbose

# Ver dependencias
npm ls --depth=0
```

---

## 📝 Convenciones de Código

### 🎯 Estilo de Código

#### **TypeScript**
```tsx
// ✅ Correcto
import React from 'react';
import IconBase from '../../../IconBase';
import { IconProps } from '../../../types';

const ArrowUpRegular = (props: IconProps) => (
  <IconBase {...props} viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.97 11.03a.75.75 0 1 0 1.06-1.06l-7.5-7.5a.75.75 0 0 0-1.06 0l-7.5 7.5a.75.75 0 1 0 1.06 1.06l6.22-6.22V21a.75.75 0 0 0 1.5 0V4.81z"/>
  </IconBase>
);

export default ArrowUpRegular;
```

#### **Imports**
```tsx
// ✅ Correcto - Imports organizados
import React from 'react';
import IconBase from '../../../IconBase';
import { IconProps } from '../../../types';

// ❌ Incorrecto - Imports desordenados
import { IconProps } from '../../../types';
import React from 'react';
import IconBase from '../../../IconBase';
```

### 📋 Nomenclatura

#### **Archivos**
```
✅ Correcto:
- ArrowUpRegular.tsx
- UserProfileFilled.tsx
- CreditCardDuotone.tsx

❌ Incorrecto:
- arrowUpRegular.tsx
- user_profile_filled.tsx
- creditCardDuotone.tsx
```

#### **Variables y Funciones**
```tsx
// ✅ Correcto
const ArrowUpRegular = (props: IconProps) => { ... };
const handleClick = () => { ... };

// ❌ Incorrecto
const arrowUpRegular = (props: IconProps) => { ... };
const handle_click = () => { ... };
```

### 📝 Comentarios

#### **Documentación de Componentes**
```tsx
/**
 * ArrowUpRegular - Icono de flecha hacia arriba en estilo regular
 * 
 * @param props - Props del icono
 * @param props.size - Tamaño del icono (default: 24)
 * @param props.color - Color del icono (default: currentColor)
 * @returns Componente SVG de flecha hacia arriba
 */
const ArrowUpRegular = (props: IconProps) => (
  <IconBase {...props} viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.97 11.03a.75.75 0 1 0 1.06-1.06l-7.5-7.5a.75.75 0 0 0-1.06 0l-7.5 7.5a.75.75 0 1 0 1.06 1.06l6.22-6.22V21a.75.75 0 0 0 1.5 0V4.81z"/>
  </IconBase>
);
```

---

## 🤝 Contribución

### 🔄 Flujo de Contribución

#### **1. Fork y Clone**
```bash
# Fork en GitHub
# Luego clonar tu fork
git clone https://github.com/tu-usuario/opendex-icons.git
cd opendex-icons

# Agregar upstream
git remote add upstream https://github.com/opendex-origon/opendex-icons.git
```

#### **2. Crear Rama**
```bash
# Crear rama para tu feature
git checkout -b feature/nueva-funcionalidad

# O para bugfix
git checkout -b fix/nombre-del-bug
```

#### **3. Desarrollo**
```bash
# Hacer cambios
# Ejecutar verificaciones
npm run type-check
npm run lint
npm run build

# Commit con mensaje descriptivo
git commit -m "feat(arrows): add new arrow icons"
```

#### **4. Push y Pull Request**
```bash
# Push a tu fork
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
```

### 📋 Tipos de Contribución

#### **Nuevos Iconos**
- Agregar archivos SVG en `assets/svg/`
- Ejecutar `npm run generate`
- Verificar que se generaron correctamente
- Actualizar documentación si es necesario

#### **Mejoras de Código**
- Refactorización de componentes
- Optimizaciones de performance
- Mejoras de tipos TypeScript
- Actualización de dependencias

#### **Documentación**
- Actualizar README.md
- Agregar ejemplos de uso
- Mejorar guías de desarrollo
- Traducir documentación

#### **Testing**
- Agregar tests unitarios
- Mejorar cobertura de código
- Agregar tests de integración
- Tests de performance

### 🎯 Guías de Commit

#### **Formato de Commits**
```bash
# Formato: type(scope): description
git commit -m "feat(arrows): add new arrow icons"
git commit -m "fix(build): resolve TypeScript compilation issues"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(icons): improve code formatting"
git commit -m "refactor(base): optimize IconBase component"
git commit -m "test(utils): add unit tests for icon generation"
git commit -m "chore(deps): update dependencies to latest versions"
```

#### **Tipos de Commits**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Documentación
- `style`: Formato de código
- `refactor`: Refactorización
- `test`: Tests
- `chore`: Tareas de mantenimiento

#### **Scopes Comunes**
- `arrows`: Iconos de flechas
- `build`: Sistema de build
- `docs`: Documentación
- `icons`: Iconos en general
- `types`: Tipos TypeScript
- `utils`: Utilidades
- `deps`: Dependencias

### 📝 Pull Request Template

```markdown
## 📋 Descripción
Breve descripción de los cambios realizados.

## 🎯 Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Mejora de documentación
- [ ] Refactorización
- [ ] Otro

## 🔧 Cambios Realizados
- Lista de cambios específicos
- Archivos modificados
- Nuevas funcionalidades

## 🧪 Testing
- [ ] Tests pasan
- [ ] Build funciona correctamente
- [ ] Linting sin errores
- [ ] TypeScript sin errores

## 📸 Screenshots (si aplica)
Agregar capturas de pantalla si es relevante.

## ✅ Checklist
- [ ] Código sigue las convenciones del proyecto
- [ ] Documentación actualizada
- [ ] Tests agregados/actualizados
- [ ] Build funciona correctamente
```

---

<div align="center">

**¡Gracias por contribuir a @opendex-origon/icons! 🎉**

[![Opendex](https://img.shields.io/badge/Opendex-Corporation-blue?logo=opendex)](https://opendex.com)

</div>
