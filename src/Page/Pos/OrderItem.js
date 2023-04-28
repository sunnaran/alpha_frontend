import React from "react";
import PropTypes from "prop-types";

import { Button, Space, Tooltip, Row, Col } from 'antd';
import MyEllipsis from "../../Function/MyEllipsis";
import MyEllipsisBlack from "../../Function/MyEllipsisBlack";
import MyCurrency from "../../Function/MyCurrency";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useContext } from "react";
import PosContext from "./PosContext";

var currencyFormatter = require("currency-formatter");

const OrderItem = (props) => {
  const ctx = useContext(PosContext)
  const selectItem = (itemid, itemdate) =>
  {
 
    ctx.changeStateValue("selectedProductID", itemid)
    ctx.changeStateValue("selectedProductDate", itemdate)
  }
  return (
    <div
      key={props.itemid}
      style={{
        background: "#FBFCFF",
        margin: "10px",
        borderRadius: "10px",
        padding: "5px",
        cursor: "pointer"
      }}
    >
      
      <Row align="middle">      
        <Col span={(props.selectedProductID == props.itemid && props.selectedProductDate == props.itemdate) ? 12 : 16} onClick={()=>selectItem(props.itemid, props.itemdate)}>
          <div style={{ fontSize: "20px" }}>
            <MyEllipsisBlack>{props.itemname}</MyEllipsisBlack>
          </div>
          <div style={{ fontSize: "20px", marginLeft: "20px" }}>
            <span>{props.itemtoo}</span>
            <span> x </span>
            <span>{props.itemune}</span>
          </div>
        </Col>
        <Col  span={8}   onClick={()=>selectItem(props.itemid, props.itemdate)}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            <MyCurrency>{props.itemtoo * props.itemune}</MyCurrency>
          </div>
        </Col>
      {(props.selectedProductID == props.itemid && props.selectedProductDate == props.itemdate)  && <Col span={4}>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={()=>ctx.changePieceOfItem(props.itemid, props.itemdate, true)}/>      
          <Button type="primary" shape="circle" icon={<MinusOutlined />} onClick={()=>ctx.changePieceOfItem(props.itemid, props.itemdate, false)}/>      
        </Col>}
      </Row>
    </div>
  );
};

export default OrderItem;
