import React, { useEffect, useState } from "react";
import { Row, Col, Tree, message } from "antd";
import axios from "../../../util/myAxios";
const treeData = [
  {
    key: 1,
    title: "Хил хамгаалах байгууллага",
    parent_id: null,
    children: [
      {
        key: 5,
        title: "Анги 1",
        parent_id: 1,
      },
      {
        key: 2,
        title: "Удирдах газар",
        parent_id: 1,
        children: [
          {
            key: 7,
            title: "Газар 1",
            parent_id: 2,
            children: [
              {
                key: 11,
                title: "Хэлтэс 1",
                parent_id: 7,
              },
            ],
          },
          {
            key: 6,
            title: "Газар 2",
            parent_id: 2,
            children: [
              {
                key: 8,
                title: "Хэлтэс 2",
                parent_id: 6,
              },
              {
                key: 9,
                title: "Хэлтэс 3",
                parent_id: 6,
              },
              {
                key: 10,
                title: "Хэлтэс 4",
                parent_id: 6,
              },
            ],
          },
        ],
      },
      {
        key: 3,
        title: "Анги 2",
        parent_id: 1,
        children: [
          {
            key: 12,
            title: "Тасаг 1",
            parent_id: 3,
            children: [
              {
                key: 13,
                title: "Алба 1",
                parent_id: 12,
              },
            ],
          },
        ],
      },
      {
        key: 4,
        title: "Анги 3",
        parent_id: 1,
      },
    ],
  },
];
export default function Departments() {
  const [state, setState] = useState(treeData);

  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };
  useEffect(() => {
    axios
      .get("department")
      .then((response) => {
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(response.data.message);
          return;
        }
        setState([response.data.treeresult]);
        console.log([response.data.treeresult]);
      })

      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Tree
        checkable
        defaultExpandedKeys={[1]}
        defaultSelectedKeys={[2]}
        defaultCheckedKeys={[3, 6]}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={state}
      />
    </div>
  );
}
