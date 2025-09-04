import React from 'react';
import { IconProps } from './types';

const CDN_BASE_URL = 'https://cdn.origonlabs.opendex.dev';

export interface CDNIconProps extends Omit<IconProps, 'style'> {
  name: string;
  style?:
    | 'regular'
    | 'filled'
    | 'light'
    | 'color'
    | 'regular_ltr'
    | 'regular_rtl'
    | 'filled_ltr'
    | 'filled_rtl';
}

export function IconBase({
  name,
  size = 24,
  style = 'regular',
  color,
  ...rest
}: CDNIconProps) {
  const resolvedSize =
    typeof size === 'number' ? size : parseInt(size.toString());
  const encodedName = encodeURIComponent(name);
  const fileName = `ic_origon_${name.toLowerCase().replace(/\s+/g, '_')}_${resolvedSize}_${style}.svg`;
  const iconUrl = `${CDN_BASE_URL}/icons/${encodedName}/SVG/${fileName}`;

  return (
    <img
      src={iconUrl}
      alt={name}
      width={resolvedSize}
      height={resolvedSize}
      style={{ color }}
      {...(rest as any)}
    />
  );
}

// Mantener el componente original para compatibilidad
export function IconBaseSVG({
  size = 24,
  color = 'currentColor',
  children,
  ...rest
}: React.PropsWithChildren<IconProps>) {
  const resolvedSize = typeof size === 'number' ? `${size}` : size;
  return (
    <svg
      width={resolvedSize}
      height={resolvedSize}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      {children}
    </svg>
  );
}

export default IconBase;
