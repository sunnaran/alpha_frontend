import React from "react";
import { Row, Col, Select, Space } from "antd";
import logo from "../../assets/alphalogo.png";
import css from "./posheader.module.css";
import { Link } from "react-router-dom";
export default function PosHeader() {
  const handleChange = (value) => {        
    localStorage.setItem("branch", value);
  };

  return (
    <Row style={{ background: "#FAEEFC" }}>
      <Col span={12}>
        <table>
          <tr>
            <td>
              <img src={logo} className={css.img1} />
            </td>
            <td>
              <div style={{ background: "white", padding: "6px" }}>
                С.Нарангэрэл
              </div>
            </td>
            <td>
              <div style={{   padding: "6px" }}>
                <Select
                  defaultValue="Баар"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Баар",
                      label: "Баар",
                    },
                    {
                      value: "Паб",
                      label: "Паб",
                    }, 
                  ]}
                />
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
        <Link to="/">
          <p style={{ fontWeight: "normal", color: "white" }}>Хаах</p>
        </Link>
      </Col>
    </Row>
  );
}
