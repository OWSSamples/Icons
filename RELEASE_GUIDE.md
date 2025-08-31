# Guía de Releases Profesionales

## Workflow de Actualizaciones

### **1. Para Nuevos Iconos (MINOR)**

```bash
# Agregar nuevos iconos
npm run generate

# Actualizar versión y publicar
npm run publish:minor
```

### **2. Para Correcciones (PATCH)**

```bash
# Corregir problemas
# ... hacer cambios ...

# Actualizar versión y publicar
npm run publish:patch
```

### **3. Para Cambios Importantes (MAJOR)**

```bash
# Cambios incompatibles
# ... hacer cambios importantes ...

# Actualizar versión y publicar
npm run publish:major
```

## Scripts Disponibles

### **Scripts de Release:**

- `npm run release:patch` - Actualiza versión PATCH (3.0.0 → 3.0.1)
- `npm run release:minor` - Actualiza versión MINOR (3.0.0 → 3.1.0)
- `npm run release:major` - Actualiza versión MAJOR (3.0.0 → 4.0.0)

### **Scripts de Publicación Completa:**

- `npm run publish:patch` - Release PATCH + Push + Publish
- `npm run publish:minor` - Release MINOR + Push + Publish
- `npm run publish:major` - Release MAJOR + Push + Publish

## Convenciones de Commits

### **Tipos de Commits:**

- `feat:` - Nuevas funcionalidades (iconos)
- `fix:` - Correcciones de bugs
- `docs:` - Documentación
- `style:` - Formato de código
- `refactor:` - Refactorización
- `test:` - Tests
- `chore:` - Tareas de mantenimiento

### **Ejemplos:**

```bash
git commit -m "feat: add new business icons"
git commit -m "fix: resolve import path issues"
git commit -m "docs: update installation guide"
```

## Semantic Versioning

### **MAJOR (X.0.0):**

- Cambios incompatibles con versiones anteriores
- Nuevas APIs o cambios importantes
- Remoción de funcionalidades

### **MINOR (0.X.0):**

- Nuevas funcionalidades compatibles
- Nuevos iconos agregados
- Mejoras en documentación

### **PATCH (0.0.X):**

- Correcciones de bugs
- Mejoras menores
- Actualizaciones de dependencias

## Workflow Automatizado

### **1. GitHub Actions:**

- Se ejecuta automáticamente al hacer push de tags
- Build, test y publicación automática
- Creación de releases en GitHub

### **2. Script de Actualización:**

- Actualiza versión automáticamente
- Actualiza CHANGELOG.md
- Ejecuta build y verificaciones
- Crea commit y tag automáticamente

## 📊 Monitoreo de Calidad

### **Antes de Publicar:**

```bash
# Verificar estado
npm run diagnose

# Build y verificación
npm run build
npm run type-check

# Linting
npm run lint
```

### **Después de Publicar:**

- Verificar publicación en NPM
- Revisar release en GitHub
- Actualizar documentación si es necesario

## 🎯 Mejores Prácticas

### **✅ Hacer:**

- Usar semantic versioning
- Actualizar CHANGELOG.md
- Hacer commits descriptivos
- Probar antes de publicar
- Documentar cambios importantes

### **❌ Evitar:**

- Publicar sin testing
- Cambiar APIs sin documentar
- Ignorar breaking changes
- Publicar versiones sin sentido

## 📈 Métricas de Release

### **Estadísticas Automáticas:**

- Número total de iconos
- Fecha de build
- Versión de Node.js
- Tamaño del paquete

### **Monitoreo:**

- Descargas de NPM
- Issues en GitHub
- Feedback de usuarios
- Compatibilidad con proyectos

---

## 🚀 Comandos Rápidos

```bash
# Release rápido para nuevos iconos
npm run publish:minor

# Release rápido para correcciones
npm run publish:patch

# Release para cambios importantes
npm run publish:major

# Solo actualizar versión (sin publicar)
npm run release:minor
```
