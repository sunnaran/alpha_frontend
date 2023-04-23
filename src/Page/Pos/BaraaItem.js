import React from "react";
import {Row, Col} from "antd";
import MyEllipsis from "../../Function/MyEllipsis";
const BaraaItem = (props) => {
  return (
    <div style={{   border: "1px solid #E5E5E7", borderRadius: "5px", backgroundColor: "white",  width: "100px", padding: "5px"  }}>
         <Row style={{height: "50px", minwidth: "50px"}} align={"center"}>
            <Col style={{height: "50px"}}>
                <div style={{height: "50px"}}>
                <img src={props.zurag==null ? require('../../assets/logo_s.png') : props.zurag} height={45}/>
                </div>
            {/*  */}
            </Col>
         </Row>
         <Row><Col style={{height: "5px", background: "#F9F1FD", width: "100%"}}></Col></Row>
         <Row style={{height: "40px", textAlign: "center"}} align={"center"}>
         <Col ><MyEllipsis row={2}>{props.nme == null ? 'Өвчүү, шарсан хавиргатай цуйван': props.nme}</MyEllipsis></Col>
         </Row>
         <Row style={{height: "20px"}} align={"center"}>
            <Col style={{color: "#571E94", fontWeight: "bold"}}>{props.une == null ? '200,000': props.une}</Col>
         </Row>
       
    </div>
  );
};

export default BaraaItem;
