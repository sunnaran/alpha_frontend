import React, { useContext, useEffect, useState } from "react";
import imgfile from "../../assets/filecenter.png";
import { Image } from "antd";
import axios from "../../util/myAxios";
import { message } from "antd";
import FileCenterContext from "../../context/FileCenterContext";

export default function FileSideBar() {
  const ctxFile = useContext(FileCenterContext);
  useEffect(() => {
    ctxFile.getCategories();
  }, []);
  useEffect(() => {
    ctxFile.loadDataList();
  }, [ctxFile.state.s_catid]);

  return (
    <div style={{ textAlign: "center", marginTop: "30px", cursor: "pointer" }}>
      <img height="100px" width="100px" src={imgfile} />
      <div style={{ height: "30px" }}></div>

      {ctxFile.state.listCategory.map((el) =>
        ctxFile.state.s_catid == el.id ? (
          <div
            onClick={() => {
              ctxFile.changeStateValue("s_catid", el.id);
            }}
            style={{
              textAlign: "left",
              paddingLeft: "20px",
              padding: "5px",
              backgroundColor: "orange",
              margin: "10px",
            }}
            key={el.name}
          >
            {el.name}
          </div>
        ) : (
          <div
            onClick={() => {
              ctxFile.changeStateValue("s_catid", el.id);
            }}
            style={{
              textAlign: "left",
              paddingLeft: "20px",
              padding: "5px",
              backgroundColor: "wheat",
              margin: "10px",
            }}
            key={el.name}
          >
            {el.name}
          </div>
        )
      )}
    </div>
  );
}
