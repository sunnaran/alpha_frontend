import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import PosContext from "./PosContext";
import { Col, Divider, Row } from 'antd';
const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;

export default function Shiree() {
  const ctx = useContext(PosContext);
  useEffect(() => {
    ctx.getShiree();
  }, []);
 
  return (
    <div style={{backgroundColor: "white"}}>
    
    <Row justify="space-around" align="middle">
      <Col flex="50px">
      <div style={{color: "#8C55C1", fontWeight: "bold", paddingLeft: "10px"}}>ШИРЭЭ:</div> 
      </Col>
      <Col flex="auto">
        <Row>
        {ctx.state.shireenuud.map((el) => (
           <Col style={{margin: "5px", background: "#FCF7FD", height: "53px", borderRadius: "10px", color: "#8C55C1", fontWeight: "bold", padding: "10px", fontSize: "20px"}}> {el.nme}</Col>
          ))}  
        </Row>
        
      </Col>
    </Row>
      
    </div>
  );
}
