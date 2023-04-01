import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import MyHeader from "../constcomponents/MyHeader";
import TaskSideBar from "./TaskSideBar";
import ModalInsert from "./Uureg/ModalInsert";
import UuregContext from "./Uureg/UuregContext";
import UuregDetails from "./Uureg/UuregDetails";
export default function TaskView() {
  let { taskid } = useParams();
  const ctx = useContext(UuregContext);
  useEffect(() => {
    ctx.getTaskByID(taskid);
  }, [taskid]);

  return (
    <div>
      <MyHeader />
      <div>
        <div
          style={{
            minWidth: "170px",
            zIndex: 1,
            width: "230px",
            float: "left",
            height: "calc(100vh - 85px)",
            borderRight: "1px solid gray",
          }}
        >
          <TaskSideBar />
        </div>
        <div
          style={{
            position: "absolute",
            left: "230px",
            float: "left",

            width: "calc(100vw - 230px)",
            height: "100wh",
          }}
        >
          <div
            style={{
              overflowX: "auto",
              overflowY: "auto",
              height: "calc(100vh - 90px)",
            }}
          >
            <ModalInsert />
            <UuregDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
