# 🔒 Política de Seguridad - Origon Icons CDN

## Resumen de Seguridad

Este documento describe las medidas de seguridad implementadas en el CDN de iconos Origon y las mejores prácticas para su uso seguro.

## 🛡️ Medidas de Seguridad Implementadas

### 1. Configuración CORS

- **Orígenes permitidos:** Solo dominios autorizados
- **Métodos permitidos:** GET, HEAD únicamente
- **Headers expuestos:** Limitados a metadatos necesarios
- **Duración de preflight:** 1 hora (3600 segundos)

### 2. Validación de Entrada

- **Nombres de archivo:** Sanitizados automáticamente
- **Encoding:** URL encoding obligatorio para caracteres especiales
- **Patrones de archivo:** Validación estricta de nombres

### 3. Headers de Seguridad

- **Content-Type:** `image/svg+xml` para archivos SVG
- **Cache-Control:** `public, max-age=31536000, immutable`
- **ETag:** Hash MD5 para verificación de integridad

### 4. Gestión de Credenciales

- **Variables de entorno:** Credenciales no hardcodeadas
- **Archivo de ejemplo:** `env.example` para configuración
- **Separación:** Credenciales separadas del código fuente

## 🚨 Vulnerabilidades Corregidas

### Credenciales Hardcodeadas

**Problema:** Las credenciales de R2 estaban hardcodeadas en los scripts.

**Solución:**

- ✅ Migrado a variables de entorno
- ✅ Creado archivo `env.example`
- ✅ Documentación actualizada

**Archivos afectados:**

- `scripts/setup-cors.js`
- `scripts/sync-optimized.js`

## 🔍 Auditoría de Seguridad

### Verificaciones Realizadas

1. **Búsqueda de credenciales hardcodeadas**

   ```bash
   grep -r "password\|secret\|key\|token\|credential" . --exclude-dir=node_modules
   ```

2. **Verificación de CORS**

   ```bash
   aws s3api get-bucket-cors --bucket origonlabs
   ```

3. **Validación de headers**
   - Content-Type correcto
   - Cache-Control apropiado
   - ETag presente

### Resultados

- ✅ **Credenciales:** Migradas a variables de entorno
- ✅ **CORS:** Configurado correctamente
- ✅ **Headers:** Optimizados y seguros
- ✅ **Validación:** Implementada en todos los scripts

## 🛠️ Mejores Prácticas

### Para Desarrolladores

1. **Nunca hardcodear credenciales**

   ```javascript
   // ❌ MALO
   const accessKey = 'c31ef114db9524f7ec2d2b82b19eb894';

   // ✅ BUENO
   const accessKey = process.env.R2_ACCESS_KEY_ID;
   ```

2. **Usar variables de entorno**

   ```bash
   # Crear archivo .env
   cp env.example .env
   # Editar con tus credenciales
   ```

3. **Validar entrada de usuario**
   ```javascript
   // Sanitizar nombres de iconos
   const sanitizedName = encodeURIComponent(iconName);
   ```

### Para Administradores

1. **Rotar credenciales regularmente**
2. **Monitorear acceso al bucket**
3. **Revisar logs de Cloudflare**
4. **Actualizar CORS según necesidades**

## 🔐 Configuración Segura

### Variables de Entorno Requeridas

```bash
# Cloudflare R2
R2_ACCESS_KEY_ID=your_access_key_here
R2_SECRET_ACCESS_KEY=your_secret_key_here
R2_ENDPOINT_URL=https://your-account-id.r2.cloudflarestorage.com
R2_BUCKET_NAME=origonlabs

# CDN
CDN_BASE_URL=https://cdn.origonlabs.opendex.dev
```

### Permisos Mínimos

Las credenciales de R2 deben tener solo los permisos necesarios:

- `s3:GetObject`
- `s3:PutObject`
- `s3:DeleteObject`
- `s3:PutBucketCors`
- `s3:GetBucketCors`

## 🚨 Reporte de Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad:

1. **NO** crear un issue público
2. Enviar email a: security@origonlabs.com
3. Incluir:
   - Descripción detallada
   - Pasos para reproducir
   - Impacto potencial
   - Sugerencias de mitigación

### Respuesta

- **Tiempo de respuesta:** 24-48 horas
- **Proceso:** Investigación → Parche → Comunicación
- **Reconocimiento:** Con consentimiento del reportero

## 📋 Checklist de Seguridad

### Antes de cada despliegue:

- [ ] Credenciales en variables de entorno
- [ ] CORS configurado correctamente
- [ ] Headers de seguridad presentes
- [ ] Validación de entrada implementada
- [ ] Logs de acceso monitoreados

### Revisión mensual:

- [ ] Rotar credenciales si es necesario
- [ ] Revisar logs de acceso
- [ ] Actualizar dependencias
- [ ] Verificar configuración CORS
- [ ] Auditoría de permisos

## 📞 Contacto de Seguridad

- **Email:** security@origonlabs.com
- **Respuesta:** 24-48 horas
- **Confidencialidad:** Garantizada

---

**Última actualización:** $(date)
**Versión:** 1.0.0
