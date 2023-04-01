import React, { useContext, useEffect } from "react";
import ReactExport from "react-export-excel";

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

import CrimeMainContext from "./crimeMainContext";
import myUtil from "../../../util/myUtil";
const { Option } = Select;
const { Search } = Input;

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function CrimeMainMenu() {
  const ctx = useContext(CrimeMainContext);

  const dataSet1 = [
    {
      name: "Johson",
      amount: 30000,
      sex: "M",
      is_married: true,
    },
    {
      name: "Monika",
      amount: 355000,
      sex: "F",
      is_married: false,
    },
    {
      name: "John",
      amount: 250000,
      sex: "M",
      is_married: false,
    },
    {
      name: "Josef",
      amount: 450500,
      sex: "M",
      is_married: true,
    },
  ];
  const dataSet2 = [
    {
      name: "Johnson",
      total: 25,
      remainig: 16,
    },
    {
      name: "Josef",
      total: 25,
      remainig: 7,
    },
  ];

  const menu = (
    <Menu>
      {ctx.state.showExcellAllButton && (
        <Menu.Item key="1">
          <ExcelFile
            element={<span> Нийт бүртгэлийг Excel-ээр татах</span>}
            filename={`Гэмт хэрэг, осол, зөрчлийн жагсаалт ${
              new Date().getFullYear() +
              ("0" + (new Date().getMonth() + 1)).slice(-2) +
              ("0" + new Date().getDate()).slice(-2)
            }`}
          >
            <ExcelSheet data={ctx.state.excelDataList} name="Зөрчлийн жагсаалт">
              <ExcelColumn label="Программын дугаар" value="key" />
              <ExcelColumn label="Анги" value="sqd_id" />
              <ExcelColumn label="Байршил" value="sqd_sub_cat" />
              <ExcelColumn label="Байрлал" value="sqd_sub_nme" />
              <ExcelColumn label="Огноо" value="crm_date" />
              <ExcelColumn label="Ангилал" value="crm_cat" />
              <ExcelColumn label="Төрөл" value="crm_type" />
              <ExcelColumn label="Шалтгаан" value="rsn" />
              <ExcelColumn label="Дүгнэлт" value="cnclsn" />
              <ExcelColumn label="Шийдвэрлэлтийн ангилал" value="rslvd_id" />
              <ExcelColumn label="шийдвэр" value="rslvd_d" />
              <ExcelColumn label="Шийдвэрлэсэн огноо" value="rslvd_date" />
              <ExcelColumn label="Бүртгэсэн" value="crtdusr" />
              <ExcelColumn label="Бүртгэсэн огноо" value="crtddt" />
            </ExcelSheet>
            <ExcelSheet data={ctx.state.excelDataCNN} name="Холбогдогч">
              <ExcelColumn label="Дугаар" value="id" />
              <ExcelColumn label="Дотоод дугаар" value="m_id" />
              <ExcelColumn
                label="Зураг"
                value={(col) =>
                  col.pht != null
                    ? `${myUtil.apicdnserver}/image/${col.pht}`
                    : ""
                }
              />
              <ExcelColumn label="Анги" value="sqd" />
              <ExcelColumn label="Байршил" value="sqd_sub" />
              <ExcelColumn label="Албан тушаал" value="pstn" />
              <ExcelColumn label="Цол" value="rnk_id" />
              <ExcelColumn label="Овог" value="lst_nme" />
              <ExcelColumn label="Нэр" value="fst_nme" />
              <ExcelColumn label="Нас" value="age" />
              <ExcelColumn label="Хүйс" value="sex" />
              <ExcelColumn label="Бүртгэлийн кодолсон дугаар" value="bkd" />
              <ExcelColumn
                label="Бүртгэлийн кодолсон дугаар үл өөрчлөгдөх"
                value="bkd_nc"
              />
              <ExcelColumn label="Регистер" value="reg" />
              <ExcelColumn label="Цэрэгт татагдсан огноо" value="tstdt" />
              <ExcelColumn label="Тангараг өргөсөн огноо" value="tudt" />
              <ExcelColumn label="Цэрэгт татагдсан ээлж" value="tsteelj" />
              <ExcelColumn label="Цэргийн алба хаасан анги" value="tstsqd" />
              <ExcelColumn label="Боловсрол" value="edu_id" />
            </ExcelSheet>
          </ExcelFile>
        </Menu.Item>
      )}
    </Menu>
  );

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
              onClick={() => {
                ctx.openInsertModal();
              }}
            >
              Нэмэх
            </Button>

            <span>
              Гэмт хэрэг, осол, зөрчил{" "}
              {ctx.state.total_row > 0 && ` (${ctx.state.total_row})`}
            </span>
            {ctx.state.s_page_number > 1 && (
              <Button
                type="primary"
                size="small"
                onClick={() => ctx.changeStateValue("s_page_number", 1)}
              >
                1
              </Button>
            )}
            {ctx.state.s_page_number > 2 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctx.changeStateValue(
                    "s_page_number",
                    ctx.state.s_page_number - 1
                  )
                }
              >
                {ctx.state.s_page_number - 1}
              </Button>
            )}
            {ctx.state.total_row == 1 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctx.changeStateValue(
                    "s_page_number",
                    ctx.state.s_page_number - 1
                  )
                }
              >
                {ctx.state.start_row}
              </Button>
            )}
            {ctx.state.total_row > 1 && (
              <Button type="default" size="small">
                {ctx.state.start_row}-{ctx.state.end_row}
              </Button>
            )}

            {ctx.state.total_page - ctx.state.s_page_number > 0 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctx.changeStateValue(
                    "s_page_number",
                    ctx.state.s_page_number + 1
                  )
                }
              >
                {ctx.state.s_page_number + 1}
              </Button>
            )}
            {ctx.state.total_page - ctx.state.s_page_number > 2 && (
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  ctx.changeStateValue("s_page_number", ctx.state.total_page)
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
                  ctx.changeStateValue("s_page_number", value)
                }
              >
                {ctx.state.listpage.map((el) => (
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
            paddingLeft: "10px",
            marginRight: "10px",
          }}
        >
          <Space style={{ height: "100%" }}>
            <div style={{ color: "red" }}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={() => ctx.loadDataForExcelAll()}
                >
                  Excel-ээр гаргах <DownOutlined />
                </a>
              </Dropdown>
              ,
            </div>
          </Space>
        </Col>
      </Row>
    </Layout>
  );
}
