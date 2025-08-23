// ÍNDICES TEMÁTICOS - Agrupación por uso común
// Permite encontrar iconos rápidamente por categoría de uso
// SOLO ICONOS QUE REALMENTE EXISTEN

// 🧭 NAVEGACIÓN
export const NavigationIcons = {
  // Flechas básicas
  ArrowUp: () => import('./Arrows/Regular/ArrowUpRegular'),
  ArrowDown: () => import('./Arrows/Regular/ArrowDownRegular'),
  ArrowLeft: () => import('./Arrows/Regular/ArrowLeftRegular'),
  ArrowRight: () => import('./Arrows/Regular/ArrowRightRegular'),
  
  // Flechas pequeñas
  ArrowUpSmall: () => import('./Arrows/Regular/ArrowUpSmallRegular'),
  ArrowDownSmall: () => import('./Arrows/Regular/ArrowDownSmallRegular'),
  ArrowLeftSmall: () => import('./Arrows/Regular/ArrowLeftSmallRegular'),
  ArrowRightSmall: () => import('./Arrows/Regular/ArrowRightSmallRegular'),
  
  // Flechas en círculo
  ArrowUpCircle: () => import('./Arrows/Regular/ArrowUpCircleRegular'),
  ArrowDownCircle: () => import('./Arrows/Regular/ArrowDownCircleRegular'),
  ArrowLeftCircle: () => import('./Arrows/Regular/ArrowLeftCircleRegular'),
  ArrowRightCircle: () => import('./Arrows/Regular/ArrowRightCircleRegular'),
  
  // Flechas en cuadrado
  ArrowUpSquare: () => import('./Arrows/Regular/ArrowUpSquareRegular'),
  ArrowDownSquare: () => import('./Arrows/Regular/ArrowDownSquareRegular'),
  ArrowLeftSquare: () => import('./Arrows/Regular/ArrowLeftSquareRegular'),
  ArrowRightSquare: () => import('./Arrows/Regular/ArrowRightSquareRegular'),
  
  // Flechas diagonales
  ArrowUpLeft: () => import('./Arrows/Regular/ArrowUpLeftRegular'),
  ArrowUpRight: () => import('./Arrows/Regular/ArrowUpRightRegular'),
  ArrowDownLeft: () => import('./Arrows/Regular/ArrowDownLeftRegular'),
  ArrowDownRight: () => import('./Arrows/Regular/ArrowDownRightRegular'),
  
  // Flechas diagonales en círculo
  ArrowUpLeftCircle: () => import('./Arrows/Regular/ArrowUpLeftCircleRegular'),
  ArrowUpRightCircle: () => import('./Arrows/Regular/ArrowUpRightCircleRegular'),
  ArrowDownLeftCircle: () => import('./Arrows/Regular/ArrowDownLeftCircleRegular'),
  ArrowDownRightCircle: () => import('./Arrows/Regular/ArrowDownRightCircleRegular'),
  
  // Flechas diagonales en cuadrado
  ArrowUpLeftSquare: () => import('./Arrows/Regular/ArrowUpLeftSquareRegular'),
  ArrowUpRightSquare: () => import('./Arrows/Regular/ArrowUpRightSquareRegular'),
  ArrowDownLeftSquare: () => import('./Arrows/Regular/ArrowDownLeftSquareRegular'),
  ArrowDownRightSquare: () => import('./Arrows/Regular/ArrowDownRightSquareRegular'),
  
  // Flechas diagonales pequeñas
  ArrowUpLeftSmall: () => import('./Arrows/Regular/ArrowUpLeftSmallRegular'),
  ArrowUpRightSmall: () => import('./Arrows/Regular/ArrowUpRightSmallRegular'),
  ArrowDownLeftSmall: () => import('./Arrows/Regular/ArrowDownLeftSmallRegular'),
  ArrowDownRightSmall: () => import('./Arrows/Regular/ArrowDownRightSmallRegular'),
  
  // Flechas de línea
  ArrowUpLine: () => import('./Arrows/Regular/ArrowUpLineRegular'),
  ArrowDownLine: () => import('./Arrows/Regular/ArrowDownLineRegular'),
  ArrowLeftLine: () => import('./Arrows/Regular/ArrowLeftLineRegular'),
  ArrowRightLine: () => import('./Arrows/Regular/ArrowRightLineRegular'),
  
  // Flechas de línea en círculo
  ArrowUpLineCircle: () => import('./Arrows/Regular/ArrowUpLineCircleRegular'),
  ArrowDownLineCircle: () => import('./Arrows/Regular/ArrowDownLineCircleRegular'),
  ArrowLeftLineCircle: () => import('./Arrows/Regular/ArrowLeftLineCircleRegular'),
  ArrowRightLineCircle: () => import('./Arrows/Regular/ArrowRightLineCircleRegular'),
  
  // Flechas de línea en cuadrado
  ArrowUpLineSquare: () => import('./Arrows/Regular/ArrowUpLineSquareRegular'),
  ArrowDownLineSquare: () => import('./Arrows/Regular/ArrowDownLineSquareRegular'),
  ArrowLeftLineSquare: () => import('./Arrows/Regular/ArrowLeftLineSquareRegular'),
  ArrowRightLineSquare: () => import('./Arrows/Regular/ArrowRightLineSquareRegular'),
  
  // Flechas desde línea
  ArrowUpFromLine: () => import('./Arrows/Regular/ArrowUpFromLineRegular'),
  ArrowDownFromLine: () => import('./Arrows/Regular/ArrowDownFromLineRegular'),
  ArrowLeftFromLine: () => import('./Arrows/Regular/ArrowLeftFromLineRegular'),
  ArrowRightFromLine: () => import('./Arrows/Regular/ArrowRightFromLineRegular'),
  
  // Flechas desde línea en círculo
  ArrowUpFromLineCircle: () => import('./Arrows/Regular/ArrowUpFromLineCircleRegular'),
  ArrowDownFromLineCircle: () => import('./Arrows/Regular/ArrowDownFromLineCircleRegular'),
  ArrowLeftFromLineCircle: () => import('./Arrows/Regular/ArrowLeftFromLineCircleRegular'),
  ArrowRightFromLineCircle: () => import('./Arrows/Regular/ArrowRightFromLineCircleRegular'),
  
  // Flechas desde línea en cuadrado
  ArrowUpFromLineSquare: () => import('./Arrows/Regular/ArrowUpFromLineSquareRegular'),
  ArrowDownFromLineSquare: () => import('./Arrows/Regular/ArrowDownFromLineSquareRegular'),
  ArrowLeftFromLineSquare: () => import('./Arrows/Regular/ArrowLeftFromLineSquareRegular'),
  ArrowRightFromLineSquare: () => import('./Arrows/Regular/ArrowRightFromLineSquareRegular'),
  
  // Flechas especiales
  ArrowUpDown: () => import('./Arrows/Regular/ArrowUpDownRegular'),
  ArrowUpDownSimple: () => import('./Arrows/Regular/ArrowUpDownSimpleRegular'),
  ArrowRightLeft: () => import('./Arrows/Regular/ArrowRightLeftRegular'),
  ArrowRightLeftSimple: () => import('./Arrows/Regular/ArrowRightLeftSimpleRegular'),
  
  // Flechas de rotación
  ArrowRotateLeft: () => import('./Arrows/Regular/ArrowRotateLeftRegular'),
  ArrowRotateRight: () => import('./Arrows/Regular/ArrowRotateRightRegular'),
  
  // Flechas de rehacer/deshacer
  ArrowUndo: () => import('./Arrows/Regular/ArrowUndoRegular'),
  ArrowRedo: () => import('./Arrows/Regular/ArrowRedoRegular'),
  
  // Flechas de giro
  ArrowTurnUp: () => import('./Arrows/Regular/ArrowTurnUpRegular'),
  ArrowTurnDown: () => import('./Arrows/Regular/ArrowTurnDownRegular'),
  ArrowTurnLeft: () => import('./Arrows/Regular/ArrowTurnLeftRegular'),
  ArrowTurnRight: () => import('./Arrows/Regular/ArrowTurnRightRegular'),
  ArrowTurnLeftUp: () => import('./Arrows/Regular/ArrowTurnLeftUpRegular'),
  ArrowTurnLeftDown: () => import('./Arrows/Regular/ArrowTurnLeftDownRegular'),
  ArrowTurnDownLeft: () => import('./Arrows/Regular/ArrowTurnDownLeftRegular'),
  ArrowTurnDownRight: () => import('./Arrows/Regular/ArrowTurnDownRightRegular'),
  
  // Flechas especiales
  ArrowUpRightFromSquare: () => import('./Arrows/Regular/ArrowUpRightFromSquareRegular'),
  ArrowDownLeftFromSquare: () => import('./Arrows/Regular/ArrowDownLeftFromSquareRegular'),
  
  // Ángulos (chevrons)
  AngleUp: () => import('./Arrows/Regular/AngleUpRegular'),
  AngleDown: () => import('./Arrows/Regular/AngleDownRegular'),
  AngleLeft: () => import('./Arrows/Regular/AngleLeftRegular'),
  AngleRight: () => import('./Arrows/Regular/AngleRightRegular'),
  
  // Ángulos pequeños
  AngleUpSmall: () => import('./Arrows/Regular/AngleUpSmallRegular'),
  AngleDownSmall: () => import('./Arrows/Regular/AngleDownSmallRegular'),
  AngleLeftSmall: () => import('./Arrows/Regular/AngleLeftSmallRegular'),
  AngleRightSmall: () => import('./Arrows/Regular/AngleRightSmallRegular'),
  
  // Ángulos en círculo
  AngleUpCircle: () => import('./Arrows/Regular/AngleUpCircleRegular'),
  AngleDownCircle: () => import('./Arrows/Regular/AngleDownCircleRegular'),
  AngleLeftCircle: () => import('./Arrows/Regular/AngleLeftCircleRegular'),
  AngleRightCircle: () => import('./Arrows/Regular/AngleRightCircleRegular'),
  
  // Ángulos en cuadrado
  AngleUpSquare: () => import('./Arrows/Regular/AngleUpSquareRegular'),
  AngleDownSquare: () => import('./Arrows/Regular/AngleDownSquareRegular'),
  AngleLeftSquare: () => import('./Arrows/Regular/AngleLeftSquareRegular'),
  AngleRightSquare: () => import('./Arrows/Regular/AngleRightSquareRegular'),
  
  // Múltiples ángulos
  AnglesUp: () => import('./Arrows/Regular/AnglesUpRegular'),
  AnglesDown: () => import('./Arrows/Regular/AnglesDownRegular'),
  AnglesLeft: () => import('./Arrows/Regular/AnglesLeftRegular'),
  AnglesRight: () => import('./Arrows/Regular/AnglesRightRegular'),
  
  // Múltiples ángulos pequeños
  AnglesUpSmall: () => import('./Arrows/Regular/AnglesUpSmallRegular'),
  AnglesDownSmall: () => import('./Arrows/Regular/AnglesDownSmallRegular'),
  AnglesLeftSmall: () => import('./Arrows/Regular/AnglesLeftSmallRegular'),
  AnglesRightSmall: () => import('./Arrows/Regular/AnglesRightSmallRegular'),
  
  // Múltiples ángulos especiales
  AnglesUpDown: () => import('./Arrows/Regular/AnglesUpDownRegular'),
  AnglesDownUp: () => import('./Arrows/Regular/AnglesDownUpRegular'),
  
  // Carets
  CaretUp: () => import('./Arrows/Regular/CaretUpRegular'),
  CaretDown: () => import('./Arrows/Regular/CaretDownRegular'),
  CaretLeft: () => import('./Arrows/Regular/CaretLeftRegular'),
  CaretRight: () => import('./Arrows/Regular/CaretRightRegular'),
  
  // Carets en círculo
  CaretUpCircle: () => import('./Arrows/Regular/CaretUpCircleRegular'),
  CaretDownCircle: () => import('./Arrows/Regular/CaretDownCircleRegular'),
  CaretLeftCircle: () => import('./Arrows/Regular/CaretLeftCircleRegular'),
  CaretRightCircle: () => import('./Arrows/Regular/CaretRightCircleRegular'),
  
  // Carets en cuadrado
  CaretUpSquare: () => import('./Arrows/Regular/CaretUpSquareRegular'),
  CaretDownSquare: () => import('./Arrows/Regular/CaretDownSquareRegular'),
  CaretLeftSquare: () => import('./Arrows/Regular/CaretLeftSquareRegular'),
  CaretRightSquare: () => import('./Arrows/Regular/CaretRightSquareRegular'),
} as const;
