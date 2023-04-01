import React from "react";
import TopMenu from "../constcomponents/TopMenu";
import { Link } from "react-router-dom";

import { Row, Col, Tree } from "antd";

import Departments from "../../components/HR/HrZastaw/Departments";
import AntMenu from "../constcomponents/AntMenu/AntMenu";
import NewsTest from "./NewsTest";
import NewsUpload from "./NewsUpload";
import NewsDown from "./NewsDown";

export default function NewsMain() {
  return (
    <div>
      <TopMenu />
      <div style={{ border: "0.1px dotted green", width: "100%" }}></div>
      <AntMenu />
      <div style={{ border: "0.1px dotted green", width: "100%" }}></div>
      <Row>
        <Col
          flex="300px"
          align="left"
          style={{
            borderRight: "1px dotted orange",
            height: "calc(100vh - 80px)",
          }}
        >
          <Departments />
        </Col>
        <Col flex="auto">
          <Link to="/">dsfasdf</Link>
          <NewsTest />
          <NewsUpload />
          <NewsDown />
        </Col>
      </Row>
    </div>
  );
}
