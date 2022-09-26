export type WorkSpaceData = {
  threads: Thread[];
  stages: StageData[];
};

export function getDefaultWorkSpaceData(): WorkSpaceData {
  let d_node = getDefaultNode();
  d_node.stage_index = 0;

  return {
    threads: [
      {
        name: '未命名',
        key: '',
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

  constructor() {
    let workspace_data = getDefaultWorkSpaceData();

    this._stages = workspace_data.stages.map((item) => {
      let map = new Map();

      if (item.characters.length == 0) {
        return {
          characters: map,
        };
      } else {
        item.characters.forEach((ele) => {
          map.set(ele.id, ele);
        });

        return {
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

  updateWorkSapce: () => WorkSpaceData = () => {
    return {
      threads: this._threads,
      stages: this.getStateData(),
    };
  };
}

type Stage = {
  characters: Map<number, Character>;
};

type StageData = {
  characters: Character[];
};

type Character = {
  id: number;
};

type Node = {
  width: number;
  height: number;
  text: string;
  color: string;
  stage_index: number;
};

export function getDefaultNode(): Node {
  return {
    width: 200,
    height: 40,
    text: '未命名',
    stage_index: -1,
    color: '#FFFFFF',
  };
}

type Thread = {
  key: string;
  name: string;
  nodes: Node[];
};
