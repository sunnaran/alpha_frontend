import React from "react";
import { Row, Col, Divider, Avatar, Image } from "antd";
import { Link } from "react-router-dom";
import css from "./TopMenu.module.css";
import logo from "../../assets/logo_s.png";
import Profile from "./Profile";
export default function TopMenu() {
  return (
    <div>
      <Row className={css.wrapper1}>
        <Col flex="auto">
          <Link to="/">
          <img src={logo} alt="Alpha LOGO" height="30"></img>  
          </Link>
        </Col>
        <Col  align="right">
          <Profile />
        </Col>
      </Row>
    </div>
  );
}
