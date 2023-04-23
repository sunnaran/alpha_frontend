import React from "react";
import {Row, Col} from "antd";
const BaraaItem = (props) => {
  return (
    <div style={{   border: "1px solid #E5E5E7", borderRadius: "5px", backgroundColor: "white",  width: "100px", padding: "5px"  }}>
         <Row style={{height: "50px", minwidth: "50px"}} align={"center"}>
            <Col style={{height: "50px"}}>
                <div style={{height: "50px"}}>
                <img src={props.zurag} height={45}/>
                </div>
            {/*  */}
            </Col>
         </Row>
         <Row style={{height: "20px"}} align={"center"}>
         <Col>{props.nme == null ? 'Өвчүү, шарсан хавиргатай цуйван': props.nme}</Col>
         </Row>
         <Row style={{height: "20px"}} align={"center"}>
            <Col>{props.une == null ? '200,000': props.une}</Col>
         </Row>
       
    </div>
  );
};

export default BaraaItem;
