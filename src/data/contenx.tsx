import React from 'react';
import { getDefaultWorkSpaceData, WorkSpaceData } from './WorkSpace';

export const WorkSapceContenx = React.createContext<WorkSpaceData>(
  getDefaultWorkSpaceData()
);
