import React, {useState} from "react";
import { useContext } from "react";
import { useEffect } from "react";
import PosContext from "./PosContext";
import { Col, Divider, Row, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
const DemoBox = (props) => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

export default function Shiree() {
  const [counter, setCounter] = useState(0);
  const ctx = useContext(PosContext);
  useEffect(() => {
    ctx.getShiree();    
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      ctx.getBell();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Row justify="space-around" align="middle">
        <Col flex="50px">
          <div
            style={{
              color: "#8C55C1",
              fontWeight: "bold",
              paddingLeft: "10px",
              fontSize: "20px",
            }}
          >
            ШИРЭЭ:
          </div>
        </Col>
        <Col flex="auto">
          <div>
            {ctx.state.shireenuud
              ?.filter((el1) => el1.ngj == ctx.state.branch)
              ?.slice()
              ?.reverse()
              .map((el) => (
                    <Space size={[8, 16]} wrap>
                <div
                  onClick={() => ctx.changeStateValue("selectedTableId", el.id)}
                  key={el.id}
                  style={{
                    fontSize: "18px",
                    textAlign: "center",
                    margin: "5px",
                    background:
                      el.id == ctx.state.selectedTableId
                        ? "#8C55C1"
                        : "#FCF7FD",
                    height: "30px",
                    borderRadius: "10px",
                    color:
                      el.id == ctx.state.selectedTableId ? "white" : "#8C55C1",
                    fontWeight: "bold",
                    padding: "10px",
                    fontSize: "20px",
                    minWidth: "50px",
                  }}
                  
                >
                  {ctx.state.listBell?.find((el11)=>el11.tableid == el.id)!=null &&   <BellOutlined style={{color: "red"}}/>} 
                  {el.nme}                
                </div></Space>
              ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
