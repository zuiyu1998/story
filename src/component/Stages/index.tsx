import React from 'react';
import { useWorkSpaceData } from '../../data/contenx';
import { StageData } from '../../data/WorkSpace';
import styles from './index.module.less';

const Stage = ({ stage }: { stage: StageData }) => {
  return (
    <div
      className={styles.stage}
      style={{
        position: 'absolute',
        left: stage.left,
        width: stage.width,
      }}
    >
      {stage.characters.map((item) => {
        return <div>{item.id}</div>;
      })}
    </div>
  );
};

const Stages = () => {
  const workspaceData = useWorkSpaceData();

  return (
    <div className={styles.main}>
      {workspaceData.stages.map((stage) => {
        return <Stage key={stage.distance} stage={stage} />;
      })}
    </div>
  );
};

export default Stages;
