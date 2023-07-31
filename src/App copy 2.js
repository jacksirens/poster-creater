import { useState } from "react";
import {
  Button,
  Input,
  Card,
  Grid,
  DatePicker,
  Select,
  Cascader,
  DateRangePicker,
} from "zent";
import "zent/css/index.css";
import { produce } from "immer";

const stateMap = {
  undone: "未完成",
  doing: "进行中",
  done: "完成",
};

const convertData = (list) => {
  const map = {};
  const getUser = (item) => {
    if (!item.children) {
      console.log(item);
      map[item.id] = item;
      return;
    }
    item.children.map(getUser);
  };
  list.map(getUser);
  return map;
};

const options = [
  {
    text: "开发",
    value: "1",
  },
  {
    text: "会议",
    value: "2",
  },
  {
    text: "休闲",
    value: "3",
  },
];

const cascaderOptions = [
  {
    id: "1",
    title: "数据中台",
    children: [
      {
        id: "1-1",
        title: "数据生态",
        children: [
          {
            id: "1-1-1",
            title: "数据可视化",
            children: [
              {
                id: "1-1-1-1",
                title: "陈海蛟",
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        title: "数据平台",
        children: [
          {
            id: "1-2-1",
            title: "数据研发平台",
            children: [
              {
                id: "1-2-1-1",
                title: "羽中",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "测试组",
    children: [
      {
        id: "2-1",
        title: "小柿",
      },
      {
        id: "2-2",
        title: "李宏伟",
      },
    ],
  },
];

const data = Object.values(convertData(cascaderOptions)).map(
  ({ id, title }) => ({
    text: title,
    value: id,
  })
);
function App() {
  const [list, setList] = useState([
    {
      text: "哈哈哈",
      level: 1,
      editable: false,
      done: false,
    },
    {
      text: "哈哈哈1",
      level: 1,
      editable: false,
      done: true,
    },
  ]);

  const [owner, setOwner] = useState();
  const [text, setText] = useState();
  const [state, setState] = useState();
  const [endTime, setEndTime] = useState();

  const [createData, setCreateData] = useState({});
  // 1
  // const stateData = useState("");
  // const value = stateData[0];
  // const setValue = stateData[1];
  // 2
  const [value, setValue] = useState("");

  const onButtonClick = () => {
    list.push(createData);
    setList(list.concat());
    setCreateData({});
  };

  const removeItem = (index) => {
    list.splice(index, 1);
    setList(list.concat());
  };

  const columns = [
    {
      name: "text",
      title: "任务名",
    },
    {
      name: "state",
      title: "状态",
    },
    {
      name: "user",
      title: "负责人",
    },
    {
      name: "endTime",
      title: "截止时间",
    },
    {
      name: "operate",
      title: "操作",
      bodyRender(data, { row }) {
        return (
          <>
            <Button>挂起</Button>
            <Button>完成</Button>
            <Button
              onClick={() => {
                removeItem(row);
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const updateCreateData = (value, name) => {
    setCreateData(
      produce((draft) => {
        draft[name] = value;
      })
    );
  };

  return (
    <div>
      <Card title="添加">
        <div>
          任务名称：
          <Input
            width={200}
            value={createData["text"]}
            showClear
            onChange={({ target }) => updateCreateData(target.value, "text")}
          ></Input>
        </div>
        <div>
          截止时间：
          <div>
            <DatePicker
              width={200}
              value={createData.endTime}
              showClear
              onChange={(value) => updateCreateData(value, "endTime")}
            ></DatePicker>
          </div>
        </div>
        <div>
          任务类型：
          <div>
            <Select
              width={200}
              value={createData.state}
              data={options}
              showClear
              onChange={({ target }) => updateCreateData(target.value, "state")}
            ></Select>
          </div>
        </div>
        <div>
          负责人：
          <div>
            <Cascader
              options={cascaderOptions}
              width={200}
              value={(createData.owner || []).map(({ id }) => id)}
              showClear
              onChange={(data) => updateCreateData(data, "owner")}
            ></Cascader>
          </div>
        </div>
        <Button onClick={() => onButtonClick()} type="primary">
          点击添加
        </Button>
      </Card>
      <Card title="列表">
        <div>
          名称：
          <div>
            <Input
              width={200}
              value={text}
              onChange={({ target }) => setText(target.value)}
            ></Input>
          </div>
        </div>
        <div>
          状态：
          <div>
            <Select
              data={options}
              value={state}
              onChange={({ target }) => setState(target.value)}
            ></Select>
          </div>
        </div>
        <div>
          负责人：
          <div>
            <Select
              data={data}
              value={owner}
              onChange={({ target }) => setOwner(target.value)}
            ></Select>
          </div>
        </div>
        <div>
          截止时间：
          <div>
            <DateRangePicker
              data={data}
              value={endTime}
              onChange={(data) => setEndTime}
            ></DateRangePicker>
          </div>
        </div>
        <Grid datasets={list} columns={columns}></Grid>
      </Card>
    </div>
  );
}

export default App;
