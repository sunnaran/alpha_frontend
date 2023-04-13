import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Row, Col } from "antd";
import PosContext from "./PosContext";
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import BaraaItem from "./BaraaItem";
export default function BaraaGrid() {
  const ctx = useContext(PosContext);
  useEffect(() => {
    ctx.getBaraa();
    ctx.getBaraaAngilal();
  }, []);

  return (
    <div>
      <Row>
        
        <Col
          style={{
            background: "#F1EBF2",
            padding: "10px",
            margin: "5px",
            borderRadius: "8px",
          }}
        >
          {" "}
          <table>
            <tr>
              <td>
                <HomeOutlined />
              </td>
            </tr>
          </table>
        </Col>
        {ctx.state.baraaangilal.map((el) => (
          <Col
            style={{
              background: "#F1EBF2",
              padding: "10px",
              margin: "5px",
              borderRadius: "8px",
            }}
          >
            <table>
              <tr>
                <td>
                  <img src={el.pht} height={20} />
                </td>
                <td>{el.name}</td>
              </tr>
            </table>
          </Col>
        ))}
      </Row>
      
      <Row>
      {ctx.state.baraanuud.map((el) => (
        <Col><BaraaItem zurag={el.pht} une={el.une} ner={el.nme} /></Col>
        
      ))}
      </Row>
     
    </div>
  );
}
