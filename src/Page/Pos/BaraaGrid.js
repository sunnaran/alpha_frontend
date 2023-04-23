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
    <div style={{width: "100%"}}>
      <Row type="flex">
        
        {ctx.state.baraaangilal.map((el) => (
          <Col xs={12} sm={8} md={6} lg={4} xl={2}>
            
          
          <div style={{
              marginRight: "15px",
              background: "#F1EBF2",
              padding: "10px",
              margin: "5px",
              borderRadius: "8px",
              fontSize: "18px"
              , fontWeight: "bold",
              border: "1px solid #E5E5E7"
            }}>
            <table>
              <tr>
                <td>
                  {/* <img src={el.pht} height={25} /> */}
                </td>
                <td>{el.name}</td>
              </tr>
            </table>
            </div>
          </Col>
        ))}
      </Row>
      
      <Row type="flex">
      {ctx.state.baraanuud.map((el) => (
        <Col xs={12} sm={8} md={6} lg={4} xl={2}><BaraaItem zurag={el.pht} une={el.une} ner={el.nme} /></Col>        
      ))}
      </Row>
     
    </div>
  );
}
