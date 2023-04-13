import React from "react";
import {Row, Col} from "antd";
const BaraaItem = (props) => {
  return (
    <div style={{ border: "1px solid gray", borderRadius: "5px", backgroundColor: "white", margin: "2px", width: "70px" }}>
         <Row style={{height: "40px"}} align={"center"}>
            <Col style={{height: "40px"}}>
                <div style={{height: "40px"}}>
                <img src={props.zurag} height={40}/>
                </div>
            {/*  */}
            </Col>
         </Row>
         <Row style={{height: "20px"}} align={"center"}>
            <Col>test</Col>
         </Row>
         <Row style={{height: "20px"}} align={"center"}>
            <Col>test</Col>
         </Row>
       
    </div>
  );
};

export default BaraaItem;
