import React from 'react';
import { getDefaultWorkSpaceData, WorkSpaceData } from './WorkSpace';

export const WorkSpaceContenx = React.createContext<WorkSpaceData>(
  getDefaultWorkSpaceData()
);

export function useWorkSpaceData() {
  return React.useContext(WorkSpaceContenx);
}
