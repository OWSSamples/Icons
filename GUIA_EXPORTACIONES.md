# 🚀 GUÍA COMPLETA DE EXPORTACIONES DE ICONOS

## 📋 ÍNDICE RÁPIDO

- [Métodos de Importación](#métodos-de-importación)
- [Aliases Rápidos](#aliases-rápidos)
- [Búsqueda por Categorías](#búsqueda-por-categorías)
- [Búsqueda por Casos de Uso](#búsqueda-por-casos-de-uso)
- [Estilos Disponibles](#estilos-disponibles)
- [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🎯 MÉTODOS DE IMPORTACIÓN

### 1. **ALIASES RÁPIDOS** ⚡ (Recomendado)

```typescript
// ✅ MÁS FÁCIL - Nombres cortos y simples
import { 
  ArrowUp, 
  Home, 
  User, 
  Settings,
  Search,
  Plus,
  Close,
  Check,
  Heart,
  Star
} from '@opendex-origon/icons';

// Uso directo
<ArrowUp size={24} />
<Home color="blue" />
<User />
```

### 2. **BÚSQUEDA DIRECTA** 🔍

```typescript
// ✅ PRECISO - Nombres exactos con estilo
import { 
  ArrowUpRegular, 
  HomeRegular, 
  UserRegular,
  SettingsRegular,
  SearchRegular
} from '@opendex-origon/icons';

// Uso con nombres completos
<ArrowUpRegular size={24} />
<HomeRegular color="blue" />
```

### 3. **IMPORTACIÓN TEMÁTICA** 📂

```typescript
// ✅ ORGANIZADO - Por categoría de uso
import { 
  // Navegación
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  
  // Interfaz
  Home, User, Settings, Search,
  
  // Acciones
  Plus, Minus, Close, Check,
  
  // Estados
  Heart, Star, Like
} from '@opendex-origon/icons';
```

---

## 🎨 ALIASES RÁPIDOS

### **Flechas Básicas**
```typescript
import { 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  ArrowUpSmall, ArrowDownSmall, ArrowLeftSmall, ArrowRightSmall,
  ArrowUpCircle, ArrowDownCircle, ArrowLeftCircle, ArrowRightCircle,
  ArrowUpSquare, ArrowDownSquare, ArrowLeftSquare, ArrowRightSquare
} from '@opendex-origon/icons';
```

### **Flechas Avanzadas**
```typescript
import { 
  // Flechas diagonales
  ArrowUpLeft, ArrowUpRight, ArrowDownLeft, ArrowDownRight,
  ArrowUpLeftCircle, ArrowUpRightCircle, ArrowDownLeftCircle, ArrowDownRightCircle,
  ArrowUpLeftSquare, ArrowUpRightSquare, ArrowDownLeftSquare, ArrowDownRightSquare,
  
  // Flechas de línea
  ArrowUpLine, ArrowDownLine, ArrowLeftLine, ArrowRightLine,
  ArrowUpLineCircle, ArrowDownLineCircle, ArrowLeftLineCircle, ArrowRightLineCircle,
  ArrowUpLineSquare, ArrowDownLineSquare, ArrowLeftLineSquare, ArrowRightLineSquare,
  
  // Flechas desde línea
  ArrowUpFromLine, ArrowDownFromLine, ArrowLeftFromLine, ArrowRightFromLine,
  ArrowUpFromLineCircle, ArrowDownFromLineCircle, ArrowLeftFromLineCircle, ArrowRightFromLineCircle,
  ArrowUpFromLineSquare, ArrowDownFromLineSquare, ArrowLeftFromLineSquare, ArrowRightFromLineSquare,
  
  // Flechas especiales
  ArrowUpDown, ArrowUpDownSimple, ArrowRightLeft, ArrowRightLeftSimple
} from '@opendex-origon/icons';
```

### **Navegación**
```typescript
import { 
  Home, User, Settings, Search, Menu,
  Back, Forward, Refresh, Close
} from '@opendex-origon/icons';
```

### **Acciones**
```typescript
import { 
  Plus, Minus, Check, Close, Edit, Delete,
  Save, Cancel, Confirm, Undo, Redo
} from '@opendex-origon/icons';
```

### **Estados**
```typescript
import { 
  Heart, Star, Like, Favorite, Bookmark,
  Success, Error, Warning, Info
} from '@opendex-origon/icons';
```

### **Comunicación**
```typescript
import { 
  Message, Mail, Phone, Video, Call,
  Send, Receive, Share, Copy
} from '@opendex-origon/icons';
```

### **Archivos**
```typescript
import { 
  File, Folder, Download, Upload, Save,
  Document, Image, Video, Audio
} from '@opendex-origon/icons';
```

---

## 📂 BÚSQUEDA POR CATEGORÍAS

### **UI-Basics** (204 iconos)
```typescript
// Elementos básicos de interfaz
import { 
  Check, X, Plus, Minus, Search, Filter,
  Sort, Menu, Settings, Notifications,
  Bell, Eye, EyeSlash, Lock, Unlock
} from '@opendex-origon/icons';

// Búsqueda avanzada
import { 
  SearchArrowDown, SearchArrowUp, SearchBan, SearchBolt,
  SearchCheck, SearchClock, SearchCode, SearchDollar,
  SearchGear, SearchHeart, SearchLock, SearchPlus,
  SearchShare, SearchStar, SearchUser, SearchXmark
} from '@opendex-origon/icons';
```

### **Arrows** (150 iconos)
```typescript
// Todas las variaciones de flechas
import { 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  AngleUp, AngleDown, AngleLeft, AngleRight
} from '@opendex-origon/icons';
```

### **Devices-Hardware** (577 iconos)
```typescript
// Dispositivos básicos
import { 
  Laptop, Desktop, Mobile, Tablet, Camera,
  Phone, Headphones, Keyboard, Mouse, Printer
} from '@opendex-origon/icons';

// Dispositivos avanzados
import { 
  // Cámaras especializadas
  CameraArrowDown, CameraArrowUp, CameraBan, CameraBolt,
  CameraCheck, CameraClock, CameraCode, CameraDollar,
  CameraGear, CameraHeart, CameraLock, CameraPlus,
  CameraSearch, CameraShare, CameraStar, CameraUser,
  
  // Displays y monitores
  DisplayArrowDown, DisplayArrowUp, DisplayBan, DisplayBolt,
  DisplayCheck, DisplayClock, DisplayCode, DisplayDollar,
  DisplayGear, DisplayHeart, DisplayLock, DisplayPlus,
  DisplaySearch, DisplayShare, DisplayStar, DisplayUser,
  
  // Servidores y redes
  ServerConnection, ServerNetwork, ServerSimple,
  RouterWifi, RouterWifiAlt, HardDriveCloud
} from '@opendex-origon/icons';
```

### **E-Commerce-Shopping** (474 iconos)
```typescript
// Comercio electrónico
import { 
  ShoppingCart, Bag, Store, Product, Price,
  Discount, Gift, Package, Delivery, Payment
} from '@opendex-origon/icons';
```

### **Communication** (213 iconos)
```typescript
// Comunicación
import { 
  Message, Mail, Phone, Video, Call,
  Chat, Comment, Reply, Forward, Share
} from '@opendex-origon/icons';
```

---

## 🎯 BÚSQUEDA POR CASOS DE USO

### **Dashboard/Admin**
```typescript
import { 
  Dashboard, Analytics, Charts, Reports,
  Users, Settings, Notifications, Logout
} from '@opendex-origon/icons';
```

### **Formularios**
```typescript
import { 
  User, Email, Phone, Location, Calendar,
  Check, Close, Save, Reset, Submit
} from '@opendex-origon/icons';
```

### **Navegación**
```typescript
import { 
  Home, Menu, Back, Forward, Breadcrumb,
  Search, Filter, Sort, Pagination
} from '@opendex-origon/icons';
```

### **Notificaciones**
```typescript
import { 
  Bell, Notification, Alert, Warning,
  Success, Error, Info, Message
} from '@opendex-origon/icons';
```

### **Acciones de Usuario**
```typescript
import { 
  Edit, Delete, Copy, Share, Download,
  Upload, Print, Export, Import
} from '@opendex-origon/icons';
```

---

## 🎨 ESTILOS DISPONIBLES

### **Regular** (Estilo por defecto)
```typescript
import { ArrowUpRegular } from '@opendex-origon/icons';
// o simplemente
import { ArrowUp } from '@opendex-origon/icons';
```

### **Filled** (Relleno sólido)
```typescript
import { ArrowUpFilled } from '@opendex-origon/icons';
```

### **Light** (Línea fina)
```typescript
import { ArrowUpLight } from '@opendex-origon/icons';
```

### **Duotone** (Dos colores)
```typescript
import { ArrowUpDuotone } from '@opendex-origon/icons';
```

### **Duotone Line** (Línea con dos colores)
```typescript
import { ArrowUpDuotoneLine } from '@opendex-origon/icons';
```

---

## 💡 EJEMPLOS PRÁCTICOS

### **Botón con Icono**
```tsx
import { Plus, Check, Close } from '@opendex-origon/icons';

function Button({ variant = 'primary', children, ...props }) {
  const icons = {
    add: <Plus size={16} />,
    confirm: <Check size={16} />,
    cancel: <Close size={16} />
  };

  return (
    <button className={`btn btn-${variant}`} {...props}>
      {icons[variant]} {children}
    </button>
  );
}
```

### **Navegación**
```tsx
import { Home, User, Settings, Search } from '@opendex-origon/icons';

function Navigation() {
  return (
    <nav>
      <a href="/"><Home size={20} /> Inicio</a>
      <a href="/profile"><User size={20} /> Perfil</a>
      <a href="/settings"><Settings size={20} /> Configuración</a>
      <button><Search size={20} /></button>
    </nav>
  );
}
```

### **Estados de Formulario**
```tsx
import { Check, X, Alert } from '@opendex-origon/icons';

function FormField({ status, message }) {
  const statusIcons = {
    success: <Check size={16} color="green" />,
    error: <X size={16} color="red" />,
    warning: <Alert size={16} color="orange" />
  };

  return (
    <div className={`field field-${status}`}>
      <input />
      {status && statusIcons[status]}
      {message && <span>{message}</span>}
    </div>
  );
}
```

### **Lista de Acciones**
```tsx
import { Edit, Delete, Copy, Share } from '@opendex-origon/icons';

function ActionList({ item }) {
  return (
    <div className="actions">
      <button title="Editar"><Edit size={16} /></button>
      <button title="Eliminar"><Delete size={16} /></button>
      <button title="Copiar"><Copy size={16} /></button>
      <button title="Compartir"><Share size={16} /></button>
    </div>
  );
}
```

---

## 🔍 CONSEJOS DE BÚSQUEDA

### **1. Usa Aliases para Iconos Comunes**
```typescript
// ✅ BUENO - Aliases simples
import { ArrowUp, Home, User } from '@opendex-origon/icons';

// ❌ EVITAR - Nombres largos para iconos básicos
import { ArrowUpRegular, HomeRegular, UserRegular } from '@opendex-origon/icons';
```

### **2. Agrupa por Categoría**
```typescript
// ✅ BUENO - Organizado por uso
import { 
  // Navegación
  ArrowUp, ArrowDown, Home,
  // Acciones
  Plus, Minus, Check, Close,
  // Estados
  Heart, Star
} from '@opendex-origon/icons';
```

### **3. Usa Nombres Completos para Específicos**
```typescript
// ✅ BUENO - Para iconos específicos
import { 
  CameraArrowDownRegular,
  DesktopMobileRegular,
  HardDriveCloudRegular
} from '@opendex-origon/icons';
```

---

## 📚 RECURSOS ADICIONALES

- **Lista Completa**: `ICON_LIST.md` - Todos los 4,806 iconos
- **Resumen**: `ICON_SUMMARY.md` - Estadísticas y categorías
- **Búsqueda Rápida**: `GUIA_BUSQUEDA_RAPIDA.md` - Métodos de búsqueda
- **Ejemplos**: `EJEMPLOS_PRACTICOS.md` - Casos de uso detallados

---

## 🚀 ¿Necesitas Ayuda?

1. **Busca por categoría** en `ICON_LIST.md`
2. **Usa aliases** para iconos comunes
3. **Consulta ejemplos** en `EJEMPLOS_PRACTICOS.md`
4. **Revisa la documentación completa** en `DOCUMENTACION_COMPLETA.md`
