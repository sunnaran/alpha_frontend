import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import MyEllipsis from "../../Function/MyEllipsis";
import MyEllipsisBlack from "../../Function/MyEllipsisBlack";
import MyCurrency from "../../Function/MyCurrency";
var currencyFormatter = require("currency-formatter");
const OrderItem = (props) => {
  return (
    <div key={props.itemid} style={{background: "#FBFCFF", margin: "10px", borderRadius: "10px", padding: "5px"}}>
      <Row align="middle">
        <Col flex="auto">
          <div style={{ fontSize: "20px" }}>
            <MyEllipsisBlack>{props.itemname}</MyEllipsisBlack>
          </div>
          <div style={{ fontSize: "20px", marginLeft: "20px" }}><span>{props.itemtoo}</span><span> x </span><span>{props.itemune}</span></div>
        </Col>
        <Col flex="100px">
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            <MyCurrency>{props.itemtoo*props.itemune}</MyCurrency>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderItem;
