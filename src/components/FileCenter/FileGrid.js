import React, { useState } from "react";
import MyHeader from "../constcomponents/MyHeader";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import axios from "../../util/myAxios";
import { Image } from "antd";
import FileSideBar from "./FileSideBar";
import FileContent from "./FileContent";
import FileMenu from "./FileMenu";
import FileTable from "./FileTable";
import ModalInsert from "./Modal/ModalInsert";

export default function FileGrid() {
  const [submenu, setSubmenu] = useState(0);
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
          <FileSideBar />
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
          <div style={{ width: "100%" }}>
            <FileMenu />
          </div>
          <div
            style={{
              overflowX: "auto",
              overflowY: "auto",
              height: "calc(100vh - 140px)",
            }}
          >
            <FileTable />
            <ModalInsert />
          </div>
        </div>
      </div>
    </div>
  );
}
