import { useWorkSpaceData } from '../../data/contenx';
import { Thread, Node } from '../../data/WorkSpace';

import styles from './index.module.less';

const EditNode = ({ node }: { node: Node }) => {
  return <div>{node.text}</div>;
};

const EditThread = ({ thread }: { thread: Thread }) => {
  return (
    <div className={styles.thread}>
      <div className={styles.name}>{thread.name}</div>
      {thread.nodes.map((node) => {
        return <EditNode node={node} key={node.stage_index} />;
      })}
    </div>
  );
};

const Threads = () => {
  const workspaceData = useWorkSpaceData();

  return (
    <div className={styles.main}>
      {workspaceData.threads.map((thread) => {
        return <EditThread thread={thread} key={thread.key} />;
      })}
    </div>
  );
};

export default Threads;
