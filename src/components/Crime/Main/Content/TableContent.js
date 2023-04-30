import React, { useContext, useEffect } from "react";
import {
  Modal,
  Layout,
  Col,
  Row,
  Space,
  Select,
  Checkbox,
  Button,
  Tooltip,
  Input,
  DatePicker,
  Spin,
  Popconfirm,
  message,
  InputNumber,
  Menu,
  Dropdown,
  Typography,
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
  PaperClipOutlined,
  MessageOutlined,
  FileOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import CrimeMainContext from "../crimeMainContext";
import DownloadFile from "../../../constcomponents/DownloadFile";
import MyEllipsis from "../../../constcomponents/MyEllipsis";

const { confirm } = Modal;

const { Text, Link, Paragraph } = Typography;
export default function TableContent() {
  const ctxmaincrime = useContext(CrimeMainContext);

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Анхааруулга",
      icon: <ExclamationCircleOutlined />,
      content: "Устгахдаа итгэлтэй байна уу!!!",
      okText: "Тийм",
      okType: "danger",
      cancelText: "Үгүй",
      onOk() {
        ctxmaincrime.deleteCrime(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    ctxmaincrime.loadDataListAll();
  }, [ctxmaincrime.state.s_page_number]);
  const onClickRow = (el) => {
    ctxmaincrime.changeStateValue("selectedperson", el);
  };
  const text = "Устгахдаа итгэлтэй байна уу?";
  const menu = (el) => (
    <Menu>
      <Menu.Item key="1" onClick={() => ctxmaincrime.openUpdate(el)}>
        Засах
      </Menu.Item>
      <Menu.Item key="delete-Id-here" onClick={() => showDeleteConfirm(el.key)}>
        Устгах
      </Menu.Item>
    </Menu>
  );
  return (
    <div
      style={{
        overflowY: "auto",
        overflowX: "auto",
        height: "calc(100vh - 375px)",
      }}
    >
      <table>
        <thead
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "#e8e9ee",
          }}
        >
          <tr style={{ height: "50px" }}>
            <th></th>
            <th colSpan={1}>Анги</th>
            <th>Байршил</th>
            <th>Дэлгэрэнгүй</th>
            <th>Огноо</th>
            <th>Ангилал</th>
            <th>Төрөл</th>
            <th>Материал</th>
            <th>Шалтгаан</th>
            <th>Дүгнэлт</th>
            <th>Холбогдогч</th>
            <th>Шийдвэр</th>
            <th>Шийдвэрлэлт</th>
            <th>Шийдвэрлэсэн огноо</th>
            <th>Бүртгэсэн</th>
            <th>Бүртгэсэн огноо</th>
          </tr>
          <tr>
            <td></td>
            <td>
              <div style={{ maxWidth: "100px" }}>
                <Input
                  size="small" //OnPressEnter bolgoj bolno
                  value={ctxmaincrime.state.s_sqd_id}
                  style={{ margin: "0px", padding: "0px" }}
                  onChange={(event) =>
                    ctxmaincrime.changeStateValue(
                      "s_sqd_id",
                      event.target.value
                    )
                  }
                  onPressEnter={() => ctxmaincrime.filterData()}
                />
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "150px" }}>
                <Input
                  size="small" //OnPressEnter bolgoj bolno
                  value={ctxmaincrime.state.s_sqd_sub_cat}
                  style={{ margin: "0px", padding: "0px" }}
                  onChange={(event) =>
                    ctxmaincrime.changeStateValue(
                      "s_sqd_sub_cat",
                      event.target.value
                    )
                  }
                  onPressEnter={() => ctxmaincrime.filterData()}
                />
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "150px", width: "150px" }}>
                <Input
                  size="small" //OnPressEnter bolgoj bolno
                  value={ctxmaincrime.state.s_sqd_sub_nme}
                  style={{ margin: "0px", padding: "0px" }}
                  onChange={(event) =>
                    ctxmaincrime.changeStateValue(
                      "s_sqd_sub_nme",
                      event.target.value
                    )
                  }
                  onPressEnter={() => ctxmaincrime.filterData()}
                />
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "80px" }}>
                <Input
                  placeholder="он/сар/өдөр"
                  size="small" //OnPressEnter bolgoj bolno
                  value={ctxmaincrime.state.s_crm_date}
                  style={{ margin: "0px", padding: "0px" }}
                  onChange={(event) =>
                    ctxmaincrime.changeStateValue(
                      "s_crm_date",
                      event.target.value
                    )
                  }
                  onPressEnter={() => ctxmaincrime.filterData()}
                />
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "130px" }}>
                <Select
                  size="small"
                  style={{ width: "110px" }}
                  defaultValue={ctxmaincrime.state.s_crm_cat}
                  onSelect={(value, event) => {
                    ctxmaincrime.filterDataDown("crm_cat", "s_crm_cat", value);
                  }}
                >
                  <Select.Option key={0} value={null}>
                    Бүгд
                  </Select.Option>
                  <Select.Option key={1} value={"Гэмт хэрэг"}>
                    Гэмт хэрэг
                  </Select.Option>
                  <Select.Option key={2} value={"Осол"}>
                    Осол
                  </Select.Option>
                  <Select.Option key={3} value={"Зөрчил"}>
                    Зөрчил
                  </Select.Option>
                </Select>
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "150px",
                  width: "150px",
                  textAlign: "center",
                }}
              >
                <Select
                  size="small"
                  style={{ width: "150px" }}
                  defaultValue={ctxmaincrime.state.s_crm_type}
                  onSelect={(value, event) => {
                    ctxmaincrime.filterDataDown(
                      "crm_type",
                      "s_crm_type",
                      value
                    );
                  }}
                >
                  <Select.Option value={null}>Бүгд</Select.Option>
                  <Select.Option value={"Сахилгын зөрчил"}>
                    Сахилгын зөрчил
                  </Select.Option>
                  <Select.Option value={"Төсөв санхүүгийн зөрчил"}>
                    Төсөв санхүүгийн зөрчил
                  </Select.Option>
                  <Select.Option value={"Худалдан авах ажиллагааны зөрчил"}>
                    Худалдан авах ажиллагааны зөрчил
                  </Select.Option>
                  <Select.Option value={"Эрүүл ахуйн зөрчил"}>
                    Эрүүл ахуйн зөрчил
                  </Select.Option>
                  <Select.Option value={"Авто техникийн зөрчил"}>
                    Авто техникийн зөрчил
                  </Select.Option>
                  <Select.Option value={"Гэмт хэргийн шинжтэй зөрчил"}>
                    Гэмт хэргийн шинжтэй зөрчил
                  </Select.Option>
                  <Select.Option value={"Ёс зүйн зөрчил"}>
                    Ёс зүйн зөрчил
                  </Select.Option>
                  <Select.Option value={"Үйлдвэрлэлийн осол"}>
                    Үйлдвэрлэлийн осол
                  </Select.Option>
                  <Select.Option value={"Ахуйн осол"}>Ахуйн осол</Select.Option>
                  <Select.Option value={"Зам тээврийн осол"}>
                    Зам тээврийн осол
                  </Select.Option>
                  <Select.Option value={"Зэвсгийн осол"}>
                    Зэвсгийн осол
                  </Select.Option>
                  <Select.Option value={"Хүний амь настай холбоотой осол"}>
                    Хүний амь настай холбоотой осол
                  </Select.Option>
                  <Select.Option value={"Өөрийн бие эрхтэнд гэмтэл учруулсан"}>
                    Өөрийн бие эрхтэнд гэмтэл учруулсан
                  </Select.Option>
                  <Select.Option value={"ХЦАХ-тай зүй бус харьцсан"}>
                    ХЦАХ-тай зүй бус харьцсан
                  </Select.Option>
                  <Select.Option value={"Албаны бэлэн байдал алдагдуулсан"}>
                    Албаны бэлэн байдал алдагдуулсан
                  </Select.Option>
                  <Select.Option value={"Бусдын бие эрхтэнд гэмтэл учруулсан"}>
                    Бусдын бие эрхтэнд гэмтэл учруулсан
                  </Select.Option>
                  <Select.Option value={"Анги байрлалаа орхиж оргосон"}>
                    Анги байрлалаа орхиж оргосон
                  </Select.Option>
                  <Select.Option value={"Ангийн дотоод журам зөрчсөн"}>
                    Ангийн дотоод журам зөрчсөн
                  </Select.Option>
                  <Select.Option value={"Төсөв санхүүгийн зөрчил"}>
                    Төсөв санхүүгийн зөрчил
                  </Select.Option>

                  <Select.Option value={"Архидан согтуурсан"}>
                    Архидан согтуурсан
                  </Select.Option>
                  <Select.Option value={"Ажлын хариуцлага алдсан"}>
                    Ажлын хариуцлага алдсан
                  </Select.Option>
                  <Select.Option value={"Бусад"}>Бусад</Select.Option>
                </Select>
              </div>
            </td>
            <td></td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }}>
                <Input
                  size="small" //OnPressEnter bolgoj bolno
                  value={ctxmaincrime.state.s_rsn}
                  style={{ margin: "0px", padding: "0px" }}
                  onChange={(event) =>
                    ctxmaincrime.changeStateValue("s_rsn", event.target.value)
                  }
                  onPressEnter={() => ctxmaincrime.filterData()}
                />
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }}>
                <Input
                  size="small" //OnPressEnter bolgoj bolno
                  value={ctxmaincrime.state.s_cnclsn}
                  style={{ margin: "0px", padding: "0px" }}
                  onChange={(event) =>
                    ctxmaincrime.changeStateValue(
                      "s_cnclsn",
                      event.target.value
                    )
                  }
                  onPressEnter={() => ctxmaincrime.filterData()}
                />
              </div>
            </td>
            <td></td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }}>
                <Select
                  size="small"
                  style={{ width: "110px" }}
                  defaultValue={ctxmaincrime.state.s_rslvd_id}
                  onSelect={(value, event) => {
                    ctxmaincrime.filterDataDown(
                      "rslvd_id",
                      "s_rslvd_id",
                      value
                    );
                  }}
                >
                  <Select.Option value={null}>Бүгд</Select.Option>
                  <Select.Option value={"хорих ял авсан"}>
                    Хорих ял авсан
                  </Select.Option>
                  <Select.Option value={"Захиргааны хариуцлага хүлээсэн"}>
                    Захиргааны хариуцлага хүлээсэн
                  </Select.Option>
                  <Select.Option value={"Төлбөр төлсөн"}>
                    Төлбөр төлсөн
                  </Select.Option>
                  <Select.Option value={"Цалингийн хувиар шийтгэсэн"}>
                    Цалингийн хувиар шийтгэсэн
                  </Select.Option>
                  <Select.Option value={"Албан тушаал бууруулсан"}>
                    Албан тушаал бууруулсан
                  </Select.Option>
                  <Select.Option value={"Цэргийн албанаас халсан"}>
                    Цэргийн албанаас халсан
                  </Select.Option>
                  <Select.Option value={"Эрүүгийн хариуцлага хүлээсэн"}>
                    Эрүүгийн хариуцлага хүлээсэн
                  </Select.Option>
                  <Select.Option value={"Албан тушаалдаа дүүрэн тэнцэхгүй"}>
                    Албан тушаалдаа дүүрэн тэнцэхгүй
                  </Select.Option>
                </Select>
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }}>
                <Input
                  size="small" //OnPressEnter bolgoj bolno
                  value={ctxmaincrime.state.s_rslvd_d}
                  style={{ margin: "0px", padding: "0px" }}
                  onChange={(event) =>
                    ctxmaincrime.changeStateValue(
                      "s_rslvd_d",
                      event.target.value
                    )
                  }
                  onPressEnter={() => ctxmaincrime.filterData()}
                />
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "140px", width: "140px" }}>
                <Input
                  size="small" //OnPressEnter bolgoj bolno
                  value={ctxmaincrime.state.s_crtdusr}
                  style={{ margin: "0px", padding: "0px" }}
                  onChange={(event) =>
                    ctxmaincrime.changeStateValue(
                      "s_crtdusr",
                      event.target.value
                    )
                  }
                  onPressEnter={() => ctxmaincrime.filterData()}
                />
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "140px", width: "140px" }}></div>
            </td>
          </tr>
        </thead>
        <tbody>
          {ctxmaincrime.state.datalist?.map((el) => (
            <Dropdown overlay={menu(el)} trigger={["contextMenu"]}>
              <tr>
                <td></td>
                <td onClick={() => onClickRow(el.person_list)}>{el.sqd_id}</td>
                <td onClick={() => onClickRow(el.person_list)}>
                  {el.sqd_sub_cat}
                </td>

                <td onClick={() => onClickRow(el.person_list)}>
                  <MyEllipsis row={2}> {el.sqd_sub_nme}</MyEllipsis>
                </td>
                <td onClick={() => onClickRow(el.person_list)}>
                  {el.crm_date}
                </td>
                <td onClick={() => onClickRow(el.person_list)}>{el.crm_cat}</td>
                <td
                  onClick={() => onClickRow(el.person_list)}
                  style={{
                    width: "200px",
                    maxWidth: "200px",
                  }}
                >
                  <Paragraph
                    ellipsis={{
                      rows: 1,
                    }}
                    style={{ marginBottom: 0 }}
                    title={el.crm_type}
                  >
                    {el.crm_type}
                  </Paragraph>
                </td>
                <td>
                  {el.uploadfiles != null &&
                    el.uploadfiles?.map((el) => (
                      <DownloadFile
                        filename={el.name}
                        bucket={el.bucket}
                        filetype={el.type}
                      />
                    ))}
                </td>
                <td onClick={() => onClickRow(el.person_list)}>
                  <MyEllipsis row={2}>{el.rsn}</MyEllipsis>
                </td>
                <td onClick={() => onClickRow(el.person_list)}>
                  <MyEllipsis row={2}>{el.cnclsn}</MyEllipsis>
                </td>
                <td onClick={() => onClickRow(el.person_list)}>
                  {el.person_list.length}
                </td>
                <td
                  onClick={() => onClickRow(el.person_list)}
                  style={{
                    width: "200px",
                    maxWidth: "200px",
                  }}
                >
                  <Paragraph
                    ellipsis={{
                      rows: 2,
                    }}
                    style={{ marginBottom: 0 }}
                    title={el.rslvd_id}
                  >
                    {el.rslvd_id}
                  </Paragraph>
                </td>
                <td onClick={() => onClickRow(el.person_list)}>
                  <MyEllipsis row={2}>{el.rslvd_d}</MyEllipsis>
                </td>
                <td onClick={() => onClickRow(el.person_list)}>
                  {el.rslvd_date}
                </td>

                <td onClick={() => onClickRow(el.person_list)}>
                  <MyEllipsis row={2}>{el.crtdusr}</MyEllipsis>
                </td>
                <td onClick={() => onClickRow(el.person_list)}>{el.crtddt}</td>

                <td></td>
              </tr>
            </Dropdown>
          ))}
        </tbody>
      </table>
    </div>
  );
}
