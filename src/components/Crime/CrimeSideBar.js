import React, { useContext, useEffect, useState } from "react";
import imgfile from "../../assets/logo_black.png";
import { Image, message } from "antd";
import axios from "../../util/myAxios";
import CrimeContext from "../../context/CrimeContext";
export default function CrimeSideBar() {
  const ctxCrime = useContext(CrimeContext);
  const sub_menu = [];
  useEffect(() => {}, []);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <img height="100px" width="75px" src={imgfile} />
      <h2 style={{ color: "gray" }}>Хяналт-шинжилгээ, үнэлгээ</h2>
      <div style={{ height: "30px" }}></div>
      <div
        onClick={() => {
          ctxCrime.changeStateValue("sub_menu", 1);
        }}
        style={{
          textAlign: "left",
          paddingLeft: "20px",
          padding: "5px",
          backgroundColor: ctxCrime.state.sub_menu == 1 ? "orange" : "wheat",
          margin: "10px",
        }}
      >
        Гэмт хэрэг, осол, зөрчлийн бүртгэл
      </div>
      <div
        onClick={() => {
          ctxCrime.changeStateValue("sub_menu", 2);
        }}
        style={{
          textAlign: "left",
          paddingLeft: "20px",
          padding: "5px",
          backgroundColor: ctxCrime.state.sub_menu == 2 ? "orange" : "wheat",
          margin: "10px",
        }}
      >
        Хяналт-шинжилгээ, үнэлгээ хийсэн ажлын бүртгэл
      </div>
      <div
        onClick={() => {
          ctxCrime.changeStateValue("sub_menu", 3);
        }}
        style={{
          textAlign: "left",
          paddingLeft: "20px",
          padding: "5px",
          backgroundColor: ctxCrime.state.sub_menu == 3 ? "orange" : "wheat",
          margin: "10px",
        }}
      >
        Хяналт-шинжилгээ, үнэлгээний ажилтнуудын судалгаа
      </div>
    </div>
  );
}
