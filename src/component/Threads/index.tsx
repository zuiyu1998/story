import { useWorkSpaceData } from '../../data/contenx';
import { Thread, Node, getDefaultNode, getNodekey } from '../../data/WorkSpace';

import styles from './index.module.less';

const EditNode = ({ node }: { node: Node }) => {
  return (
    <div
      className={styles.node}
      style={{
        width: node.width,
        height: node.height,
      }}
    >
      <div className={styles.inner}>{node.text}</div>
    </div>
  );
};

const NodeAdd = ({ thread }: { thread: Thread }) => {
  const workspace = useWorkSpaceData();

  const _add = () => {
    let d_node = getDefaultNode();
    d_node.key = getNodekey(thread, thread.nodes.length);
    d_node.distance =
      thread.nodes[thread.nodes.length - 1].distance + d_node.width;

    workspace.insertNodeByThread &&
      workspace.insertNodeByThread(thread.key, d_node, true);
  };

  return (
    <div
      className={styles.add}
      onClick={() => {
        _add();
      }}
    >
      添加
    </div>
  );
};

const EditThread = ({ thread }: { thread: Thread }) => {
  return (
    <div className={styles.thread}>
      <div className={styles.name}>{thread.name}</div>
      <div className={styles.nodes}>
        {thread.nodes.map((node) => {
          return <EditNode node={node} key={node.key} />;
        })}
      </div>

      <NodeAdd thread={thread} />
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
