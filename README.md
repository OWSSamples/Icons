# 🎨 Origon Icons

Una colección completa de iconos SVG optimizados, distribuida como paquete npm con iconos servidos desde Cloudflare CDN.

[![npm](https://img.shields.io/npm/v/%40opendex-origon%2Ficons.svg)](https://www.npmjs.com/package/@opendex-origon/icons)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🚀 Características

- **44,281 variantes de iconos** en 8 tamaños y 8 estilos
- **2,996 iconos únicos** organizados en categorías
- **Paquete npm ligero** - solo componentes, iconos desde CDN
- **CDN global** con Cloudflare para máxima velocidad
- **Componentes React** con TypeScript
- **Tree-shaking friendly**
- **Caché optimizado** (1 año de duración)

## 📊 Estadísticas

- **Total de iconos:** 2,996
- **Total de variantes:** 44,281
- **Tamaños disponibles:** 10, 12, 16, 20, 24, 28, 32, 48
- **Estilos disponibles:** color, filled, filled_ltr, filled_rtl, light, regular, regular_ltr, regular_rtl
- **Categorías:** 2,887

## 🌐 URLs Base

- **CDN Base:** `https://cdn.origonlabs.opendex.dev`
- **Catálogo:** `https://cdn.origonlabs.opendex.dev/catalog.json`
- **API de búsqueda:** `https://cdn.origonlabs.opendex.dev/icon-search.js`

## 📦 Instalación

```bash
npm install @opendex-origon/icons
# o
yarn add @opendex-origon/icons
```

## 📖 Uso

### Componente React (Recomendado)

```jsx
import React from 'react';
import { OrigonIcon } from '@opendex-origon/icons';

function App() {
  return (
    <div>
      <OrigonIcon name='Zoom In' size={24} style='regular' />
      <OrigonIcon name='Accessibility' size={32} style='filled' />
      <OrigonIcon name='Add Circle' size={16} style='light' />
    </div>
  );
}
```

### Hook para URLs

```jsx
import React from 'react';
import { useOrigonIcon } from '@opendex-origon/icons';

function CustomIcon({ name, size = 24, style = 'regular' }) {
  const iconUrl = useOrigonIcon({ name, size, style });

  return <img src={iconUrl} alt={name} width={size} height={size} />;
}
```

### URL Directa (sin paquete)

```html
<img
  src="https://cdn.origonlabs.opendex.dev/icons/Accessibility/SVG/ic_origon_accessibility_24_regular.svg"
  alt="Accessibility"
  width="24"
  height="24"
/>
```

## 🔍 API de Búsqueda

### Cargar la API

```html
<script src="https://cdn.origonlabs.opendex.dev/icon-search.js"></script>
```

### Uso Básico

```javascript
// Inicializar
const search = new OrigonIconSearch();

// Buscar iconos
const results = await search.search('zoom');
console.log(results); // Array de iconos que coinciden

// Obtener icono específico
const icon = await search.getIcon('Zoom In', 24, 'filled');
console.log(icon.url); // URL directa del SVG
```

## 🛠️ Desarrollo

### Scripts Disponibles

```bash
# Compilar para publicación
npm run build

# Lint y type-check
npm run lint:check
npm run type-check

# Limpiar dist
npm run clean

# Publicación (se ejecuta build automáticamente)
npm publish --access public
```

### Estructura del Proyecto

```
src/
├── index.ts              # Exportaciones principales
├── OrigonIcon.tsx        # Componente principal
├── IconBase.tsx          # Componente base para CDN
├── useOrigonIcon.ts      # Hook para URLs
├── types.ts              # Tipos TypeScript
└── icons/                # Componentes individuales (legacy)
```

## 🎨 Estilos Disponibles

| Estilo        | Descripción               |
| ------------- | ------------------------- |
| `regular`     | Contorno estándar         |
| `filled`      | Relleno sólido            |
| `light`       | Contorno ligero           |
| `color`       | Versión a color           |
| `regular_ltr` | Regular izquierda-derecha |
| `regular_rtl` | Regular derecha-izquierda |
| `filled_ltr`  | Filled izquierda-derecha  |
| `filled_rtl`  | Filled derecha-izquierda  |

## 📏 Tamaños Disponibles

- **10px** - Muy pequeño
- **12px** - Pequeño
- **16px** - Estándar pequeño
- **20px** - Estándar
- **24px** - Estándar grande (recomendado)
- **28px** - Grande
- **32px** - Muy grande
- **48px** - Extra grande

## 🔒 Seguridad

- **HTTPS:** Obligatorio para CDN
- **CORS:** Configurado para dominios autorizados
- **Validación:** Nombres de archivo sanitizados
- **Sin secretos:** El paquete npm no contiene credenciales

## 📚 Recursos Adicionales

- **CDN Base:** `https://cdn.origonlabs.opendex.dev`
- **Catálogo:** `https://cdn.origonlabs.opendex.dev/catalog.json`
- **API de búsqueda:** `https://cdn.origonlabs.opendex.dev/icon-search.js`

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

---

**Última actualización:** Manual
**Versión:** 3.0.0
