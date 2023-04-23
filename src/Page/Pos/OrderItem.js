import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import MyEllipsis from "../../Function/MyEllipsis";
import MyEllipsisBlack from "../../Function/MyEllipsisBlack";
import MyCurrency from "../../Function/MyCurrency";
var currencyFormatter = require("currency-formatter");
const OrderItem = (props) => {
  return (
    <div>
      <Row align="middle">
        <Col flex="auto">
          <div style={{ fontSize: "20px" }}>
            <MyEllipsisBlack>Өвчүүтэй цуйван</MyEllipsisBlack>
          </div>
          <div style={{ fontSize: "20px", marginLeft: "20px" }}><span>2</span><span> x </span><span>15000</span></div>
        </Col>
        <Col flex="100px">
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            <MyCurrency>10000000</MyCurrency>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderItem;
