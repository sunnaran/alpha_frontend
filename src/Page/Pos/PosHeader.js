import React from "react";
import { Row, Col } from "antd";
import logo from "../../assets/alphalogo.png";
import "./posheader.module.css";
import {Link} from "react-router-dom";
export default function PosHeader() {
  return (
    <Row style={{ background: "#FAEEFC" }}>
      <Col span={12}>
        <table>
          <tr>
            <td>
              <img src={logo} />
            </td>
            <td>
              <div style={{ background: "white", padding: "6px" }}>
                С.Нарангэрэл
              </div>
            </td>
          </tr>
        </table>
      </Col>
      <Col span={11} align="right"></Col>
      <Col
        span={1}
        style={{
          background: "#5A199C",
          textAlign: "center",
          verticalAlign: "middle",
          color: "white",
        }}
      >
        <Link to = "/"><p style={{fontWeight: "normal", color: "white"}}>Хаах</p></Link>
      </Col>
    </Row>
  );
}
