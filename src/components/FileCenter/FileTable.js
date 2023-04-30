import React, { useState, useContext, useEffect } from "react";
import {
  Layout,
  Col,
  Row,
  Space,
  Select,
  Checkbox,
  Text,
  Typography,
  Button,
  Tooltip,
  Input,
  DatePicker,
  Spin,
  Popconfirm,
  message,
  InputNumber,
  Menu,
  Modal,
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

import iconfire from "../../assets/fire.gif";
import FileCenterContext from "../../context/FileCenterContext";
import css from "./filetable.module.css";
import "./mytable.css";
import DownloadFile from "../constcomponents/DownloadFile";
import MyEllipsis from "../constcomponents/MyEllipsis";
export default function FileTable() {
  const initialState = {
    winfo1: "39px",
    wakt: "100px",
    wname: "300px",
    wbatlagdsan: "70px",
    wmurduh: "70px",
    wfile: "60px",
    wactive: "80px",
    wnemsen: "100px",
    wnemsenognoo: "100px",
  };
  const ctxFile = useContext(FileCenterContext);
  const [state, setState] = useState(initialState);
  const { Text, Link } = Typography;
  const { Option } = Select;
  const { confirm } = Modal;
  useEffect(() => {
    ctxFile.loadDataListAll();
  }, []);

  const text = "Устгахдаа итгэлтэй байна уу?";
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Анхааруулга",
      icon: <ExclamationCircleOutlined />,
      content: "Устгахдаа итгэлтэй байна уу!!!",
      okText: "Тийм",
      okType: "danger",
      cancelText: "Үгүй",
      onOk() {
        ctxFile.deleteFileCenter(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const menu = (el) =>
    sessionStorage.getItem("role") == "hcr" ? (
      <Menu>
        <Menu.Item
          key="delete-Id-here"
          onClick={() => ctxFile.openUpdate(el.id)}
        >
          Засах
        </Menu.Item>
        <Menu.Item
          key="delete-Id-here"
          onClick={() => showDeleteConfirm(el.id)}
        >
          Устгах
        </Menu.Item>
      </Menu>
    ) : (
      <Menu></Menu>
    );

  return (
    <table style={{ backgroundColor: "white" }}>
      <thead
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#e8e9ee",
        }}
      >
        <tr>
          <td>
            <div style={{ width: state.winfo1 }}>
              {ctxFile.state.loadingData ? (
                <Spin size="small" />
              ) : (
                <FileOutlined />
              )}
            </div>
          </td>
          <td style={{ width: state.wakt }}>
            <div style={{ width: state.wakt }} title="Дугаар">
              Дугаар
            </div>
          </td>
          <td>
            <div style={{ width: state.wname }} title="Нэр">
              Нэр
            </div>
          </td>
          <td>
            <div style={{ width: state.wbatlagdsan }} title="Батлагдсан">
              Батлагдсан
            </div>
          </td>
          <td>
            <div style={{ width: state.wmurduh }} title="Дагаж мөрдөх огноо">
              Мөрдөх
            </div>
          </td>
          <td>
            <div style={{ width: "10px" }} title="Хавсралт файлын тоо">
              <PaperClipOutlined />
            </div>
          </td>
          <td>
            <div style={{ width: state.wactive }} title="Төлөв">
              Төлөв
            </div>
          </td>
          <td>
            <div style={{ width: state.wnemsen }} title="Нэмсэн хүн">
              Нэмсэн хүн
            </div>
          </td>
          <td>
            <div style={{ width: state.wnemsenognoo }} title="Нэмсэн огноо">
              Нэмсэн огноо
            </div>
          </td>
        </tr>

        <tr>
          <td>
            {(ctxFile.state.s_catid != null ||
              ctxFile.state.s_aktno != null ||
              ctxFile.state.s_name != null ||
              ctxFile.state.s_dateverified != null ||
              ctxFile.state.s_datevalid != null ||
              ctxFile.state.s_isvalid != null ||
              ctxFile.state.s_createduser != null) && (
              <Button
                type="danger"
                size="small"
                onClick={() => ctxFile.cancelFilter()}
              >
                X
              </Button>
            )}
          </td>

          <td>
            <Input //OnPressEnter bolgoj bolno
              placeholder="Акт"
              value={ctxFile.state.s_aktno}
              style={{ margin: "0px", padding: "0px" }}
              onChange={(event) =>
                ctxFile.changeStateFilterValue("s_aktno", event.target.value)
              }
              onPressEnter={() => ctxFile.loadDataList()}
            />
          </td>

          <td>
            <Input //OnPressEnter bolgoj bolno
              placeholder="Нэрээр хайх"
              style={{ margin: "0px", padding: "0px" }}
              onChange={(event) =>
                ctxFile.changeStateFilterValue("s_name", event.target.value)
              }
              onPressEnter={() => ctxFile.loadDataList()}
            />
          </td>

          <td>
            <InputNumber //OnPressEnter bolgoj bolno
              placeholder="он/сар/өдөр"
              style={{ margin: "0px", padding: "0px" }}
              onChange={(value) =>
                ctxFile.changeStateFilterValue("s_dateverified", value)
              }
              controls={false}
              size="small"
              min={0}
              onPressEnter={() => ctxFile.loadDataList()}
            />
          </td>
          <td>
            <InputNumber //OnPressEnter bolgoj bolno
              placeholder="он/сар/өдөр"
              style={{ margin: "0px", padding: "0px" }}
              onChange={(value) =>
                ctxFile.changeStateFilterValue("s_datevalid", value)
              }
              controls={false}
              size="small"
              min={0}
              onPressEnter={() => ctxFile.loadDataList()}
            />
          </td>
          <td></td>
          <td>
            <Input //OnPressEnter bolgoj bolno
              placeholder="Төлөв"
              style={{ margin: "0px", padding: "0px" }}
              onChange={(event) =>
                ctxFile.changeStateFilterValue("s_isvalid", event.target.value)
              }
              onPressEnter={() => ctxFile.loadDataList()}
            />
          </td>
          <td style={{ width: "200px", maxWidth: "200px" }}>
            <Input //OnPressEnter bolgoj bolno
              placeholder="Нэмсэн хүн"
              style={{ margin: "0px", padding: "0px" }}
              onChange={(event) =>
                ctxFile.changeStateFilterValue(
                  "s_createduser",
                  event.target.value
                )
              }
              onPressEnter={() => ctxFile.loadDataList()}
            />
          </td>

          <td></td>
        </tr>
      </thead>
      <tbody>
        {ctxFile.state.mylist != null &&
          ctxFile.state.mylist?.map((el) => (
            <Dropdown overlay={menu(el)} trigger={["contextMenu"]}>
              <tr key={el.id}>
                <td></td>
                <td>{el.aktno}</td>
                <td>
                  <MyEllipsis row={2}>{el.name}</MyEllipsis>
                </td>

                <td>{el.batlagdsanognoo}</td>
                <td>{el.dagajmurduhognoo}</td>
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
                <td>{el.vld}</td>
                <td>
                  <MyEllipsis row={2}>{el.createduser}</MyEllipsis>
                </td>
                <td>{el.createddate}</td>
              </tr>
            </Dropdown>
          ))}
      </tbody>
    </table>
  );
}
