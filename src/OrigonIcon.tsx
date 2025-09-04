import React from 'react';
import { IconBase, CDNIconProps } from './IconBase';

export interface OrigonIconProps extends CDNIconProps {
  name: string;
}

/**
 * Componente principal para usar iconos Origon desde el CDN
 * 
 * @example
 * ```tsx
 * <OrigonIcon name="Zoom In" size={24} style="filled" />
 * <OrigonIcon name="Accessibility" size={32} style="regular" />
 * ```
 */
export const OrigonIcon: React.FC<OrigonIconProps> = ({ name, ...props }) => {
  return <IconBase name={name} {...props} />;
};

export default OrigonIcon;
