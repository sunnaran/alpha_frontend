import React from "react";
import PosHeader from "./PosHeader";
import Shiree from "./Shiree";
import { PosStore } from "./PosContext";
import Footer from "./Footer";
import { Row, Col } from "antd";
import BaraaGrid from "./BaraaGrid";

const PosGrid = () => {
  return (
    <div style={{ background: "#F2F2F2", height: "100vh" }}>
      <PosStore>
        <PosHeader />
        <Shiree />
        <Row>
          <Col flex="453px">
            <div
              style={{
                background: "white",
                margin: "5px",
                height: "calc(100vh - 140px)",
              }}
            >
              453
            </div>
          </Col>
          <Col flex="auto">
            <div style={{ background: "transparent", margin: "5px" }}><BaraaGrid/></div>
          </Col>
        </Row>
        <Footer />
      </PosStore>
    </div>
  );
};
export default PosGrid;
