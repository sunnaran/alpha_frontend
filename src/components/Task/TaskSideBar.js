import React, { useContext, useEffect, useState } from "react";
import imgfile from "../../assets/logo_black.png";
import { Image, message } from "antd";
import axios from "../../util/myAxios";
import { Link } from "react-router-dom";
const TaskSideBar = (props) => {
  useEffect(() => {}, []);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <img height="100px" width="75px" src={imgfile} />
      <h2 style={{ color: "gray" }}>Ажлын талбар</h2>
      <div style={{ height: "30px" }}></div>
      <div
        style={{
          textAlign: "left",
          paddingLeft: "20px",
          padding: "5px",
          backgroundColor: props.menu1 == 1 ? "orange" : "wheat",
          margin: "10px",
        }}
      >
        <Link to="/task" style={{ color: "black" }}>
          Үүрэг даалгавар
        </Link>
      </div>
      <div
        style={{
          textAlign: "left",
          paddingLeft: "20px",
          padding: "5px",
          backgroundColor: props.menu1 == 2 ? "orange" : "wheat",
          margin: "10px",
        }}
      ></div>
      <div
        style={{
          textAlign: "left",
          paddingLeft: "20px",
          padding: "5px",
          backgroundColor: props.menu1 == 3 ? "orange" : "wheat",
          margin: "10px",
        }}
      ></div>
    </div>
  );
};
export default TaskSideBar;
