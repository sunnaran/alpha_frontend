import React from "react";
import MyHeader from "../constcomponents/MyHeader";
import TaskSideBar from "./TaskSideBar";
import ModalInsert from "./Uureg/ModalInsert";
import UuregHeader from "./Uureg/UuregHeader";
import UuregTable from "./Uureg/UuregTable";

export default function TaskGrid() {
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
          <TaskSideBar menu1={1} />
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
            <UuregHeader />
            <ModalInsert />
            <UuregTable />
          </div>
        </div>
      </div>
    </div>
  );
}
