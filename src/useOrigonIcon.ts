import { useMemo } from 'react';

const CDN_BASE_URL = 'https://cdn.origonlabs.opendex.dev';

export interface UseOrigonIconOptions {
  name: string;
  size?: number;
  style?: 'regular' | 'filled' | 'light' | 'color' | 'regular_ltr' | 'regular_rtl' | 'filled_ltr' | 'filled_rtl';
}

/**
 * Hook para generar URLs de iconos Origon desde el CDN
 * 
 * @example
 * ```tsx
 * const iconUrl = useOrigonIcon({ name: 'Zoom In', size: 24, style: 'filled' });
 * return <img src={iconUrl} alt="Zoom In" />;
 * ```
 */
export function useOrigonIcon({ name, size = 24, style = 'regular' }: UseOrigonIconOptions): string {
  return useMemo(() => {
    const encodedName = encodeURIComponent(name);
    const fileName = `ic_origon_${name.toLowerCase().replace(/\s+/g, '_')}_${size}_${style}.svg`;
    return `${CDN_BASE_URL}/icons/${encodedName}/SVG/${fileName}`;
  }, [name, size, style]);
}

export default useOrigonIcon;
