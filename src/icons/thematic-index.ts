// Thematic Index - Exportaciones organizadas por temas
// Este archivo agrupa iconos por categorías temáticas

// 🏠 Navegación y UI Básica
export const Navigation = {
  Home: () => import('./UI-Basics/Regular/HomeRegular'),
  Search: () => import('./UI-Basics/Regular/SearchRegular'),
  Menu: () => import('./UI-Basics/Regular/MenuRegular'),
  Close: () => import('./UI-Basics/Regular/CloseRegular'),
  Back: () => import('./Arrows/Regular/ArrowBackRegular'),
  Forward: () => import('./Arrows/Regular/ArrowForwardRegular'),
};

// ➕ Acciones Básicas
export const Actions = {
  Add: () => import('./Add/Regular/AddRegular'),
  Edit: () => import('./UI-Basics/Regular/EditRegular'),
  Delete: () => import('./UI-Basics/Regular/DeleteRegular'),
  Save: () => import('./UI-Basics/Regular/SaveRegular'),
  Cancel: () => import('./UI-Basics/Regular/CancelRegular'),
  Confirm: () => import('./UI-Basics/Regular/ConfirmRegular'),
};

// ➡️ Flechas y Dirección
export const Arrows = {
  Left: () => import('./Arrows/Regular/ArrowLeftRegular'),
  Right: () => import('./Arrows/Regular/ArrowRightRegular'),
  Up: () => import('./Arrows/Regular/ArrowUpRegular'),
  Down: () => import('./Arrows/Regular/ArrowDownRegular'),
  Redo: () => import('./Arrows/Regular/ArrowRedoRegular'),
  Undo: () => import('./Arrows/Regular/ArrowUndoRegular'),
};

// 👤 Usuario y Perfil
export const User = {
  Profile: () => import('./UI-Basics/Regular/UserRegular'),
  Add: () => import('./UI-Basics/Regular/UserAddRegular'),
  Remove: () => import('./UI-Basics/Regular/UserRemoveRegular'),
  Edit: () => import('./UI-Basics/Regular/UserEditRegular'),
  Group: () => import('./UI-Basics/Regular/UserGroupRegular'),
  Settings: () => import('./UI-Basics/Regular/UserSettingsRegular'),
};

// 📱 Dispositivos y Hardware
export const Devices = {
  Phone: () => import('./Devices-and-Hardware/Regular/PhoneRegular'),
  Tablet: () => import('./Devices-and-Hardware/Regular/TabletRegular'),
  Laptop: () => import('./Devices-and-Hardware/Regular/LaptopRegular'),
  Desktop: () => import('./Devices-and-Hardware/Regular/DesktopRegular'),
  Camera: () => import('./Devices-and-Hardware/Regular/CameraRegular'),
  Printer: () => import('./Devices-and-Hardware/Regular/PrinterRegular'),
};

// 💬 Comunicación
export const Communication = {
  Email: () => import('./Communication/Regular/EmailRegular'),
  Message: () => import('./Communication/Regular/MessageRegular'),
  Chat: () => import('./Communication/Regular/ChatRegular'),
  Call: () => import('./Communication/Regular/CallRegular'),
  Video: () => import('./Communication/Regular/VideoRegular'),
  Share: () => import('./Communication/Regular/ShareRegular'),
};

// 💰 Negocios y Finanzas
export const Business = {
  Money: () => import('./Business-and-Finance/Regular/MoneyRegular'),
  Dollar: () => import('./Business-and-Finance/Regular/DollarRegular'),
  Euro: () => import('./Business-and-Finance/Regular/EuroRegular'),
  Chart: () => import('./Business-and-Finance/Regular/ChartRegular'),
  Calculator: () => import('./Business-and-Finance/Regular/CalculatorRegular'),
  Invoice: () => import('./Business-and-Finance/Regular/InvoiceRegular'),
};

// 🛒 E-commerce
export const Shopping = {
  Cart: () => import('./E-Commerce-Shopping/Regular/CartRegular'),
  Bag: () => import('./E-Commerce-Shopping/Regular/BagRegular'),
  Heart: () => import('./E-Commerce-Shopping/Regular/HeartRegular'),
  Star: () => import('./E-Commerce-Shopping/Regular/StarRegular'),
  Gift: () => import('./E-Commerce-Shopping/Regular/GiftRegular'),
  Discount: () => import('./E-Commerce-Shopping/Regular/DiscountRegular'),
};

// ⚙️ Configuración y Herramientas
export const Settings = {
  Gear: () => import('./UI-Basics/Regular/GearRegular'),
  Config: () => import('./UI-Basics/Regular/ConfigRegular'),
  Tools: () => import('./UI-Basics/Regular/ToolsRegular'),
  Filter: () => import('./UI-Basics/Regular/FilterRegular'),
  Sort: () => import('./UI-Basics/Regular/SortRegular'),
  Refresh: () => import('./UI-Basics/Regular/RefreshRegular'),
};

// 📊 Estados y Feedback
export const Status = {
  Success: () => import('./UI-Basics/Regular/SuccessRegular'),
  Error: () => import('./UI-Basics/Regular/ErrorRegular'),
  Warning: () => import('./UI-Basics/Regular/WarningRegular'),
  Info: () => import('./UI-Basics/Regular/InfoRegular'),
  Loading: () => import('./UI-Basics/Regular/LoadingRegular'),
  Check: () => import('./UI-Basics/Regular/CheckRegular'),
};

// 🏢 Branding y Logos
export const Branding = {
  LogoOpendex: () => import('./Branding/Regular/LogoOpendexRegular'),
  LogoOpendexFilled: () => import('./Branding/Filled/LogoOpendexFilled'),
  LogoOpendexLight: () => import('./Branding/Light/LogoOpendexLight'),
  LogoOpendexDuotone: () => import('./Branding/Duotone/LogoOpendexDuotone'),
};

// Nota: Para una lista completa de categorías, consulta INDICE_BUSQUEDA_RAPIDA.md
