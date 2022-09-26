import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import WorkSapce, { getDefaultWorkSpaceData } from './data/WorkSpace';

function App() {
  const workspace = React.useRef(new WorkSapce());

  const [workspaceData, setworspaceData] = React.useState(
    workspace.current.updateWorkSapce()
  );

  React.useEffect(() => {}, []);

  return <div className='app'></div>;
}

export default App;
