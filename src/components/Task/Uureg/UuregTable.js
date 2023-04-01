import React, { useContext, useEffect } from "react";
import { Input, Select, Menu, Modal, Dropdown, Image } from "antd";
import DownloadFile from "../../constcomponents/DownloadFile";
import MyEllipsis from "../../constcomponents/MyEllipsis";
import myUtil from "../../../util/myUtil";
import * as myConst from "../../../MyConstant";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import noavatar from "../../../assets/no_avatar.jpg";
import UuregContext from "./UuregContext";
import { Link } from "react-router-dom";

const { confirm } = Modal;
export default function UuregTable() {
  const ctx = useContext(UuregContext);
  useEffect(() => {
    ctx.loadAllData();
  }, []);

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Анхааруулга",
      icon: <ExclamationCircleOutlined />,
      content: "Устгахдаа итгэлтэй байна уу!!!",
      okText: "Тийм",
      okType: "danger",
      cancelText: "Үгүй",
      onOk() {
        ctx.deleteData(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const menu = (el) =>
    sessionStorage.getItem("role") == "hcr" ? (
      <Menu>
        <Menu.Item key="1" onClick={() => ctx.openUpdate(el)}>
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
    <div
      style={{
        overflowY: "auto",
        overflowX: "auto",
        height: "calc(100vh - 140px)",
      }}
    >
      <table>
        <thead
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "#e8e9ee",
            paddingRight: "20px",
          }}
        >
          <tr>
            <td>
              <div style={{ maxWidth: "300px", width: "300px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "130px", width: "130px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "130px", width: "130px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
          </tr>
          <tr>
            <td>Үүрэг</td>
            <td>Хэнээс</td>
            <td>Хэнд</td>
            <td>Эхлэх</td>
            <td>Дуусах</td>
            <td>Файл</td>
            <td>Анги</td>
            <td>Хэрэглэгч</td>
            <td>Огноо</td>
          </tr>
          <tr>
            <td>
              <Input
                value={ctx.state.tsk}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("tsk", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.frm}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("frm", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.top}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("top", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.bdt}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("bdt", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.edt}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("edt", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td></td>
            <td>
              <Input
                value={ctx.state.lst}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("lst", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.usr}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("usr", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.cdt}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("cdt", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {ctx.state.dataList.map((el) => (
            <Dropdown overlay={menu(el)} trigger={["contextMenu"]}>
              <tr>
                <td>
                  <Link to={`/task/${el.id}`}>
                    <MyEllipsis row={2}>{el.tsk}</MyEllipsis>
                  </Link>
                </td>
                <td>
                  <Link to={`/task/${el.id}`}>
                    <MyEllipsis row={2}>{el.frm}</MyEllipsis>
                  </Link>
                </td>
                <td>
                  <Link to={`/task/${el.id}`}>
                    <MyEllipsis row={2}>{el.top}</MyEllipsis>
                  </Link>
                </td>
                <td>
                  <Link to={`/task/${el.id}`}>
                    <MyEllipsis row={2}>{el.bdt}</MyEllipsis>
                  </Link>
                </td>
                <td>
                  <Link to={`/task/${el.id}`}>
                    <MyEllipsis row={2}>{el.edt}</MyEllipsis>
                  </Link>
                </td>
                <td>
                  {el.uploadfiles != null &&
                    el.uploadfiles.map((el) => (
                      <DownloadFile
                        filename={el.name}
                        bucket={el.bucket}
                        filetype={el.type}
                      />
                    ))}
                </td>
                <td>
                  <Link to={`/task/${el.id}`}>
                    <MyEllipsis row={2}>{el.lst}</MyEllipsis>
                  </Link>
                </td>
                <td>
                  <Link to={`/task/${el.id}`}>
                    <MyEllipsis row={2}>{el.usr}</MyEllipsis>
                  </Link>
                </td>
                <td>
                  <Link to={`/task/${el.id}`}>
                    <MyEllipsis row={2}>{el.cdt}</MyEllipsis>
                  </Link>
                </td>
              </tr>
            </Dropdown>
          ))}
        </tbody>
      </table>
    </div>
  );
}
