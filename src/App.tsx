import React from 'react';
import './App.css';
import { WorkSapceContenx } from './data/contenx';
import WorkSapce from './data/WorkSpace';

function App() {
  const workspace = React.useRef(new WorkSapce());

  const [workspaceData, setworspaceData] = React.useState(
    workspace.current.getWorkSapce()
  );

  React.useEffect(() => {
    workspace.current.addListener((data) => {
      setworspaceData(data);
    });
  }, []);

  return (
    <div className='app'>
      <WorkSapceContenx.Provider
        value={workspaceData}
      ></WorkSapceContenx.Provider>
    </div>
  );
}

export default App;
