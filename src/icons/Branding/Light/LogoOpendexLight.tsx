import IconBase from '../../../IconBase';
import { IconProps } from '../../../types';

const LogoOpendexLight = (props: IconProps) => (
  <IconBase {...props} viewBox='0 0 375 375'>
    <g clipPath='url(#clip0)'>
      <g mask='url(#mask0)'>
        <g transform='matrix(1.185, 0, 0, 1.185, 39.202117, 39.202116)'>
          <path fill='currentColor' d='M0 0h250v250H0z' opacity='0.6' />
        </g>
      </g>
    </g>
    <defs>
      <clipPath id='clip0'>
        <path d='M39.203125 39.203125L335 39.203125L335 335L39.203125 335Z' />
      </clipPath>
      <mask id='mask0'>
        <g filter='url(#filter0)'>
          <g
            filter='url(#filter1)'
            transform='matrix(1.185, 0, 0, 1.185, 39.202117, 39.202116)'
          >
            <path fill='currentColor' d='M0 0h250v250H0z' opacity='0.5' />
          </g>
        </g>
      </mask>
      <filter id='filter0' x='0%' y='0%' width='100%' height='100%'>
        <feColorMatrix
          values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'
          colorInterpolationFilters='sRGB'
        />
      </filter>
      <filter id='filter1' x='0%' y='0%' width='100%' height='100%'>
        <feColorMatrix
          values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.2126 0.7152 0.0722 0 0'
          colorInterpolationFilters='sRGB'
        />
      </filter>
    </defs>
  </IconBase>
);

export default LogoOpendexLight;
