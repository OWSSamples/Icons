# 🚀 Guía de Despliegue - Origon Icons CDN

Esta guía explica cómo desplegar y mantener el CDN de iconos Origon de forma segura y eficiente.

## 📋 Prerrequisitos

### Herramientas Requeridas

- **Node.js** 16+
- **AWS CLI** 2.0+
- **Git** para control de versiones
- **Cloudflare R2** account

### Credenciales Necesarias

- Cloudflare R2 Access Key ID
- Cloudflare R2 Secret Access Key
- Cloudflare Account ID

## 🔧 Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone https://github.com/origonlabs/icons.git
cd icons
npm install
```

### 2. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar con tus credenciales
nano .env
```

**Contenido del archivo .env:**

```bash
# Cloudflare R2 Credentials
R2_ACCESS_KEY_ID=your_access_key_here
R2_SECRET_ACCESS_KEY=your_secret_key_here

# Cloudflare R2 Endpoint
R2_ENDPOINT_URL=https://your-account-id.r2.cloudflarestorage.com

# Bucket Configuration
R2_BUCKET_NAME=origonlabs

# CDN Configuration
CDN_BASE_URL=https://cdn.origonlabs.opendex.dev
```

### 3. Configurar AWS CLI

```bash
# Configurar perfil para R2
aws configure set aws_access_key_id $R2_ACCESS_KEY_ID --profile r2
aws configure set aws_secret_access_key $R2_SECRET_ACCESS_KEY --profile r2
aws configure set region auto --profile r2
```

## 🏗️ Proceso de Despliegue

### Paso 1: Preparar Assets

```bash
# Generar catálogo de iconos
node scripts/generate-catalog.js

# Optimizar SVGs (opcional)
node scripts/optimize-svg.js
```

### Paso 2: Configurar CORS

```bash
# Configurar CORS para acceso web
node scripts/setup-cors.js
```

### Paso 3: Sincronizar Archivos

```bash
# Sincronización incremental (recomendado)
node scripts/sync-optimized.js incremental

# O sincronización completa
node scripts/sync-optimized.js full
```

### Paso 4: Verificar Despliegue

```bash
# Verificar estado
node scripts/sync-optimized.js check

# Validar URLs
node scripts/url-validator.js
```

## 🔄 Flujo de Trabajo Continuo

### Actualización de Iconos

```bash
# 1. Agregar nuevos iconos al directorio assets/icons/
# 2. Generar catálogo actualizado
node scripts/generate-catalog.js

# 3. Sincronizar solo cambios
node scripts/sync-optimized.js incremental

# 4. Verificar
node scripts/url-validator.js
```

### Actualización de Scripts

```bash
# 1. Actualizar scripts
# 2. Subir scripts actualizados
aws s3 cp scripts/ s3://origonlabs/scripts/ --recursive --endpoint-url "https://685457b7c4529ea63b6daef6bd6fac0b.r2.cloudflarestorage.com" --profile r2

# 3. Verificar funcionalidad
```

## 🛠️ Scripts de Mantenimiento

### Generación de Catálogo

```bash
# Generar catálogo completo
node scripts/generate-catalog.js

# El catálogo se guarda en catalog.json
# Se sube automáticamente a s3://origonlabs/catalog.json
```

### Optimización de SVGs

```bash
# Optimizar todos los SVGs
node scripts/optimize-svg.js

# Reduce el tamaño de archivos manteniendo calidad
# Procesa en lotes para evitar sobrecarga de memoria
```

### Sincronización Inteligente

```bash
# Verificar estado sin subir
node scripts/sync-optimized.js check

# Sincronización incremental (solo cambios)
node scripts/sync-optimized.js incremental

# Sincronización completa (forzar todo)
node scripts/sync-optimized.js full

# Simulación (dry run)
node scripts/sync-optimized.js dry-run
```

### Validación de URLs

```bash
# Validar muestra de URLs
node scripts/url-validator.js

# Genera reporte de validación
# Exporta resultados a validation-report.json
```

## 🔍 Monitoreo y Verificación

### Verificar CORS

```bash
aws s3api get-bucket-cors --bucket origonlabs --endpoint-url "https://685457b7c4529ea63b6daef6bd6fac0b.r2.cloudflarestorage.com" --profile r2
```

### Verificar Archivos

```bash
# Contar archivos en bucket
aws s3 ls s3://origonlabs/icons/ --recursive --endpoint-url "https://685457b7c4529ea63b6daef6bd6fac0b.r2.cloudflarestorage.com" --profile r2 | wc -l

# Verificar catálogo
curl https://cdn.origonlabs.opendex.dev/catalog.json | jq '.totalIcons'
```

### Verificar CDN

```bash
# Probar acceso a icono
curl -I https://cdn.origonlabs.opendex.dev/icons/Accessibility/SVG/ic_origon_accessibility_24_regular.svg

# Verificar headers
curl -I https://cdn.origonlabs.opendex.dev/catalog.json
```

## 🚨 Solución de Problemas

### Error: Credenciales no encontradas

```bash
# Verificar variables de entorno
echo $R2_ACCESS_KEY_ID
echo $R2_SECRET_ACCESS_KEY

# Reconfigurar si es necesario
aws configure set aws_access_key_id $R2_ACCESS_KEY_ID --profile r2
```

### Error: CORS no configurado

```bash
# Reconfigurar CORS
node scripts/setup-cors.js

# Verificar configuración
aws s3api get-bucket-cors --bucket origonlabs --endpoint-url "https://685457b7c4529ea63b6daef6bd6fac0b.r2.cloudflarestorage.com" --profile r2
```

### Error: Archivos no sincronizados

```bash
# Verificar estado
node scripts/sync-optimized.js check

# Forzar sincronización completa
node scripts/sync-optimized.js full
```

### Error: URLs inválidas

```bash
# Validar URLs
node scripts/url-validator.js

# Revisar reporte
cat validation-report.json
```

## 📊 Métricas de Despliegue

### Archivos Esperados

- **Iconos SVG:** 44,281 archivos
- **Catálogo:** 1 archivo (catalog.json)
- **Scripts:** 4 archivos
- **Documentación:** 3 archivos

### Tamaños Típicos

- **Total de iconos:** ~50-100 MB
- **Catálogo:** ~2-5 MB
- **Scripts:** ~50-100 KB
- **Documentación:** ~10-20 KB

### Tiempos de Despliegue

- **Sincronización incremental:** 2-5 minutos
- **Sincronización completa:** 10-20 minutos
- **Generación de catálogo:** 1-2 minutos
- **Configuración CORS:** < 1 minuto

## 🔐 Consideraciones de Seguridad

### Credenciales

- ✅ Usar variables de entorno
- ✅ No hardcodear en scripts
- ✅ Rotar regularmente
- ✅ Permisos mínimos necesarios

### CORS

- ✅ Solo dominios autorizados
- ✅ Métodos limitados (GET, HEAD)
- ✅ Headers expuestos mínimos

### Validación

- ✅ Sanitizar nombres de archivo
- ✅ Validar entrada de usuario
- ✅ Verificar integridad de archivos

## 📞 Soporte

### Problemas Comunes

1. **Credenciales incorrectas:** Verificar variables de entorno
2. **CORS bloqueado:** Reconfigurar CORS
3. **Archivos faltantes:** Ejecutar sincronización completa
4. **URLs inválidas:** Validar con script de validación

### Contacto

- **Email:** support@origonlabs.com
- **Documentación:** [README.md](README.md)
- **Seguridad:** [SECURITY.md](SECURITY.md)

---

**Última actualización:** $(date)
**Versión:** 1.0.0
