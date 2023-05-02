import { Button, Row, Col, Alert, Space, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BellOutlined } from "@ant-design/icons";
import PosContext from "../../Page/Pos/PosContext";
import BaraaItem from "../../Page/Pos/BaraaItem";
import axios from "../../util/myAxiosBell";
const initialState = {
  loading: false,
};

const QrmenuGrid = () => {
  const [state, setState] = useState(initialState);

  const [loading, setLoading] = useState(false);
  const ctx = useContext(PosContext);
  const { id } = useParams();

  const callWaiter = (id1) => {
    console.log("called");
    const messagecode = 190001;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${id}`,
        request_code: messagecode,
      },
    };
    const data = {
      token: id,
    };
    setLoading(true);
    axios
      .post("/public/request", data, configload)
      .then((response) => {
        const data1 = response.data;
        message.info("Амжилттай");
        setLoading(false);
      })
      .catch((error) => {
        message.warning("Амжилтгүй ");
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    ctx.getBaraaAngilal();
    ctx.getBaraa();
    ctx.getBaraaImage();
    sessionStorage.clear();
  }, []);
  return (
    <div style={{ height: "100vh", overflowX: "scroll" }}>
      <Row style={{ background: "transparent" }}>
        <Col span={24} align="center">
          <div
            style={{
              background: "#F6FFED",
              border: "1px solid #c6f598",
              top: 0,
              position: "relative",
              padding: "10px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            ЦАХИМ МЕНЮ - ALPHA BAR & PUB
          </div>

          <div style={{ padding: "10px" }}>
            <Button
              type="primary"
              loading={loading}
              icon={<BellOutlined />}
              onClick={(id) => callWaiter(id)}
            >
              Үйлчилгээний ажилтан дуудах
            </Button>
          </div>
        </Col>

        <div>
          <Col span={24} align="left">
            {ctx.state.baraaangilal?.map((el) => (
              <>
                <Alert message={el.name} type="info" />
                <Row>
                  {ctx.state.baraanuud
                    ?.filter((el1) => el1.trl == el.id)
                    ?.map((el9) => (
                      <Space size={[8, 16]} wrap>
                        <BaraaItem
                          nme={el9.nme}
                          zurag={
                            ctx.state.baraanuudImage?.find(
                              (elimage) => elimage.id == el9.id
                            )?.pht
                          }
                          une={el9.une}
                        />
                      </Space>
                    ))}
                </Row>
              </>
            ))}
          </Col>
        </div>
      </Row>
      <div style={{ padding: "20px", textAlign: "center", height: "50px" }}>
        Developed by ALPHA TEAM 2023
      </div>
    </div>
  );
};
export default QrmenuGrid;
