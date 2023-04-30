import React, { useContext, useEffect } from "react";
import { Input, Select, Menu, Modal, Dropdown } from "antd";
import DownloadFile from "../../constcomponents/DownloadFile";
import MyEllipsis from "../../constcomponents/MyEllipsis";
import CrimeReportContext from "./CrimeReportContext";
import * as myConst from "../../../MyConstant";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;
export default function CrimeReportTable() {
  const ctx = useContext(CrimeReportContext);
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
              <div style={{ maxWidth: "50px", width: "50px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "80px", width: "80" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "80px", width: "80px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "150px", width: "150px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "200px", width: "200px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "120px", width: "120px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "120px", width: "120px" }}></div>
            </td>
            <td>
              <div style={{ maxWidth: "70px", width: "70px" }}></div>
            </td>
          </tr>
          <tr>
            <td>Анги</td>
            <td>Гүйцэтгэсэн огноо</td>
            <td>Баримт бичгийн төрөл</td>
            <td>Баримт бичгийн нэр</td>
            <td>ХШҮ-ний төрөл</td>
            <td>Өгсөн зөвлөмжийн тоо, товч утга</td>
            <td>ХШҮ хийсэн албан тушаалтан</td>
            <td>Танилцсан албан тушаалтан</td>
            <td>ХШҮ-ний мөрөөр авсан шийдвэрийн хэрэгжилт</td>
            <td>Материал</td>
            <td>Бүртгэсэн</td>
            <td>Бүртгэсэн огноо</td>
          </tr>
          <tr>
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
                value={ctx.state.doc}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("doc", event.target.value)
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
                value={ctx.state.ltp}
                onSelect={(value, event) => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData("ltp", "ltp", value);
                }}
              >
                <Select.Option key={0} value={null}></Select.Option>
                {myConst.CONST_LTP?.map((el) => (
                  <Select.Option key={el} value={el}>
                    {el}
                  </Select.Option>
                ))}
              </Select>
            </td>
            <td>
              <Input
                value={ctx.state.lnm}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) => {
                  ctx.changeStateValue("filter", true);
                  ctx.changeStateValue("lnm", event.target.value);
                }}
                onPressEnter={() => ctx.filterData()}
              />
            </td>
            <td>
              <Select
                size="small"
                style={{ width: "110px" }}
                value={ctx.state.mnt}
                onSelect={(value, event) => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData("mnt", "mnt", value);
                }}
              >
                <Select.Option key={0} value={null}></Select.Option>
                {myConst.CONST_MNT?.map((el) => (
                  <Select.Option key={el} value={el}>
                    {el}
                  </Select.Option>
                ))}
              </Select>
            </td>
            <td>
              <Input
                style={{ margin: "0px", padding: "0px" }}
                value={ctx.state.tip}
                onChange={(event) =>
                  ctx.changeStateValue("tip", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.cnt}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("cnt", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.ntr}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("ntr", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.imp}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("imp", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td> </td>
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
                <td>{el.sqd}</td>
                <td>{el.doc}</td>
                <td>
                  <MyEllipsis row={2}>{el.ltp}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.lnm}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.mnt}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.tip}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.cnt}</MyEllipsis>
                </td>

                <td>
                  <MyEllipsis row={2}>{el.ntr}</MyEllipsis>
                </td>
                <td>
                  <MyEllipsis row={2}>{el.imp}</MyEllipsis>
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
                <td>{el.usr}</td>
                <td>{el.cdt}</td>
              </tr>
            </Dropdown>
          ))}
        </tbody>
      </table>
    </div>
  );
}
