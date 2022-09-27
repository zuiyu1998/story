import { getOnlyKey } from '../utils/getOnlyKey';

export type WorkSpaceData = {
  threads: Thread[];
  stages: StageData[];
  insertNodeByThread?: (key: string, node: Node, needUpdate?: boolean) => void;
  insertThread?: (thread: Thread, needUpdate?: boolean) => void;
};

export function getDefaultWorkSpaceData(): WorkSpaceData {
  let d_node = getDefaultNode();
  d_node.stage_index = 0;

  return {
    threads: [
      {
        name: '未命名',
        key: getOnlyKey(),
        nodes: [d_node],
      },
    ],
    stages: [
      {
        characters: [],
      },
    ],
  };
}

export default class WorkSapce {
  _threads: Thread[];
  _stages: Stage[];

  _listeners: Function[];

  constructor() {
    this._listeners = [];

    let workspace_data = getDefaultWorkSpaceData();

    this._stages = workspace_data.stages.map((item) => {
      let map = new Map();

      if (item.characters.length == 0) {
        return {
          distance: workspace_data.threads[0].nodes[0].distance,
          characters: map,
        };
      } else {
        item.characters.forEach((ele) => {
          map.set(ele.id, ele);
        });

        return {
          distance: workspace_data.threads[0].nodes[0].distance,
          characters: map,
        };
      }
    });
    this._threads = workspace_data.threads;
  }

  getStateData = () => {
    return this._stages.map((item) => {
      return {
        characters: Array.from(item.characters.values()),
      };
    });
  };

  getWorkSapce: () => WorkSpaceData = () => {
    return {
      threads: this._threads,
      stages: this.getStateData(),
      insertNodeByThread: this.insertNodeByThread,
      insertThread: this.insertThread,
    };
  };

  //添加app更改事件
  addListener = (listener: (data: WorkSpaceData) => void) => {
    this._listeners.push(listener);

    return () => {
      this._listeners = this._listeners.filter((item) => item != listener);
    };
  };

  //更新app
  updateApp = () => {
    let newData = this.getWorkSapce();

    this._listeners.forEach((lis) => {
      lis(newData);
    });
  };

  //添加node而更改stage
  updateStagesByAddNode = (node: Node, needUpdate?: boolean) => {
    let index = this._stages.findIndex(
      (item) => item.distance == node.distance
    );
    if (index !== -1) {
      return;
    }

    this._stages.push({
      distance: node.distance,
      characters: new Map(),
    });

    this._stages = this._stages.sort((a, b) => {
      return a.distance - b.distance;
    });

    if (needUpdate) {
      this.updateApp();
    }
  };

  //在线索上添加node
  insertNodeByThread = (key: string, node: Node, needUpdate?: boolean) => {
    let index = this._threads.findIndex((item) => item.key === key);
    if (index === -1) {
      return;
    }

    this._threads[index].nodes.push(node);

    this.updateStagesByAddNode(node);
    if (needUpdate) {
      this.updateApp();
    }
  };

  //添加一条新线索
  insertThread = (thread: Thread, needUpdate?: boolean) => {
    let index = this._threads.findIndex((item) => item.key === thread.key);
    if (index === -1) {
      return;
    }

    this._threads.push(thread);

    let self = this;

    thread.nodes.forEach((node) => {
      self.insertNodeByThread(thread.key, node);
    });

    if (needUpdate) {
      this.updateApp();
    }
  };
}

type Stage = {
  distance: number;
  characters: Map<number, Character>;
};

type StageData = {
  characters: Character[];
};

type Character = {
  id: number;
};

export type Node = {
  width: number;
  height: number;
  text: string;
  color: string;
  stage_index: number;
  distance: number;
};

export function getDefaultNode(): Node {
  return {
    width: 200,
    height: 40,
    text: '未命名',
    stage_index: -1,
    color: '#FFFFFF',
    distance: 200,
  };
}

export type Thread = {
  key: string;
  name: string;
  nodes: Node[];
};
