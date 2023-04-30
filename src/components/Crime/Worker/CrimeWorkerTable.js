import React, { useContext, useEffect } from "react";
import { Input, Select, Menu, Modal, Dropdown, Image, Space, Button} from "antd";
import DownloadFile from "../../constcomponents/DownloadFile";
import MyEllipsis from "../../constcomponents/MyEllipsis";
import CrimeWorkerContext from "./CrimeWorkerContext";
import myUtil from "../../../util/myUtil";
import * as myConst from "../../../MyConstant"; 
import noavatar from "../../../assets/no_avatar.jpg";

import { EditOutlined, DeleteOutlined , ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;
export default function CrimeWorkerTable() {
  const ctx = useContext(CrimeWorkerContext);
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

  const menu = (el) => (
    <Menu>
      <Menu.Item key="1" onClick={() => ctx.openUpdate(el)}>
        Засах
      </Menu.Item>
      <Menu.Item key="delete-Id-here" onClick={() => showDeleteConfirm(el.id)}>
        Устгах
      </Menu.Item>
    </Menu>
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
          <tr> <td>
              <div style={{ maxWidth: "50px", width: "50px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "50px", width: "50px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "50px", width: "50px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "150px", width: "150px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "150px", width: "150px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "170px", width: "170px" }} />
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
          <tr> <td> </td>
            <td>Зураг</td>
            <td>Нэр</td>
            <td>Үнэ</td>
            <td>Тоо</td>
            <td>Нийт үнэ</td>
            <td>Хариуцагч</td>
            <td>Төлөв</td>
            <td>Бүртгэсэн</td>
            <td>Огноо</td>
          </tr>
          <tr> <td></td>
            <td></td>
            <td>
              <Input
                value={ctx.state.nme}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("nme", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.une}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("une", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.too}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("too", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.nune}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("nune", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.enm}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("enm", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.sts}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("sts", event.target.value)
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
          {ctx.state.dataList?.map((el) => (
            <Dropdown overlay={menu(el)} trigger={["contextMenu"]}>
              <tr>
              <td><Space> <Button  onClick={() => ctx.openUpdate(el)} size="small" shape="circle" icon={<EditOutlined />} /> <Button size="small" onClick={() => showDeleteConfirm(el.id)} shape="circle" icon={<DeleteOutlined />} /></Space></td>
                <td>
                  {el.pht != null ? (
                    <Image
                      height={40}
                      src={el.pht}
                    />
                  ) : (
                    <img height={40} src={noavatar} />
                  )}
                </td>
                <td>
                  <MyEllipsis row={2}>{el.nme}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.une}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.too}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.too*el.une}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.enm}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.sts}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.usr}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.cdt}</MyEllipsis>
                </td> 
              </tr>
            </Dropdown>
          ))}
        </tbody>
      </table>
    </div>
  );
}
