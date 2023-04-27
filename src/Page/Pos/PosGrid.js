import React from "react";
import PosHeader from "./PosHeader";
import Shiree from "./Shiree";
import PosContext, { PosStore } from "./PosContext";
import Footer from "./Footer";
import { Row, Col, Button } from "antd";
import BaraaGrid from "./BaraaGrid";
import OrderItem from "./OrderItem";
import MyCurrency from "../../Function/MyCurrency";
import { useContext } from "react";
import SumCurrency from "../../Function/SumCurrency";

const PosGrid = () => {
  const ctx = useContext(PosContext);
  const style = {
    marginLeft: "10px",
    textAlign: "left",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "450px",
    fontSize: "30px",
    height: "120px",
    textAlign: "center",
  };

  return (
    <div style={{ background: "#E8E7EA", height: "100vh" }}>
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
              <div
                style={{
                  background: "white",
                  height: "calc(100vh - 240px)",
                  overflowY: "scroll",
                }}
              >
                {(ctx.state.order
                  .find(({ shiree }) => shiree === ctx.state.selectedTableId)
                  ?.items)?.slice().reverse().map((el9) => (
                    <OrderItem 
                      itemid={el9.itemid}
                      itemname={el9.itemname}
                      itemtoo={el9.itemtoo}
                      itemune={el9.itemune}
                    />
                  ))}
                {ctx.state.selectedTableId}
              </div>
              <div style={style}>
                <div style={{ textAlign: "left", fontWeight: "bold" }}>
                  100000
                </div>
                <div>
                  <Button
                    style={{
                      background: "#5A199C",
                      color: "white",
                      width: "96%",
                      height: "58px",
                      fontSize: "30px",
                    }}
                  >
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
    </div>
  );
};
export default PosGrid;
