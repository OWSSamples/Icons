import React from 'react';
import IconBase from '../../../IconBase';
import { IconProps } from '../../../types';

const StopwatchLight = (props: IconProps) => (
  <IconBase {...props} viewBox="0 0 24 24">
    <path fill="currentColor" d="M12.5 9a.5.5 0 0 0-1 0v4.5a.5.5 0 0 0 1 0z"/><path fill="currentColor" fill-rule="evenodd" d="M12.5 2v2.013c2.12.11 4.058.916 5.587 2.193l1.56-1.56a.5.5 0 1 1 .707.708L18.82 6.887A9.47 9.47 0 0 1 21.5 13.5a9.5 9.5 0 1 1-10-9.487V2H9a.5.5 0 0 1 0-1h6a.5.5 0 0 1 0 1zm-9 11.5a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0" clip-rule="evenodd"/>
  </IconBase>
);

export default StopwatchLight;
