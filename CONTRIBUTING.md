# Guía de Contribución

¡Gracias por tu interés en contribuir a @opendex-origon/icons!

## Tabla de Contenidos

- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estándares de Código](#estándares-de-código)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Features](#solicitar-features)
- [Pull Requests](#pull-requests)

## Cómo Contribuir

### Tipos de Contribuciones

- **Reportar bugs**
- **Solicitar nuevas features**
- **Mejorar documentación**
- **Agregar nuevos iconos**
- **Mejorar el código**
- **Optimizaciones de performance**

## Configuración del Entorno

### Prerrequisitos

- Node.js 16+
- npm 8+
- Git

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/opendex-origon/opendex-icons.git
cd opendex-icons

# Instalar dependencias
npm install

# Configurar husky hooks
npx husky install
```

### Scripts Disponibles

```bash
npm run dev          # Desarrollo con watch
npm run build        # Build de producción
npm run generate     # Generar iconos desde SVG
npm run lint         # Linting y corrección automática
npm run format       # Formateo de código
npm run type-check   # Verificar tipos TypeScript
npm run test         # Ejecutar tests
```

## Flujo de Trabajo

### 1. Crear una rama

```bash
git checkout -b feature/nombre-de-la-feature
# o
git checkout -b fix/nombre-del-bug
```

### 2. Hacer cambios

- Escribe tu código
- Sigue los estándares de código
- Agrega tests si es necesario
- Actualiza la documentación

### 3. Commit

```bash
# Usar commitizen para commits convencionales
npm run commit

# O manualmente (siguiendo conventional commits)
git commit -m "feat: agregar nuevo icono de usuario"
```

### 4. Push y Pull Request

```bash
git push origin feature/nombre-de-la-feature
```

Luego crea un Pull Request en GitHub.

## Estándares de Código

### TypeScript

- Usar tipos estrictos
- Evitar `any`
- Documentar interfaces complejas
- Usar nombres descriptivos

### React

- Componentes funcionales con hooks
- Props tipadas con TypeScript
- Nombres de componentes en PascalCase
- Props con valores por defecto

### Estructura de Archivos

```
src/
├── icons/
│   ├── [Category]/
│   │   ├── IconName.tsx
│   │   └── index.ts
│   └── index.ts
├── types.ts
└── IconBase.tsx
```

### Convenciones de Nombres

- **Iconos**: PascalCase (ej: `UserProfile`)
- **Archivos**: PascalCase.tsx (ej: `UserProfile.tsx`)
- **Carpetas**: PascalCase (ej: `Users`)
- **Variables**: camelCase (ej: `userName`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `DEFAULT_SIZE`)

## Reportar Bugs

### Antes de reportar

1. Busca en issues existentes
2. Verifica que no sea un problema de configuración
3. Prueba en la última versión

### Template de Bug Report

```markdown
## Descripción

Descripción clara y concisa del bug.

## Pasos para reproducir

1. Ir a '...'
2. Hacer clic en '...'
3. Ver error

## Comportamiento esperado

Descripción de lo que debería pasar.

## Comportamiento actual

Descripción de lo que está pasando.

## Información del entorno

- OS: [ej: Windows 10]
- Node.js: [ej: 18.0.0]
- npm: [ej: 8.0.0]
- Versión del paquete: [ej: 0.1.0]

## Capturas de pantalla

Si aplica, agrega capturas de pantalla.

## Información adicional

Cualquier otra información relevante.
```

## Solicitar Features

### Template de Feature Request

```markdown
## Descripción

Descripción clara de la feature solicitada.

## Problema que resuelve

Explicación del problema que esta feature resolvería.

## Solución propuesta

Descripción de la solución propuesta.

## Alternativas consideradas

Otras soluciones que consideraste.

## Información adicional

Cualquier otra información relevante.
```

## Pull Requests

### Checklist antes de enviar

- [ ] Código sigue los estándares
- [ ] Tests pasan
- [ ] Linting sin errores
- [ ] Documentación actualizada
- [ ] Changelog actualizado
- [ ] Commit messages siguen conventional commits

### Template de Pull Request

```markdown
## Descripción

Descripción de los cambios realizados.

## Tipo de cambio

- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Documentación

## Checklist

- [ ] Mi código sigue los estándares
- [ ] He ejecutado los tests
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan warnings

## Información adicional

Cualquier información adicional relevante.
```

## Código de Conducta

### Nuestros Estándares

- Ser respetuoso y inclusivo
- Usar lenguaje apropiado
- Aceptar críticas constructivas
- Enfocarse en lo que es mejor para la comunidad

### Reportar Incidentes

Si experimentas o presencias comportamiento inapropiado, contacta a:

- **Email**: conduct@opendex.com
- **Equipo**: Equipo de Opendex Corporation

## Reconocimientos

- Contribuidores serán mencionados en el README
- Contribuciones significativas serán destacadas
- Todos los contribuidores aparecerán en el changelog

## Contacto

- **Email**: contribute@opendex.com
- **Discord**: [Opendex Community](https://discord.gg/opendex)
- **Documentación**: [docs.opendex.com/icons](https://docs.opendex.com/icons)

---

**¡Gracias por contribuir a hacer @opendex-origon/icons mejor!** 🚀
