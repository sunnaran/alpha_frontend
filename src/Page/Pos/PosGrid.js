import React from "react";
import PosHeader from "./PosHeader";
import Shiree from "./Shiree";
import { PosStore } from "./PosContext";
import Footer from "./Footer";
import { Row, Col, Button } from "antd";
import BaraaGrid from "./BaraaGrid";
import OrderItem from "./OrderItem";
import MyCurrency from "../../Function/MyCurrency";

const PosGrid = () => {
  const style = {
    marginLeft: "10px",
    textAlign: "left",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "450px",
    fontSize: "30px",    
    height: "120px",
    textAlign: "center"
  };

  return (
    <div style={{ background: "#E8E7EA", height: "100vh" }}>
      <PosStore>
        <PosHeader />
        <Shiree />
        <table>
          <tr>
            <td style={{ width: "453px" }}>
              <div
                style={{
                  background: "white",
                  margin: "5px",
                  height: "calc(100vh - 140px)",

                }}
              >
              <div style={{background: "yellow",  height: "calc(100vh - 240px)", overflowY:"scroll"  }}><OrderItem /></div>
                <div style={style}>
                   
                  <div style={{textAlign: "left", fontWeight: "bold"}}><MyCurrency>1000000</MyCurrency></div>
                  <div>
                    <Button style={{ background: "#5A199C", color: "white", width :"96%", height: "58px", fontSize: "30px" }}>
                      ТӨЛБӨР
                    </Button>
                  </div>
                </div>
              </div>
            </td>
            <td>
              {" "}
              <div style={{ background: "transparent", margin: "5px" }}>
                <BaraaGrid />
              </div>
            </td>
          </tr>
        </table>
        {/* <Row>
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
        </Row> */}
        <Footer />
      </PosStore>
    </div>
  );
};
export default PosGrid;
