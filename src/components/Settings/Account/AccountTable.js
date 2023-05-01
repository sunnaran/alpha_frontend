import React, { useContext, useEffect } from "react";
import { Input, Select, Menu, Modal, Dropdown, Image } from "antd";
import DownloadFile from "../../constcomponents/DownloadFile";
import MyEllipsis from "../../constcomponents/MyEllipsis";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';
import myUtil from "../../../util/myUtil";
import * as myConst from "../../../MyConstant";
import { EditOutlined, DeleteOutlined , ExclamationCircleOutlined } from "@ant-design/icons";
import noavatar from "../../../assets/no_avatar.jpg";
import AccountContext from "./AccountContext";

const { confirm } = Modal;
export default function AccountTable() {
  const ctx = useContext(AccountContext);
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
  let id=1;
  return (
    <div
      style={{
        overflowY: "auto",
        overflowX: "auto", 
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
              <div style={{ maxWidth: "80px", width: "80px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "70px", width: "70px" }} />
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
            </td><td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
            
          </tr>
          <tr>
          <td></td>
            <td style={{display: "none"}}>Зураг</td>
            <td>Нэгж</td>
            <td>Нэмэлт утас</td>
            <td>Овог</td>
            <td>Нэр</td>
            <td>Утас, Нэвтрэх нэр</td>
            <td>Төлөв</td>
            <td>Албан тушаал</td>
            <td>Бүртгэсэн</td>
            <td>Бүртгэгдсэн</td>
          </tr>
          <tr style={{display: "none"}}>
          <td style={{display: "none"}}> </td>
            <td>
              <Input
                value={ctx.state.s_sqd}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("s_sqd", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.s_rnk}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("s_rnk", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.s_lnm}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("s_lnm", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.s_fnm}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("s_fnm", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.s_unm}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("s_unm", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Select
                size="small"
                style={{ width: "110px" }}
                value={ctx.state.s_sts}
                onSelect={(value, event) => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData("sts", "s_sts", value);
                }}
              >
                <Select.Option key={0} value={null}></Select.Option>
                <Select.Option key={1} value={"act"}>
                  Идэвхтэй
                </Select.Option>
                <Select.Option key={2} value={"ina"}>
                  Идэвхгүй
                </Select.Option>
              </Select>
            </td>
            <td>
              <Select
                size="small"
                style={{ width: "110px" }}
                value={ctx.state.s_rle}
                onSelect={(value, event) => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData("rle", "s_rle", value);
                }}
              >
                <Select.Option key={0} value={null}></Select.Option>
                <Select.Option key={1} value={"hcr"}>
                  Бүх анги
                </Select.Option>
                <Select.Option key={2} value={"scr"}>
                  Өөрийн анги
                </Select.Option>
              </Select>
            </td>
            <td>
              <Input
                value={ctx.state.s_usr}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("s_usr", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.s_cdt}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("s_cdt", event.target.value)
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
             <tr
            style={{ backgroundColor: id % 2 == 0 ? "#E6F4FF" : "white" }}
            key={id++}
          >
                <td><Space> <Button  onClick={() => ctx.openUpdate(el)} shape="circle" size="small" icon={<EditOutlined />} /> <Button size="small" onClick={() => showDeleteConfirm(el.id)} shape="circle" icon={<DeleteOutlined />} /></Space></td>
              <td style={{display: "none"}}>
                  {el.pht != null ? (
                    <Image
                      height={40}
                      src={`${myUtil.apicdnserver}/image/${el.pht}`}
                    />
                  ) : (
                    <img height={40} src={noavatar} />
                  )}
                </td>
                <td>
                  <MyEllipsis row={2}>{el.sqd}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.rnk}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.lnm}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.fnm}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.unm}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>
                    {el.sts == "act" && "Ажилтан"}
                    {el.sts == "ina" && "Халагдсан"}
                  </MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>
                    {el.rle == "hcr" && "Захирал"}
                    {el.rle == "nrv" && "Нярав"}
                    {el.rle == "scr" && "Ажилтан"}
                  </MyEllipsis>
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
