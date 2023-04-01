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
} from "@ant-design/icons";
import FileCenterContext from "../../context/FileCenterContext";

const { Option } = Select;
const { Search } = Input;
const yearstart = 2019;
let listyear = [];

export default function FileMenu() {
  const ctxfilecenter = useContext(FileCenterContext);
  useEffect(() => {
    let listpage1 = [];
    for (let i = 1; i <= ctxfilecenter.state.total_page; i++) {
      listpage1.push(i);
    }
    ctxfilecenter.changeStateValue("listpage", listpage1);
  }, [ctxfilecenter.state.total_page]);

  useEffect(() => {
    ctxfilecenter.loadDataList();
  }, [ctxfilecenter.state.s_page_number]);

  const onSearch = (value) => {
    ctxfilecenter.filterBigMetter(value);
  };

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
            <Button
              type="primary"
              size="small"
              onClick={() => ctxfilecenter.setShowModal()}
              hidden={sessionStorage.getItem("role") == "hcr" ? false : true}
            >
              Нэмэх
            </Button>
            <span>
              Файлын сан{" "}
              {ctxfilecenter.state.total_row > 0 &&
                ` (${ctxfilecenter.state.total_row})`}
            </span>
            {ctxfilecenter.state.s_page_number > 1 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctxfilecenter.changeStateValue("s_page_number", 1)
                }
              >
                1
              </Button>
            )}
            {ctxfilecenter.state.s_page_number > 2 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctxfilecenter.changeStateValue(
                    "s_page_number",
                    ctxfilecenter.state.s_page_number - 1
                  )
                }
              >
                {ctxfilecenter.state.s_page_number - 1}
              </Button>
            )}
            {ctxfilecenter.state.total_row == 1 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctxfilecenter.changeStateValue(
                    "s_page_number",
                    ctxfilecenter.state.s_page_number - 1
                  )
                }
              >
                {ctxfilecenter.state.start_row}
              </Button>
            )}
            {ctxfilecenter.state.total_row > 1 && (
              <Button type="default" size="small">
                {ctxfilecenter.state.start_row}-{ctxfilecenter.state.end_row}
              </Button>
            )}
            {ctxfilecenter.state.total_page -
              ctxfilecenter.state.s_page_number >
              0 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctxfilecenter.changeStateValue(
                    "s_page_number",
                    ctxfilecenter.state.s_page_number + 1
                  )
                }
              >
                {ctxfilecenter.state.s_page_number + 1}
              </Button>
            )}
            {ctxfilecenter.state.total_page -
              ctxfilecenter.state.s_page_number >
              2 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctxfilecenter.changeStateValue(
                    "s_page_number",
                    ctxfilecenter.state.total_page
                  )
                }
              >
                {ctxfilecenter.state.total_page}
              </Button>
            )}
            {ctxfilecenter.state.total_page > 3 && (
              <Select
                value={ctxfilecenter.state.s_page_number}
                style={{ width: 53 }}
                size="small"
                onSelect={(value, event) =>
                  ctxfilecenter.changeStateValue("s_page_number", value)
                }
              >
                {ctxfilecenter.state.listpage.map((el) => (
                  <Option value={el}>{el}</Option>
                ))}
              </Select>
            )}
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
