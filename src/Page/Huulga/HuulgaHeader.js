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
} from "antd";

import {
  PrinterFilled,
  AudioOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  DownOutlined,
  UserOutlined,
  WalletOutlined,
  SearchOutlined,
  BarChartOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import HuulgaContext from "./HuulgaContext";
const { Option } = Select;
const { Search } = Input;

export default function HuulgaHeader() {
  
  const ctx = useContext(HuulgaContext);
  return (
    <Layout style={{ backgroundColor: "#ceddff" }}>
      <Row>
        <Col
          flex="auto"
          style={{
            height: "48px",
            textAlign: "left",
            paddingLeft: "10px",
          }}
        >
          <Space style={{ height: "100%" }}>
 

            <span>
           Хуулга {" "}
              {ctx.state.total_row > 0 && ` (${ctx.state.total_row})`}
            </span>
            {ctx.state.page_number > 1 && (
              <Button
                type="primary"
                size="small"
                onClick={() => ctx.filterData("page_number", "page_number", 1)}
              >
                1
              </Button>
            )}
            {ctx.state.page_number > 2 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctx.filterData(
                    "page_number",
                    "page_number",
                    ctx.state.page_number - 1
                  )
                }
              >
                {ctx.state.page_number - 1}
              </Button>
            )}
            {ctx.state.total_row == 1 && (
              <Button size="small">
                {ctx.state.start_row}-{ctx.state.start_row}
              </Button>
            )}
            {ctx.state.total_row > 1 && (
              <Button type="default" size="small">
                {ctx.state.start_row}-{ctx.state.end_row}
              </Button>
            )}

            {ctx.state.total_page - ctx.state.page_number > 0 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctx.filterData(
                    "page_number",
                    "page_number",
                    ctx.state.page_number + 1
                  )
                }
              >
                {ctx.state.page_number + 1}
              </Button>
            )}
            {ctx.state.total_page - ctx.state.page_number > 2 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctx.filterData(
                    "page_number",
                    "page_number",
                    ctx.state.total_page
                  )
                }
              >
                {ctx.state.total_page}
              </Button>
            )}

            {ctx.state.total_page > 3 && (
              <Select
                value={ctx.state.s_page_number}
                style={{ width: 53 }}
                size="small"
                onSelect={(value, event) =>
                  ctx.filterData("page_number", "page_number", value)
                }
              >
                {ctx.state.listpage?.map((el) => (
                  <Option value={el}>{el}</Option>
                ))}
              </Select>
            )}
            {ctx.state.filter && (
              <Button
                icon={<CloseOutlined />}
                type="dashed" danger
                size="small"
                onClick={() => {
                  ctx.loadData();
                }}
              >
                Хайлт цуцлах
              </Button>
            )}
            {ctx.state.loading && <Spin />}
          </Space>
        </Col>
        <Col
          flex="auto"
          style={{
            height: "48px",
            textAlign: "right",
            paddingRight: "10px",
          }}
        ></Col>
      </Row>
    </Layout>
  );
}
