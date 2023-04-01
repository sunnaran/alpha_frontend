import React, { useContext, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Space,
  Select,
  Input,
  Button,
  Menu,
  Spin,
  Dropdown,
  message,
} from "antd";

import {
  PrinterFilled,
  AudioOutlined,
  SettingOutlined,
  DownOutlined,
  UserOutlined,
  WalletOutlined,
  SearchOutlined,
  BarChartOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

export default function UuregDetailHeader() {
  return (
    <Layout style={{ backgroundColor: "#ceddff" }}>
      <Row>
        <Col
          flex="auto"
          style={{
            height: "48px",
            textAlign: "left",
            paddingLeft: "10px",
            paddingRight: "20px",
          }}
        >
          <Space style={{ height: "100%", textAlign: "right" }}>
            Үүргийн дэлгэрэнгүй мэдээлэл, биелэлт
          </Space>
        </Col>
        <Col
          flex="auto"
          style={{
            height: "48px",
            textAlign: "right",
            paddingLeft: "10px",
            paddingRight: "20px",
          }}
        >
          <Space style={{ height: "100%", textAlign: "right" }}>
            <Button
              type="primary"
              shape="circle"
              icon={<QuestionOutlined />}
              size={"small"}
              onClick={() =>
                message.info(
                  "Үүргийн биелэлт хүснэгтэд хулганы баруун товчыг   дарахад танилцах, биелэлт оруулах цэс харагдана."
                )
              }
            />
          </Space>
        </Col>
      </Row>
    </Layout>
  );
}
