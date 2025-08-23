# 📚 Documentación Completa - @opendex-origon/icons

<div align="center">

![npm version](https://img.shields.io/npm/v/@opendex-origon/icons.svg)
![npm downloads](https://img.shields.io/npm/dm/@opendex-origon/icons.svg)
![License](https://img.shields.io/badge/License-Opendex%20Restricted-red)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)

**Biblioteca profesional de iconos SVG para React con tipado TypeScript completo**

_Desarrollado por Opendex Corporation_

</div>

---

## 📋 Tabla de Contenidos

1. [🎯 Descripción General](#-descripción-general)
2. [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
3. [📦 Instalación y Configuración](#-instalación-y-configuración)
4. [🎨 Guía de Uso](#-guía-de-uso)
5. [🔧 API y Props](#-api-y-props)
6. [📁 Estructura de Categorías](#-estructura-de-categorías)
7. [🎭 Estilos de Iconos](#-estilos-de-iconos)
8. [⚡ Optimización y Performance](#-optimización-y-performance)
9. [🛠️ Desarrollo y Contribución](#️-desarrollo-y-contribución)
10. [📊 Estadísticas y Métricas](#-estadísticas-y-métricas)
11. [🔒 Licencia y Restricciones](#-licencia-y-restricciones)
12. [❓ FAQ](#-faq)

---

## 🎯 Descripción General

**@opendex-origon/icons** es una biblioteca de iconos SVG de alta calidad desarrollada específicamente para el ecosistema de Opendex Corporation. Esta biblioteca proporciona más de **10,000 iconos únicos** organizados en categorías temáticas, con soporte completo para React y TypeScript.

### 🎨 Características Principales

- ✅ **+10,000 iconos únicos** en formato SVG
- ✅ **25+ categorías temáticas** organizadas lógicamente
- ✅ **5 estilos diferentes** por icono (Light, Regular, Filled, Duotone, Duotone Line)
- ✅ **Tipado TypeScript completo** con IntelliSense
- ✅ **Compatibilidad React 16.8+** con hooks
- ✅ **Tree-shaking automático** para optimización de bundles
- ✅ **Props flexibles** para personalización
- ✅ **Accesibilidad integrada** con ARIA labels
- ✅ **Responsive design** por defecto

### 🎯 Casos de Uso

- **Aplicaciones web** que se integren con servicios de Opendex
- **Dashboards** y paneles de control
- **Interfaces de usuario** modernas y profesionales
- **Sistemas de diseño** consistentes
- **Prototipado rápido** con iconos de alta calidad

---

## 🏗️ Arquitectura del Proyecto

### 📁 Estructura de Directorios

```
@opendex-origon/
├── 📁 assets/
│   └── 📁 svg/                    # Archivos SVG originales
│       ├── 📁 Arrows/            # Categoría de flechas
│       │   ├── 📁 Duotone/       # Estilo Duotone
│       │   ├── 📁 Duotone Line/  # Estilo Duotone Line
│       │   ├── 📁 Filled/        # Estilo Filled
│       │   ├── 📁 Light/         # Estilo Light
│       │   └── 📁 Regular/       # Estilo Regular
│       ├── 📁 Buildings/         # Categoría de edificios
│       ├── 📁 Business & Finance/# Categoría de negocios
│       └── ...                   # Otras categorías
├── 📁 src/
│   ├── 📁 icons/                 # Iconos generados en TypeScript
│   │   ├── 📁 Arrows/           # Categoría de flechas
│   │   │   ├── 📁 Regular/      # Estilo Regular
│   │   │   ├── 📁 Light/        # Estilo Light
│   │   │   ├── 📁 Filled/       # Estilo Filled
│   │   │   ├── 📁 Duotone/      # Estilo Duotone
│   │   │   ├── 📁 Duotone Line/ # Estilo Duotone Line
│   │   │   └── 📄 index.ts      # Exportaciones de la categoría
│   │   ├── 📁 Buildings/        # Categoría de edificios
│   │   └── 📄 index.ts          # Exportaciones principales
│   ├── 📄 IconBase.tsx          # Componente base para iconos
│   ├── 📄 types.ts              # Definiciones de tipos TypeScript
│   └── 📄 index.ts              # Punto de entrada principal
├── 📁 scripts/                   # Scripts de automatización
│   ├── 📄 build.js              # Script de construcción
│   ├── 📄 generate-icon-list.js # Generador de lista de iconos
│   └── 📄 folder-rename-executor.js # Renombrador de carpetas
├── 📄 package.json              # Configuración del paquete
├── 📄 tsconfig.json             # Configuración TypeScript
├── 📄 README.md                 # Documentación básica
└── 📄 LICENSE                   # Licencia del proyecto
```

### 🔧 Componentes Principales

#### 1. **IconBase.tsx** - Componente Base
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

#### 2. **types.ts** - Definiciones de Tipos
```tsx
import type React from 'react';

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, 'color'> & {
  size?: number | string;
  color?: string;
};
```

#### 3. **Estructura de un Icono Individual**
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

## 📦 Instalación y Configuración

### 🔧 Requisitos Previos

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0
- **React**: >= 16.8.0
- **TypeScript**: >= 4.0.0 (recomendado)

### 📥 Instalación

#### Usando npm
```bash
npm install @opendex-origon/icons
```

#### Usando yarn
```bash
yarn add @opendex-origon/icons
```

#### Usando pnpm
```bash
pnpm add @opendex-origon/icons
```

### ⚙️ Configuración TypeScript

Asegúrate de que tu `tsconfig.json` incluya:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "react-jsx"
  }
}
```

### 🎯 Configuración de Build Tools

#### Webpack
```javascript
module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
};
```

#### Vite
```javascript
export default {
  optimizeDeps: {
    include: ['@opendex-origon/icons']
  }
};
```

---

## 🎨 Guía de Uso

### 🚀 Uso Básico

#### Importación Simple
```tsx
import { User, Check, Settings } from '@opendex-origon/icons';

function App() {
  return (
    <div>
      <User size={24} />
      <Check size='1.5rem' color='green' />
      <Settings size={20} className='icon-spin' />
    </div>
  );
}
```

#### Importación por Categoría
```tsx
import * as Arrows from '@opendex-origon/icons/Arrows';
import * as Business from '@opendex-origon/icons/Business';

function App() {
  return (
    <div>
      <Arrows.ArrowUp size={24} />
      <Business.Dollar size={24} />
    </div>
  );
}
```

#### Importación por Estilo
```tsx
import { ArrowUpRegular, ArrowUpFilled } from '@opendex-origon/icons/Arrows';

function App() {
  return (
    <div>
      <ArrowUpRegular size={24} />
      <ArrowUpFilled size={24} />
    </div>
  );
}
```

### 🎯 Ejemplos Avanzados

#### Iconos con Estados
```tsx
import { Check, X, Loading } from '@opendex-origon/icons';

function StatusIcon({ status }: { status: 'success' | 'error' | 'loading' }) {
  switch (status) {
    case 'success':
      return <Check size={20} color='green' />;
    case 'error':
      return <X size={20} color='red' />;
    case 'loading':
      return <Loading size={20} className='animate-spin' />;
    default:
      return null;
  }
}
```

#### Iconos Responsivos
```tsx
import { Menu, Close } from '@opendex-origon/icons';

function MobileMenu({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="mobile-menu-toggle">
      {isOpen ? <Close size='1.5rem' /> : <Menu size='1.5rem' />}
    </button>
  );
}
```

#### Iconos con Temas
```tsx
import { Sun, Moon } from '@opendex-origon/icons';

function ThemeToggle({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="theme-toggle">
      {theme === 'dark' ? (
        <Sun size={24} color='yellow' />
      ) : (
        <Moon size={24} color='blue' />
      )}
    </button>
  );
}
```

#### Iconos con Animaciones CSS
```tsx
import { Heart, Star } from '@opendex-origon/icons';

function AnimatedIcons() {
  return (
    <div className="animated-icons">
      <Heart 
        size={24} 
        className='hover:scale-110 transition-transform duration-200' 
      />
      <Star 
        size={24} 
        className='animate-pulse' 
      />
    </div>
  );
}
```

---

## 🔧 API y Props

### 📋 Props Disponibles

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Tamaño del icono (px, rem, em, etc.) |
| `color` | `string` | `currentColor` | Color del trazo |
| `strokeWidth` | `number` | `2` | Grosor del trazo |
| `fill` | `string` | `none` | Color de relleno |
| `className` | `string` | - | Clases CSS adicionales |
| `style` | `CSSProperties` | - | Estilos inline |
| `onClick` | `function` | - | Evento click |
| `...svgProps` | - | - | Todos los props nativos de SVG |

### 🎨 Ejemplos de Props

#### Tamaños
```tsx
// Número (píxeles)
<User size={16} />
<User size={24} />
<User size={32} />

// String (unidades CSS)
<User size="1rem" />
<User size="2em" />
<User size="100%" />
```

#### Colores
```tsx
// Colores básicos
<Check color="green" />
<X color="red" />
<Info color="blue" />

// Colores CSS
<Settings color="var(--primary-color)" />
<Star color="rgb(255, 215, 0)" />
<Heart color="#ff6b6b" />
```

#### Estilos CSS
```tsx
// Clases CSS
<Menu className="icon-spin" />
<Download className="hover:scale-110 transition-transform" />

// Estilos inline
<Settings style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }} />
```

#### Props de Accesibilidad
```tsx
// ARIA labels
<User aria-label="Perfil de usuario" />
<Settings aria-label="Configuración" />

// Roles
<Button role="button" aria-pressed="false" />
```

---

## 📁 Estructura de Categorías

### 🎯 Categorías Principales

| Categoría | Descripción | Cantidad Aprox. |
|-----------|-------------|-----------------|
| **UI Basics** | Iconos básicos de interfaz | 150+ |
| **Arrows** | Flechas y navegación | 150+ |
| **Business & Finance** | Negocios y finanzas | 135+ |
| **Devices & Hardware** | Dispositivos y hardware | 577+ |
| **Communication** | Comunicación y mensajería | 213+ |
| **E-Commerce & Shopping** | Comercio electrónico | 474+ |
| **Documents** | Documentos y archivos | 184+ |
| **Files** | Gestión de archivos | 188+ |
| **Multimedia** | Medios y entretenimiento | 240+ |
| **Date & Time** | Fechas y tiempo | 250+ |
| **Currencies** | Monedas y divisas | 168+ |
| **Charts & Diagrams** | Gráficos y diagramas | 134+ |
| **Buildings** | Edificios y arquitectura | 193+ |
| **Location & Map** | Ubicación y mapas | 102+ |
| **Connectivity** | Conectividad y redes | 102+ |
| **Chatting** | Chat y conversaciones | 114+ |
| **Messaging** | Mensajería | 114+ |
| **Commenting** | Comentarios | 114+ |
| **Coding** | Programación | 36+ |
| **Design & Editing** | Diseño y edición | 96+ |
| **Education** | Educación | 108+ |
| **Menu & Grids** | Menús y cuadrículas | 36+ |
| **Other** | Otros iconos | 222+ |
| **Payment & Money** | Pagos y dinero | Variable |
| **Security** | Seguridad | Variable |
| **Sign & Indices** | Signos e índices | Variable |
| **Support & Reviews** | Soporte y reseñas | Variable |
| **Text Formatting** | Formato de texto | Variable |
| **Users & People** | Usuarios y personas | Variable |

### 📂 Organización Interna

Cada categoría sigue esta estructura:

```
📁 Categoría/
├── 📁 Regular/          # Estilo Regular
│   ├── 📄 IconNameRegular.tsx
│   ├── 📄 AnotherIconRegular.tsx
│   └── 📄 index.ts
├── 📁 Light/            # Estilo Light
│   ├── 📄 IconNameLight.tsx
│   └── 📄 index.ts
├── 📁 Filled/           # Estilo Filled
│   ├── 📄 IconNameFilled.tsx
│   └── 📄 index.ts
├── 📁 Duotone/          # Estilo Duotone
│   ├── 📄 IconNameDuotone.tsx
│   └── 📄 index.ts
├── 📁 Duotone Line/     # Estilo Duotone Line
│   ├── 📄 IconNameDuotoneLine.tsx
│   └── 📄 index.ts
└── 📄 index.ts          # Exportaciones de la categoría
```

---

## 🎭 Estilos de Iconos

### 🎨 Los 5 Estilos Disponibles

#### 1. **Regular** (Estilo Predeterminado)
- **Descripción**: Iconos con trazos simples y limpios
- **Uso**: Interfaz general, navegación básica
- **Características**: Trazos de 2px, sin relleno

```tsx
import { ArrowUpRegular } from '@opendex-origon/icons/Arrows';
<ArrowUpRegular size={24} />
```

#### 2. **Light** (Estilo Ligero)
- **Descripción**: Versión más sutil con trazos finos
- **Uso**: Elementos secundarios, información sutil
- **Características**: Trazos de 1px, apariencia delicada

```tsx
import { ArrowUpLight } from '@opendex-origon/icons/Arrows';
<ArrowUpLight size={24} />
```

#### 3. **Filled** (Estilo Rellenado)
- **Descripción**: Iconos completamente rellenados
- **Uso**: Elementos importantes, acciones principales
- **Características**: Relleno sólido, mayor peso visual

```tsx
import { ArrowUpFilled } from '@opendex-origon/icons/Arrows';
<ArrowUpFilled size={24} />
```

#### 4. **Duotone** (Estilo Duotono)
- **Descripción**: Iconos con dos colores/tonos
- **Uso**: Elementos destacados, categorías especiales
- **Características**: Combinación de relleno y trazo

```tsx
import { ArrowUpDuotone } from '@opendex-origon/icons/Arrows';
<ArrowUpDuotone size={24} />
```

#### 5. **Duotone Line** (Estilo Duotono Línea)
- **Descripción**: Versión de línea del estilo duotono
- **Uso**: Elementos con doble acento visual
- **Características**: Trazos con dos colores

```tsx
import { ArrowUpDuotoneLine } from '@opendex-origon/icons/Arrows';
<ArrowUpDuotoneLine size={24} />
```

### 🎯 Guía de Selección de Estilos

| Contexto | Estilo Recomendado | Razón |
|----------|-------------------|-------|
| **Navegación principal** | Regular | Claridad y legibilidad |
| **Información secundaria** | Light | Sutileza visual |
| **Acciones importantes** | Filled | Énfasis visual |
| **Categorías especiales** | Duotone | Diferenciación |
| **Elementos destacados** | Duotone Line | Doble acento |

---

## ⚡ Optimización y Performance

### 🚀 Tree-Shaking

La biblioteca está optimizada para tree-shaking automático:

```tsx
// ✅ Solo importa lo que necesitas
import { User, Check } from '@opendex-origon/icons';

// ❌ Evita importaciones innecesarias
import * as AllIcons from '@opendex-origon/icons';
```

### 📦 Tamaño del Bundle

- **Bundle completo**: ~5MB (comprimido)
- **Icono individual**: ~1-2KB
- **Categoría completa**: ~50-200KB

### 🔧 Optimizaciones Recomendadas

#### 1. **Importación Selectiva**
```tsx
// ✅ Recomendado
import { User } from '@opendex-origon/icons';

// ❌ Evitar
import * as Icons from '@opendex-origon/icons';
```

#### 2. **Lazy Loading**
```tsx
import { lazy, Suspense } from 'react';

const UserIcon = lazy(() => import('@opendex-origon/icons').then(module => ({ 
  default: module.User 
})));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserIcon size={24} />
    </Suspense>
  );
}
```

#### 3. **Memoización**
```tsx
import { memo } from 'react';
import { User } from '@opendex-origon/icons';

const UserIcon = memo(({ size, color }: { size: number; color: string }) => (
  <User size={size} color={color} />
));
```

### 📊 Métricas de Performance

| Métrica | Valor |
|---------|-------|
| **Tiempo de carga inicial** | < 100ms |
| **Tamaño por icono** | 1-2KB |
| **Tree-shaking efectividad** | 95%+ |
| **Compatibilidad SSR** | ✅ |
| **Compatibilidad SSG** | ✅ |

---

## 🛠️ Desarrollo y Contribución

### 🔧 Configuración del Entorno

#### 1. **Clonar el Repositorio**
```bash
git clone https://github.com/opendex-origon/opendex-icons.git
cd opendex-icons
```

#### 2. **Instalar Dependencias**
```bash
npm install
```

#### 3. **Scripts Disponibles**
```bash
# Desarrollo con watch
npm run dev

# Build de producción
npm run build

# Generar iconos desde SVG
npm run generate

# Ejecutar tests
npm run test

# Linting
npm run lint

# Verificar tipos TypeScript
npm run type-check

# Formatear código
npm run format
```

### 🔄 Flujo de Trabajo

#### 1. **Generar Nuevos Iconos**
```bash
# 1. Colocar archivos SVG en assets/svg/[categoria]/
# 2. Ejecutar el generador
npm run generate

# 3. Los iconos se generarán automáticamente en src/icons/
```

#### 2. **Proceso de Build**
```bash
# 1. Limpiar build anterior
npm run clean

# 2. Compilar TypeScript
npm run build

# 3. Verificar tipos
npm run type-check
```

#### 3. **Testing y Quality Assurance**
```bash
# 1. Linting
npm run lint

# 2. Formateo
npm run format

# 3. Verificación de tipos
npm run type-check
```

### 📝 Guías de Contribución

#### 1. **Estructura de Commits**
```bash
# Formato: type(scope): description
git commit -m "feat(arrows): add new arrow icons"
git commit -m "fix(build): resolve TypeScript compilation issues"
git commit -m "docs(readme): update installation instructions"
```

#### 2. **Tipos de Commits**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Documentación
- `style`: Formato de código
- `refactor`: Refactorización
- `test`: Tests
- `chore`: Tareas de mantenimiento

#### 3. **Pull Request Process**
1. Fork el repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Hacer commits descriptivos
4. Ejecutar tests y linting
5. Crear Pull Request con descripción detallada

### 🔍 Debugging

#### 1. **Problemas de Build**
```bash
# Verificar configuración TypeScript
npx tsc --noEmit

# Verificar dependencias
npm ls

# Limpiar cache
npm run clean
rm -rf node_modules
npm install
```

#### 2. **Problemas de Importación**
```tsx
// Verificar que el icono existe
import { NonExistentIcon } from '@opendex-origon/icons'; // ❌ Error

// Verificar exportaciones
console.log(Object.keys(require('@opendex-origon/icons')));
```

---

## 📊 Estadísticas y Métricas

### 📈 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Total de iconos únicos** | +10,000 |
| **Categorías** | 25+ |
| **Estilos por icono** | 5 |
| **Total de archivos SVG** | +50,000 |
| **Tamaño del repositorio** | ~500MB |
| **Líneas de código TypeScript** | +100,000 |
| **Tiempo de build** | ~30 segundos |
| **Tamaño del bundle** | ~5MB (comprimido) |

### 🎯 Distribución por Categorías

| Categoría | Cantidad | Porcentaje |
|-----------|----------|------------|
| Devices & Hardware | 577 | 5.77% |
| E-Commerce & Shopping | 474 | 4.74% |
| Communication | 213 | 2.13% |
| Date & Time | 250 | 2.50% |
| Buildings | 193 | 1.93% |
| Documents | 184 | 1.84% |
| Files | 188 | 1.88% |
| Multimedia | 240 | 2.40% |
| Other | 222 | 2.22% |
| Business & Finance | 135 | 1.35% |
| Charts & Diagrams | 134 | 1.34% |
| Currencies | 168 | 1.68% |
| UI Basics | 150 | 1.50% |
| Arrows | 150 | 1.50% |
| Chatting | 114 | 1.14% |
| Messaging | 114 | 1.14% |
| Commenting | 114 | 1.14% |
| Connectivity | 102 | 1.02% |
| Location & Map | 102 | 1.02% |
| Education | 108 | 1.08% |
| Design & Editing | 96 | 0.96% |
| Coding | 36 | 0.36% |
| Menu & Grids | 36 | 0.36% |

### 📊 Métricas de Uso

| Métrica | Valor |
|---------|-------|
| **Descargas npm (mensual)** | +1,000 |
| **Stars en GitHub** | Variable |
| **Forks en GitHub** | Variable |
| **Issues abiertos** | Variable |
| **Pull Requests** | Variable |

---

## 🔒 Licencia y Restricciones

### 📄 Licencia Opendex Icons v1.0

Esta biblioteca está licenciada bajo la **Opendex Icons License v1.0**, una licencia restrictiva diseñada específicamente para el ecosistema de Opendex.

### ✅ **Uso PERMITIDO**

- ✅ Aplicaciones que se integren con servicios de Opendex
- ✅ Proyectos que utilicen APIs de Opendex Corporation
- ✅ Aplicaciones que conecten con productos de Opendex
- ✅ Demostraciones y ejemplos de integración con Opendex
- ✅ Proyectos internos de Opendex Corporation
- ✅ Aplicaciones educativas sobre integración con Opendex

### ❌ **Uso RESTRINGIDO**

- ❌ Aplicaciones comerciales NO relacionadas con Opendex
- ❌ Productos o servicios que compitan con Opendex
- ❌ Redistribución como biblioteca independiente
- ❌ Uso en proyectos que no se integren con Opendex
- ❌ Modificación y redistribución sin autorización
- ❌ Uso en software propietario no relacionado

### 🚨 **Términos Importantes**

1. **Integración Requerida**: Solo se permite el uso en proyectos que se integren activamente con el ecosistema de Opendex.

2. **No Comercial Independiente**: No se permite el uso en aplicaciones comerciales que no utilicen servicios de Opendex.

3. **Atribución**: Se requiere mantener la atribución a Opendex Corporation.

4. **Sin Modificación**: No se permite modificar los iconos sin autorización.

### 📧 **Contacto para Licencias**

Para usos fuera del alcance permitido:
- **Email**: licensing@opendex.com
- **Sitio web**: https://opendex.com/licensing
- **Documentación**: https://docs.opendex.com/icons/license

---

## ❓ FAQ (Preguntas Frecuentes)

### 🤔 **Preguntas Generales**

#### Q: ¿Puedo usar esta biblioteca en mi proyecto comercial?
**A**: Solo si tu proyecto se integra con servicios de Opendex. Para otros usos comerciales, contacta a licensing@opendex.com.

#### Q: ¿Cuántos iconos incluye la biblioteca?
**A**: Más de 10,000 iconos únicos organizados en 25+ categorías, con 5 estilos diferentes cada uno.

#### Q: ¿Es compatible con React Native?
**A**: No directamente. Esta biblioteca está diseñada para React web. Para React Native, necesitarías adaptar los SVGs.

#### Q: ¿Puedo modificar los iconos?
**A**: No se permite modificar los iconos sin autorización explícita de Opendex Corporation.

### 🔧 **Preguntas Técnicas**

#### Q: ¿Cómo optimizo el tamaño del bundle?
**A**: Usa importaciones selectivas y habilita tree-shaking en tu bundler:
```tsx
// ✅ Optimizado
import { User } from '@opendex-origon/icons';

// ❌ No optimizado
import * as Icons from '@opendex-origon/icons';
```

#### Q: ¿Puedo usar los iconos con CSS-in-JS?
**A**: Sí, puedes pasar props de estilo directamente:
```tsx
<Settings style={{ color: 'red', fontSize: '20px' }} />
```

#### Q: ¿Son accesibles los iconos?
**A**: Sí, todos los iconos son SVGs accesibles. Puedes agregar aria-labels:
```tsx
<User aria-label="Perfil de usuario" />
```

#### Q: ¿Puedo cambiar el color de los iconos?
**A**: Sí, usando la prop `color`:
```tsx
<Check color="green" />
<X color="red" />
```

### 🎨 **Preguntas de Diseño**

#### Q: ¿Qué estilo debo usar para mi caso?
**A**: 
- **Regular**: Uso general
- **Light**: Elementos secundarios
- **Filled**: Elementos importantes
- **Duotone**: Elementos destacados
- **Duotone Line**: Doble acento visual

#### Q: ¿Puedo usar diferentes tamaños?
**A**: Sí, usando números (px) o strings (rem, em, %):
```tsx
<User size={24} />
<User size="1.5rem" />
<User size="100%" />
```

#### Q: ¿Son responsive los iconos?
**A**: Sí, todos los iconos son SVGs escalables y responsive por defecto.

### 🚀 **Preguntas de Performance**

#### Q: ¿Afecta el rendimiento usar muchos iconos?
**A**: No significativamente. Cada icono es ~1-2KB y el tree-shaking elimina los no utilizados.

#### Q: ¿Puedo usar lazy loading?
**A**: Sí, puedes usar React.lazy() para cargar iconos dinámicamente.

#### Q: ¿Son compatibles con SSR/SSG?
**A**: Sí, los iconos son compatibles con Server-Side Rendering y Static Site Generation.

---

## 📞 Soporte y Contacto

### 🆘 **Canales de Soporte**

- 📧 **Email**: support@opendex.com
- 💬 **Discord**: [Opendex Community](https://discord.gg/opendex)
- 📖 **Documentación**: [docs.opendex.com/icons](https://docs.opendex.com/icons)
- 🐛 **Issues**: [GitHub Issues](https://github.com/opendex-origon/opendex-icons/issues)
- 📚 **Ejemplos**: [GitHub Examples](https://github.com/opendex-origon/opendex-icons/examples)

### 🎯 **Recursos Adicionales**

- **Guía de Integración**: [docs.opendex.com/integration](https://docs.opendex.com/integration)
- **API Reference**: [docs.opendex.com/api](https://docs.opendex.com/api)
- **Tutoriales**: [docs.opendex.com/tutorials](https://docs.opendex.com/tutorials)
- **Comunidad**: [community.opendex.com](https://community.opendex.com)

---

<div align="center">

**Hecho con ❤️ por [Opendex Corporation](https://opendex.com)**

[![Opendex](https://img.shields.io/badge/Opendex-Corporation-blue?logo=opendex)](https://opendex.com)

*Esta documentación se actualiza regularmente. Última actualización: Diciembre 2024*

</div>
