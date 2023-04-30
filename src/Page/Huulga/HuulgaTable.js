import { Table, Input } from "antd";
import React from "react";
import "./tableclass.css";
import { useContext } from "react";
import HuulgaContext from "./HuulgaContext";
import MyCurrency from "../../Function/MyCurrency";

export default function HuulgaTable() {
  const ctx = useContext(HuulgaContext);

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
            <td >
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
            <td>
              <div style={{ maxWidth: "100px", width: "100px" }} />
            </td>
          </tr>
          <tr>
              
            <td>Огноо</td>
            <td>Бараа, бүт нэр</td>
            <td>Тоо</td>
            <td>Үнэ</td>
            <td>Нийт үнэ</td>
            <td>Ажилтан</td>
            <td>Нэгж</td>
            <td>Ширээ</td>
            <td>Утга</td>
            <td>Төлөв</td>
          </tr>
          <tr>
            
            <td>
              <Input
                value={ctx.state.ognoo}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("ognoo", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.ngj}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("ngj", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
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
                value={ctx.state.too}
                style={{ margin: "0px", padding: "0px", display: "none" }}
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
                value={ctx.state.rng}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("rng", event.target.value)
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
                style={{ margin: "0px", padding: "0px", display: "none" }}
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
          {ctx.state.list
            ?.sort((a, b) => a.ognoo.localeCompare(b.ognoo))
            ?.slice()
            ?.reverse()
            ?.map((el) => (
              <tr>
                <td>{el.ognoo}</td>
                <td>{el.productname}</td>
                <td>{el.producttoo}</td>
                <td>
                  <div style={{ textAlign: "right" }}>
                    <MyCurrency>{el.productune}</MyCurrency>
                  </div>
                </td>
                <td>
                  <div style={{ textAlign: "right" }}>
                    <MyCurrency>{el.totalprice}</MyCurrency>
                  </div>
                </td>
                <td>{el.username}</td>
                <td>{el.haana}</td>
                <td>{el.shireename}</td>
                <td>{el.utga}</td>
                <td>{el.zarsan}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
