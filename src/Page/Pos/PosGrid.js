import React, { useState, useCallback} from "react";
import PosHeader from "./PosHeader";
import Shiree from "./Shiree";
import PosContext, { PosStore } from "./PosContext";
import Footer from "./Footer";
import { Row, Col, Button, Modal, Space } from "antd";
import BaraaGrid from "./BaraaGrid";
import OrderItem from "./OrderItem";
import MyCurrency from "../../Function/MyCurrency";
import { useContext } from "react";
import {ExclamationCircleFilled} from "@ant-design/icons";
import SumCurrency from "../../Function/SumCurrency";
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import { useEffect } from "react";

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
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: 'Хадгалахдаа итгэлтэй байна уу?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText:"Илгээх",
        cancelText:"Хаах",
      onOk() {
       ctx.saveOrder();
      },
      onCancel() {
        console.log('Үгүй');
      },
    });
  };
  const handle = useFullScreenHandle()
  const [isFullscreen, setFullscreen] = useState(false)

  const reportChange = useCallback((state) => {
    console.log(state)
    if (state === true) {
      setFullscreen(true)
    } else if (state === false) {
      setFullscreen(false)
    }
  })
  useEffect(() => {    
    // document.body.requestFullscreen();
    
  }, [])
  
  return (
    <div style={{ background: "#E8E7EA", height: "100vh", minWidth: "1024px" }}>
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
                  ?.items)?.slice().reverse().map((el9, index) => (
                    <OrderItem                      
                      selectedProductID = {ctx.state.selectedProductID}
                      selectedItemIndex = {ctx.state.selectedItemIndex}
                      selectedProductDate= {ctx.state.selectedProductDate}
                      itemindex={index}
                      itemid={el9.itemid}
                      itemname={el9.itemname}
                      itemtoo={el9.itemtoo}
                      itemune={el9.itemune}
                      itemdate={el9.itemdate}
                    />
                  ))}
                
              </div>
              <div style={style}>
                <div style={{ textAlign: "left", fontWeight: "bold" }}>
                  <MyCurrency>{ctx.state.order.find(({ shiree }) => shiree == ctx.state.selectedTableId)?.totalprice}</MyCurrency>

                </div>
                <div>
                  <Button
                    style={{
                      marginLeft: "-10px",
                      background: "#5A199C",
                      color: "white",
                      width: "95%",
                      height: "58px",
                      fontSize: "30px",
                    }}
                    onClick={showConfirm}
                  >
                    ИЛГЭЭХ
                  </Button>
                </div>
              </div>
            </div>
          </td>
          <td>
            
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
