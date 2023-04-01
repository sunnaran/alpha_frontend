import React, { useContext, useEffect } from "react";
import { Input, Select, Menu, Modal, Dropdown, Image } from "antd";
import DownloadFile from "../../constcomponents/DownloadFile";
import MyEllipsis from "../../constcomponents/MyEllipsis";
import CrimeWorkerContext from "./CrimeWorkerContext";
import myUtil from "../../../util/myUtil";
import * as myConst from "../../../MyConstant";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import noavatar from "../../../assets/no_avatar.jpg";
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
          <tr>
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
              <div style={{ maxWidth: "150px", width: "150px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "150px", width: "150px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }} />
            </td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }} />
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
            <td>Зураг</td>
            <td>Анги</td>
            <td>Цол</td>
            <td>Овог</td>
            <td>Нэр</td>
            <td>Албан тушаал</td>
            <td>Төрсөн огноо</td>
            <td>төрсөн газар</td>
            <td>Боловсрол</td>
            <td>Мэргэжил</td>
            <td>Суралцсан сургууль, төгссөн он</td>
            <td>ХХБ-д ажилласан жил</td>
            <td>Ажилласан жил</td>
            <td>Нөөц</td>
            <td>Томилогдсон огноо, тушаал</td>
            <td>Бүртгэсэн </td>
            <td>Бүртгэсэн огноо</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <Input
                value={ctx.state.sqd}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("sqd", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.rnk}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("rnk", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.lnm}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("lnm", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.fnm}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("fnm", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.pst}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("pst", event.target.value)
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
                value={ctx.state.bpl}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("bpl", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.edu}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("edu", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.occ}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("occ", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.sch}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("sch", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.yof}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("yof", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.wex}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("wex", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.hrs}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("hrs", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.adt}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("adt", event.target.value)
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
                  <MyEllipsis row={2}>{el.pst}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.bdt}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.bpl}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.edu}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.occ}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.sch}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.yof}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.wex}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.hrs}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.adt}</MyEllipsis>
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
