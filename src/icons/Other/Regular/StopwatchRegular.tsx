import React from 'react';
import IconBase from '../../../IconBase';
import { IconProps } from '../../../types';

const StopwatchRegular = (props: IconProps) => (
  <IconBase {...props} viewBox="0 0 24 24">
    <path fill="currentColor" d="M12.75 9a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0z"/><path fill="currentColor" fill-rule="evenodd" d="M12.75 2.25v1.528a9.7 9.7 0 0 1 5.32 2.091l1.4-1.4a.75.75 0 1 1 1.06 1.061l-1.36 1.362a9.72 9.72 0 0 1 2.58 6.608c0 5.385-4.365 9.75-9.75 9.75s-9.75-4.365-9.75-9.75c0-5.132 3.966-9.339 9-9.722V2.25H9a.75.75 0 0 1 0-1.5h6a.75.75 0 0 1 0 1.5zm-9 11.25a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0" clip-rule="evenodd"/>
  </IconBase>
);

export default StopwatchRegular;
