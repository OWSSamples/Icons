# 🎯 Ejemplos Prácticos - @opendex-origon/icons

<div align="center">

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

**Ejemplos prácticos y casos de uso reales de la biblioteca de iconos**

</div>

---

## 📋 Tabla de Contenidos

1. [🚀 Ejemplos Básicos](#-ejemplos-básicos)
2. [🎨 Componentes de UI](#-componentes-de-ui)
3. [📱 Interfaces Responsivas](#-interfaces-responsivas)
4. [🎭 Temas y Estilos](#-temas-y-estilos)
5. [⚡ Optimización](#-optimización)
6. [🔧 Casos de Uso Avanzados](#-casos-de-uso-avanzados)
7. [🎯 Patrones de Diseño](#-patrones-de-diseño)

---

## 🚀 Ejemplos Básicos

### 📦 Instalación y Configuración

```bash
# Instalar la biblioteca
npm install @opendex-origon/icons

# O con yarn
yarn add @opendex-origon/icons

# O con pnpm
pnpm add @opendex-origon/icons
```

### 🎯 Uso Básico

```tsx
import React from 'react';
import { User, Check, Settings, Star } from '@opendex-origon/icons';

function BasicExample() {
  return (
    <div className="icon-examples">
      {/* Tamaño con número (píxeles) */}
      <User size={24} />
      
      {/* Tamaño con string (unidades CSS) */}
      <Check size="1.5rem" color="green" />
      
      {/* Color personalizado */}
      <Settings size={32} color="blue" />
      
      {/* Con className para estilos */}
      <Star size={20} className="icon-glow" />
    </div>
  );
}
```

### 🎨 Diferentes Estilos

```tsx
import React from 'react';
import { 
  ArrowUpRegular, 
  ArrowUpLight, 
  ArrowUpFilled, 
  ArrowUpDuotone, 
  ArrowUpDuotoneLine 
} from '@opendex-origon/icons/Arrows';

function StyleExamples() {
  return (
    <div className="style-examples">
      <h3>Diferentes Estilos del Mismo Icono</h3>
      
      <div className="icon-grid">
        <div className="icon-item">
          <ArrowUpRegular size={32} />
          <span>Regular</span>
        </div>
        
        <div className="icon-item">
          <ArrowUpLight size={32} />
          <span>Light</span>
        </div>
        
        <div className="icon-item">
          <ArrowUpFilled size={32} />
          <span>Filled</span>
        </div>
        
        <div className="icon-item">
          <ArrowUpDuotone size={32} />
          <span>Duotone</span>
        </div>
        
        <div className="icon-item">
          <ArrowUpDuotoneLine size={32} />
          <span>Duotone Line</span>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎨 Componentes de UI

### 🔘 Botones con Iconos

```tsx
import React from 'react';
import { 
  Download, 
  Upload, 
  Trash, 
  Edit, 
  Share, 
  Heart 
} from '@opendex-origon/icons';

function IconButtons() {
  return (
    <div className="icon-buttons">
      {/* Botón primario con icono */}
      <button className="btn btn-primary">
        <Download size={16} />
        <span>Descargar</span>
      </button>
      
      {/* Botón secundario con icono */}
      <button className="btn btn-secondary">
        <Upload size={16} />
        <span>Subir</span>
      </button>
      
      {/* Botón de peligro */}
      <button className="btn btn-danger">
        <Trash size={16} />
        <span>Eliminar</span>
      </button>
      
      {/* Botón de edición */}
      <button className="btn btn-edit">
        <Edit size={16} />
        <span>Editar</span>
      </button>
      
      {/* Botón de compartir */}
      <button className="btn btn-share">
        <Share size={16} />
        <span>Compartir</span>
      </button>
      
      {/* Botón de like */}
      <button className="btn btn-like">
        <Heart size={16} />
        <span>Me gusta</span>
      </button>
    </div>
  );
}
```

### 📋 Lista de Navegación

```tsx
import React from 'react';
import { 
  Home, 
  User, 
  Settings, 
  Bell, 
  Search, 
  Menu 
} from '@opendex-origon/icons';

function NavigationMenu() {
  const menuItems = [
    { icon: Home, label: 'Inicio', active: true },
    { icon: User, label: 'Perfil', active: false },
    { icon: Settings, label: 'Configuración', active: false },
    { icon: Bell, label: 'Notificaciones', active: false },
    { icon: Search, label: 'Buscar', active: false },
  ];

  return (
    <nav className="navigation-menu">
      <div className="menu-header">
        <Menu size={24} />
        <h2>Menú Principal</h2>
      </div>
      
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className={`menu-item ${item.active ? 'active' : ''}`}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### 📊 Dashboard con Iconos

```tsx
import React from 'react';
import { 
  Dollar, 
  Users, 
  Chart, 
  TrendingUp, 
  ShoppingCart, 
  Eye 
} from '@opendex-origon/icons';

function Dashboard() {
  const stats = [
    { 
      icon: Dollar, 
      label: 'Ingresos', 
      value: '$12,345', 
      change: '+12%',
      color: 'green' 
    },
    { 
      icon: Users, 
      label: 'Usuarios', 
      value: '1,234', 
      change: '+8%',
      color: 'blue' 
    },
    { 
      icon: ShoppingCart, 
      label: 'Ventas', 
      value: '567', 
      change: '+15%',
      color: 'purple' 
    },
    { 
      icon: Eye, 
      label: 'Vistas', 
      value: '89,012', 
      change: '+5%',
      color: 'orange' 
    },
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">
              <stat.icon size={32} color={stat.color} />
            </div>
            <div className="stat-content">
              <h3>{stat.label}</h3>
              <p className="stat-value">{stat.value}</p>
              <span className={`stat-change ${stat.color}`}>
                <TrendingUp size={12} />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📱 Interfaces Responsivas

### 📱 Menú Móvil

```tsx
import React, { useState } from 'react';
import { Menu, Close, Home, User, Settings, Search } from '@opendex-origon/icons';

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Inicio', href: '/' },
    { icon: User, label: 'Perfil', href: '/profile' },
    { icon: Settings, label: 'Configuración', href: '/settings' },
    { icon: Search, label: 'Buscar', href: '/search' },
  ];

  return (
    <div className="mobile-menu">
      {/* Botón de menú */}
      <button 
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isOpen ? <Close size={24} /> : <Menu size={24} />}
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="menu-overlay">
          <nav className="mobile-nav">
            {menuItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href}
                className="mobile-nav-item"
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
```

### 🎨 Iconos Responsivos

```tsx
import React from 'react';
import { 
  Phone, 
  Tablet, 
  Laptop, 
  Desktop, 
  Monitor 
} from '@opendex-origon/icons';

function ResponsiveIcons() {
  return (
    <div className="responsive-icons">
      <h3>Iconos que se Adaptan al Tamaño</h3>
      
      <div className="device-icons">
        {/* Iconos que cambian según el breakpoint */}
        <div className="device-icon mobile">
          <Phone size="clamp(16px, 4vw, 32px)" />
          <span>Móvil</span>
        </div>
        
        <div className="device-icon tablet">
          <Tablet size="clamp(20px, 5vw, 40px)" />
          <span>Tablet</span>
        </div>
        
        <div className="device-icon laptop">
          <Laptop size="clamp(24px, 6vw, 48px)" />
          <span>Laptop</span>
        </div>
        
        <div className="device-icon desktop">
          <Desktop size="clamp(28px, 7vw, 56px)" />
          <span>Desktop</span>
        </div>
        
        <div className="device-icon monitor">
          <Monitor size="clamp(32px, 8vw, 64px)" />
          <span>Monitor</span>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎭 Temas y Estilos

### 🌙 Toggle de Tema

```tsx
import React, { useState } from 'react';
import { Sun, Moon } from '@opendex-origon/icons';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      {isDark ? (
        <Sun size={24} color="yellow" />
      ) : (
        <Moon size={24} color="blue" />
      )}
    </button>
  );
}
```

### 🎨 Iconos con CSS Variables

```tsx
import React from 'react';
import { 
  Heart, 
  Star, 
  ThumbsUp, 
  Award, 
  Crown 
} from '@opendex-origon/icons';

function CSSVariableIcons() {
  return (
    <div className="css-variable-icons">
      <h3>Iconos con Variables CSS</h3>
      
      <div className="icon-grid">
        <div className="icon-item primary">
          <Heart size={32} />
          <span>Primario</span>
        </div>
        
        <div className="icon-item secondary">
          <Star size={32} />
          <span>Secundario</span>
        </div>
        
        <div className="icon-item success">
          <ThumbsUp size={32} />
          <span>Éxito</span>
        </div>
        
        <div className="icon-item warning">
          <Award size={32} />
          <span>Advertencia</span>
        </div>
        
        <div className="icon-item danger">
          <Crown size={32} />
          <span>Peligro</span>
        </div>
      </div>
    </div>
  );
}
```

### 🎯 Iconos con Gradientes

```tsx
import React from 'react';
import { 
  Fire, 
  Lightning, 
  Sparkles, 
  Rainbow, 
  Crystal 
} from '@opendex-origon/icons';

function GradientIcons() {
  return (
    <div className="gradient-icons">
      <h3>Iconos con Gradientes</h3>
      
      <div className="gradient-grid">
        <div className="gradient-icon fire">
          <Fire size={40} />
        </div>
        
        <div className="gradient-icon lightning">
          <Lightning size={40} />
        </div>
        
        <div className="gradient-icon sparkles">
          <Sparkles size={40} />
        </div>
        
        <div className="gradient-icon rainbow">
          <Rainbow size={40} />
        </div>
        
        <div className="gradient-icon crystal">
          <Crystal size={40} />
        </div>
      </div>
    </div>
  );
}
```

---

## ⚡ Optimización

### 🚀 Lazy Loading de Iconos

```tsx
import React, { lazy, Suspense } from 'react';

// Lazy loading de iconos
const UserIcon = lazy(() => 
  import('@opendex-origon/icons').then(module => ({ 
    default: module.User 
  }))
);

const SettingsIcon = lazy(() => 
  import('@opendex-origon/icons').then(module => ({ 
    default: module.Settings 
  }))
);

function LazyLoadedIcons() {
  return (
    <div className="lazy-icons">
      <Suspense fallback={<div className="icon-skeleton" />}>
        <UserIcon size={24} />
      </Suspense>
      
      <Suspense fallback={<div className="icon-skeleton" />}>
        <SettingsIcon size={24} />
      </Suspense>
    </div>
  );
}
```

### 📦 Memoización de Iconos

```tsx
import React, { memo } from 'react';
import { User, Settings, Bell } from '@opendex-origon/icons';

// Icono memoizado para evitar re-renders innecesarios
const MemoizedUserIcon = memo(({ size, color }: { size: number; color: string }) => (
  <User size={size} color={color} />
));

const MemoizedSettingsIcon = memo(({ size, color }: { size: number; color: string }) => (
  <Settings size={size} color={color} />
));

const MemoizedBellIcon = memo(({ size, color }: { size: number; color: string }) => (
  <Bell size={size} color={color} />
));

function OptimizedIcons() {
  return (
    <div className="optimized-icons">
      <MemoizedUserIcon size={24} color="blue" />
      <MemoizedSettingsIcon size={24} color="gray" />
      <MemoizedBellIcon size={24} color="red" />
    </div>
  );
}
```

### 🎯 Importación Selectiva

```tsx
// ✅ Optimizado - Solo importa lo que necesita
import { User, Settings, Bell } from '@opendex-origon/icons';

// ❌ No optimizado - Importa todo
// import * as Icons from '@opendex-origon/icons';

function SelectiveImports() {
  return (
    <div className="selective-imports">
      <User size={24} />
      <Settings size={24} />
      <Bell size={24} />
    </div>
  );
}
```

---

## 🔧 Casos de Uso Avanzados

### 📊 Gráfico de Estado

```tsx
import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Info 
} from '@opendex-origon/icons';

type Status = 'success' | 'error' | 'pending' | 'warning' | 'info';

interface StatusIconProps {
  status: Status;
  size?: number;
}

function StatusIcon({ status, size = 20 }: StatusIconProps) {
  const statusConfig = {
    success: { icon: CheckCircle, color: 'green' },
    error: { icon: XCircle, color: 'red' },
    pending: { icon: Clock, color: 'orange' },
    warning: { icon: AlertTriangle, color: 'yellow' },
    info: { icon: Info, color: 'blue' },
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return <IconComponent size={size} color={config.color} />;
}

function StatusExample() {
  const statuses: Status[] = ['success', 'error', 'pending', 'warning', 'info'];

  return (
    <div className="status-example">
      <h3>Estados del Sistema</h3>
      
      <div className="status-grid">
        {statuses.map((status) => (
          <div key={status} className="status-item">
            <StatusIcon status={status} />
            <span className="status-label">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 🎮 Controles de Juego

```tsx
import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Stop, 
  SkipBack, 
  SkipForward, 
  Volume, 
  VolumeMute 
} from '@opendex-origon/icons';

function GameControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="game-controls">
      <h3>Controles de Juego</h3>
      
      <div className="controls-row">
        <button className="control-btn">
          <SkipBack size={20} />
        </button>
        
        <button 
          className="control-btn primary"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <button className="control-btn">
          <Stop size={20} />
        </button>
        
        <button className="control-btn">
          <SkipForward size={20} />
        </button>
      </div>
      
      <div className="controls-row">
        <button 
          className="control-btn"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeMute size={20} /> : <Volume size={20} />}
        </button>
      </div>
    </div>
  );
}
```

### 📱 Notificaciones

```tsx
import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  X, 
  Info, 
  AlertTriangle 
} from '@opendex-origon/icons';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  icon: React.ComponentType<any>;
}

function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      message: 'Operación completada exitosamente',
      icon: Check
    },
    {
      id: '2',
      type: 'error',
      message: 'Error al procesar la solicitud',
      icon: X
    },
    {
      id: '3',
      type: 'info',
      message: 'Nueva actualización disponible',
      icon: Info
    },
    {
      id: '4',
      type: 'warning',
      message: 'Espacio en disco bajo',
      icon: AlertTriangle
    },
  ]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="notification-system">
      <div className="notification-header">
        <Bell size={20} />
        <span>Notificaciones ({notifications.length})</span>
      </div>
      
      <div className="notification-list">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`notification-item ${notification.type}`}
          >
            <notification.icon size={16} />
            <span className="notification-message">
              {notification.message}
            </span>
            <button 
              className="notification-close"
              onClick={() => removeNotification(notification.id)}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🎯 Patrones de Diseño

### 🎨 Icono con Badge

```tsx
import React from 'react';
import { Bell, Mail, Heart, ShoppingCart } from '@opendex-origon/icons';

interface IconWithBadgeProps {
  icon: React.ComponentType<any>;
  count: number;
  size?: number;
  color?: string;
}

function IconWithBadge({ icon: Icon, count, size = 24, color = 'currentColor' }: IconWithBadgeProps) {
  return (
    <div className="icon-with-badge">
      <Icon size={size} color={color} />
      {count > 0 && (
        <span className="badge">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
}

function BadgeExample() {
  return (
    <div className="badge-example">
      <h3>Iconos con Badges</h3>
      
      <div className="badge-grid">
        <IconWithBadge icon={Bell} count={5} />
        <IconWithBadge icon={Mail} count={12} />
        <IconWithBadge icon={Heart} count={0} />
        <IconWithBadge icon={ShoppingCart} count={3} />
      </div>
    </div>
  );
}
```

### 🎭 Icono con Tooltip

```tsx
import React, { useState } from 'react';
import { 
  Info, 
  Help, 
  Settings, 
  User 
} from '@opendex-origon/icons';

interface IconWithTooltipProps {
  icon: React.ComponentType<any>;
  tooltip: string;
  size?: number;
  color?: string;
}

function IconWithTooltip({ 
  icon: Icon, 
  tooltip, 
  size = 20, 
  color = 'currentColor' 
}: IconWithTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="icon-with-tooltip"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Icon size={size} color={color} />
      {showTooltip && (
        <div className="tooltip">
          {tooltip}
        </div>
      )}
    </div>
  );
}

function TooltipExample() {
  return (
    <div className="tooltip-example">
      <h3>Iconos con Tooltips</h3>
      
      <div className="tooltip-grid">
        <IconWithTooltip 
          icon={Info} 
          tooltip="Información adicional" 
        />
        <IconWithTooltip 
          icon={Help} 
          tooltip="Ayuda y soporte" 
        />
        <IconWithTooltip 
          icon={Settings} 
          tooltip="Configuración del sistema" 
        />
        <IconWithTooltip 
          icon={User} 
          tooltip="Perfil de usuario" 
        />
      </div>
    </div>
  );
}
```

### 🎨 Icono con Animación

```tsx
import React, { useState } from 'react';
import { Heart, Star, ThumbsUp, Share } from '@opendex-origon/icons';

interface AnimatedIconProps {
  icon: React.ComponentType<any>;
  size?: number;
  color?: string;
  animation?: 'pulse' | 'bounce' | 'shake' | 'rotate';
}

function AnimatedIcon({ 
  icon: Icon, 
  size = 24, 
  color = 'currentColor',
  animation = 'pulse'
}: AnimatedIconProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div 
      className={`animated-icon ${animation} ${isAnimating ? 'animate' : ''}`}
      onClick={handleClick}
    >
      <Icon size={size} color={color} />
    </div>
  );
}

function AnimationExample() {
  return (
    <div className="animation-example">
      <h3>Iconos Animados</h3>
      
      <div className="animation-grid">
        <AnimatedIcon icon={Heart} animation="pulse" />
        <AnimatedIcon icon={Star} animation="bounce" />
        <AnimatedIcon icon={ThumbsUp} animation="shake" />
        <AnimatedIcon icon={Share} animation="rotate" />
      </div>
    </div>
  );
}
```

---

## 🎨 CSS para los Ejemplos

```css
/* Estilos base para los ejemplos */

.icon-examples {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
}

.style-examples .icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
}

/* Botones con iconos */
.icon-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.btn-primary { background: #007bff; color: white; }
.btn-secondary { background: #6c757d; color: white; }
.btn-danger { background: #dc3545; color: white; }
.btn-edit { background: #28a745; color: white; }
.btn-share { background: #17a2b8; color: white; }
.btn-like { background: #e83e8c; color: white; }

/* Navegación */
.navigation-menu {
  width: 250px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.menu-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.menu-item:hover {
  background: #e9ecef;
}

.menu-item.active {
  background: #007bff;
  color: white;
}

/* Dashboard */
.dashboard {
  padding: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-content h3 {
  margin: 0;
  font-size: 14px;
  color: #6c757d;
}

.stat-value {
  margin: 0.25rem 0;
  font-size: 24px;
  font-weight: bold;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 12px;
}

/* Menú móvil */
.mobile-menu {
  position: relative;
}

.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
}

.mobile-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: white;
  padding: 1rem;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #e0e0e0;
}

/* Iconos responsivos */
.responsive-icons {
  padding: 1rem;
}

.device-icons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
}

.device-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* Tema oscuro */
.dark-theme {
  background: #1a1a1a;
  color: white;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s ease;
}

.theme-toggle:hover {
  background: rgba(0,0,0,0.1);
}

/* Variables CSS */
.css-variable-icons .icon-item {
  --icon-color: var(--primary-color);
}

.css-variable-icons .icon-item.primary { --primary-color: #007bff; }
.css-variable-icons .icon-item.secondary { --primary-color: #6c757d; }
.css-variable-icons .icon-item.success { --primary-color: #28a745; }
.css-variable-icons .icon-item.warning { --primary-color: #ffc107; }
.css-variable-icons .icon-item.danger { --primary-color: #dc3545; }

/* Gradientes */
.gradient-icons {
  padding: 1rem;
}

.gradient-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.gradient-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
}

.gradient-icon.fire {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
}

.gradient-icon.lightning {
  background: linear-gradient(45deg, #feca57, #ff9ff3);
}

.gradient-icon.sparkles {
  background: linear-gradient(45deg, #48dbfb, #0abde3);
}

.gradient-icon.rainbow {
  background: linear-gradient(45deg, #ff9ff3, #feca57, #ff6b6b, #48dbfb);
}

.gradient-icon.crystal {
  background: linear-gradient(45deg, #a8e6cf, #dcedc1);
}

/* Badges */
.icon-with-badge {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
}

/* Tooltips */
.icon-with-tooltip {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #333;
}

/* Animaciones */
.animated-icon {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.animated-icon:hover {
  transform: scale(1.1);
}

.animated-icon.pulse.animate {
  animation: pulse 1s ease-in-out;
}

.animated-icon.bounce.animate {
  animation: bounce 1s ease-in-out;
}

.animated-icon.shake.animate {
  animation: shake 1s ease-in-out;
}

.animated-icon.rotate.animate {
  animation: rotate 1s ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .icon-examples {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .icon-buttons {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .device-icons {
    flex-direction: column;
    gap: 1rem;
  }
}
```

---

<div align="center">

**¡Esperamos que estos ejemplos te ayuden a aprovechar al máximo @opendex-origon/icons! 🎉**

[![Opendex](https://img.shields.io/badge/Opendex-Corporation-blue?logo=opendex)](https://opendex.com)

</div>
