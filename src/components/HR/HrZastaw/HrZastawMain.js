import React from "react";
import TopMenu from "../../constcomponents/TopMenu";
import { Link } from "react-router-dom";

import { Row, Col, Tree } from "antd";
import MyMenu from "../../constcomponents/MyMenu/MyMenu";
import Departments from "./Departments";
import AntMenu from "../../constcomponents/AntMenu/AntMenu";

export default function HrZastawMain() {
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
        </Col>
      </Row>
    </div>
  );
}
