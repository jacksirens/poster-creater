import { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const onInputChange = (data) => {
    setValue(data.target.value);
  };

  const onButtonClick = () => {
    console.log(value);
    const newItem = {
      text: value,
    };
    list.push(newItem);
  };

  const onCheckboxChange = (data, index) => {
    console.log({ a: data.target });
    list[index].done = data.target.checked;
    setList(list.concat());
  };

  return (
    <div>
      <input value={value} onChange={onInputChange}></input>
      <button onClick={onButtonClick}>点击添加</button>
      <ul>
        {list.map((item) => (
          <li>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={onCheckboxChange}
            ></input>
            {item.text}
            <button onClick={() => removeItem(index)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
