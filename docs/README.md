# Origon Icons CDN

Una colección completa de iconos SVG optimizados, servidos desde Cloudflare CDN con API de búsqueda avanzada.

## 🚀 Características

- **44,281 variantes de iconos** en 8 tamaños y 8 estilos
- **2,996 iconos únicos** organizados en 2,887 categorías
- **CDN global** con Cloudflare para máxima velocidad
- **API de búsqueda** con filtros avanzados
- **Caché optimizado** (1 año de duración)
- **Formato SVG** escalable y ligero

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

## 📖 Uso Básico

### URL Directa
```html
<img src="https://cdn.origonlabs.opendex.dev/icons/Accessibility/SVG/ic_origon_accessibility_24_regular.svg" 
     alt="Accessibility" width="24" height="24" />
```

### En React
```jsx
const Icon = ({ name, size = 24, style = 'regular', ...props }) => {
  const url = `https://cdn.origonlabs.opendex.dev/icons/${encodeURIComponent(name)}/SVG/ic_origon_${name.toLowerCase().replace(/\s+/g, '_')}_${size}_${style}.svg`;
  
  return <img src={url} alt={name} width={size} height={size} {...props} />;
};

// Uso
<Icon name="Zoom In" size={32} style="filled" />
```

### En Vue
```vue
<template>
  <img :src="iconUrl" :alt="name" :width="size" :height="size" />
</template>

<script>
export default {
  props: {
    name: String,
    size: { type: Number, default: 24 },
    style: { type: String, default: 'regular' }
  },
  computed: {
    iconUrl() {
      const baseUrl = 'https://cdn.origonlabs.opendex.dev';
      const encodedName = encodeURIComponent(this.name);
      const fileName = `ic_origon_${this.name.toLowerCase().replace(/\s+/g, '_')}_${this.size}_${this.style}.svg`;
      return `${baseUrl}/icons/${encodedName}/SVG/${fileName}`;
    }
  }
}
</script>
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

### Búsqueda Avanzada
```javascript
// Buscar con filtros
const results = await search.search('arrow', {
  size: 24,           // Solo iconos de 24px
  style: 'filled',    // Solo estilo filled
  category: 'Navigation', // Solo categoría Navigation
  limit: 10           // Máximo 10 resultados
});

// Búsqueda exacta
const exactResults = await search.search('Zoom In', { exact: true });

// Obtener por categoría
const navigationIcons = await search.getByCategory('Navigation');

// Obtener todas las categorías
const categories = await search.getCategories();

// Estadísticas
const stats = await search.getStats();
console.log(stats.totalIcons); // 2996
```

## 🎨 Estilos Disponibles

| Estilo | Descripción | Ejemplo |
|--------|-------------|---------|
| `regular` | Contorno estándar | `ic_origon_zoom_in_24_regular.svg` |
| `filled` | Relleno sólido | `ic_origon_zoom_in_24_filled.svg` |
| `light` | Contorno ligero | `ic_origon_zoom_in_24_light.svg` |
| `color` | Versión a color | `ic_origon_zoom_in_24_color.svg` |
| `regular_ltr` | Regular izquierda-derecha | `ic_origon_zoom_in_24_regular_ltr.svg` |
| `regular_rtl` | Regular derecha-izquierda | `ic_origon_zoom_in_24_regular_rtl.svg` |
| `filled_ltr` | Filled izquierda-derecha | `ic_origon_zoom_in_24_filled_ltr.svg` |
| `filled_rtl` | Filled derecha-izquierda | `ic_origon_zoom_in_24_filled_rtl.svg` |

## 📏 Tamaños Disponibles

- **10px** - Muy pequeño
- **12px** - Pequeño
- **16px** - Estándar pequeño
- **20px** - Estándar
- **24px** - Estándar grande (recomendado)
- **28px** - Grande
- **32px** - Muy grande
- **48px** - Extra grande

## 🏷️ Convención de Nombres

Los nombres de archivo siguen el patrón:
```
ic_origon_[nombre]_[tamaño]_[estilo].svg
```

Ejemplos:
- `ic_origon_zoom_in_24_regular.svg`
- `ic_origon_accessibility_16_filled.svg`
- `ic_origon_weather_sunny_32_color.svg`

## 🔧 Utilidades

### Generar URL
```javascript
const search = new OrigonIconSearch();

// Generar URL manualmente
const url = search.generateUrl('Zoom In', 24, 'filled');
// Resultado: https://cdn.origonlabs.opendex.dev/icons/Zoom%20In/SVG/ic_origon_zoom_in_24_filled.svg
```

### Validar Icono
```javascript
// Verificar si un icono existe
const icon = await search.getIcon('Non Existent Icon');
if (icon) {
  console.log('Icono encontrado:', icon.url);
} else {
  console.log('Icono no encontrado');
}
```

## 🚀 Optimizaciones

### Caché
- **Duración:** 1 año (31,536,000 segundos)
- **Tipo:** Inmutable
- **Headers:** `Cache-Control: public, max-age=31536000, immutable`

### Compresión
- **Gzip:** Habilitado automáticamente
- **Brotli:** Disponible en navegadores compatibles

### CDN
- **Proveedor:** Cloudflare
- **Cobertura:** Global
- **Tiempo de respuesta:** < 50ms promedio

## 📱 Compatibilidad

- ✅ **Navegadores modernos** (Chrome, Firefox, Safari, Edge)
- ✅ **React** (16.8+)
- ✅ **Vue** (2.6+, 3.x)
- ✅ **Angular** (8+)
- ✅ **Vanilla JavaScript**
- ✅ **Node.js** (con fetch polyfill)

## 🔒 Seguridad

- **HTTPS:** Obligatorio
- **CORS:** Configurado para dominios autorizados
- **Validación:** Nombres de archivo sanitizados

## 📞 Soporte

- **Documentación:** [Ver ejemplos completos](./examples/)
- **Issues:** [Reportar problemas](https://github.com/origonlabs/icons/issues)
- **Contacto:** [support@origonlabs.com](mailto:support@origonlabs.com)

## 📄 Licencia

MIT License - Ver [LICENSE](../LICENSE) para más detalles.

---

**Última actualización:** $(date)
**Versión del catálogo:** 1.0.0
