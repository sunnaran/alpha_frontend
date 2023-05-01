import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Row, Col, Card, List } from "antd";
import PosContext from "./PosContext";
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import BaraaItem from "./BaraaItem";
export default function BaraaGrid() {
  const ctx = useContext(PosContext);
  useEffect(() => {
    ctx.getBaraaAngilal();
    ctx.getBaraa();        
    ctx.getBaraaImage();
  }, []);

  return (
    <div style={{ width: "100%", height: "calc(100vh - 180px)" }}>
      <Row type="flex">
        {ctx.state?.baraaangilal?.map((el) => (
          <Col xs={12} sm={8} md={6} lg={4} xl={2} key={el.id}>
            <div
              onClick={()=>ctx.changeStateValue('selectedProductCategory', el.id)}            
              style={{
                cursor: "pointer",
                textAlign: "center",
                marginRight: "15px",
                background: "#F1EBF2",
                padding: "10px",
                margin: "5px",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "bold",
                border: "1px solid #E5E5E7",
              }}
              key={el.name}
            >
              <table>
                <tr key={el.name}>
                  <td>{/* <img src={el.pht} height={25} /> */}</td>
                  <td>{el.name}</td>
                </tr>
              </table>
            </div>
          </Col>
        ))}
      </Row>

      <div
        style={{
          overflow: "scroll",
          height: "calc(100vh - 200px)",
        }}
      >
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 6,
            xl: 8,
            xxl: 10,
          }}
          dataSource={ctx.state.selectedProductCategory == 'total' ? ctx.state.baraanuud : ctx.state.baraanuud.filter((el)=>el.trl==ctx.state.selectedProductCategory)}

          renderItem={(item) => (
            <List.Item onClick={() => ctx.addItemToOrder(item)}>
              <BaraaItem nme={item.nme} zurag={ctx.state.baraanuudImage?.find((elimage)=>elimage.id == item.id)?.pht} une={item.une} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
