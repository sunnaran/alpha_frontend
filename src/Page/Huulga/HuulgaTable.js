import { Table, Input, Select } from "antd";
import React from "react";
import "./tableclass.css";
import { useContext } from "react";
import HuulgaContext from "./HuulgaContext";
import MyCurrency from "../../Function/MyCurrency";

export default function HuulgaTable() {
  const ctx = useContext(HuulgaContext);
  const changeNegj = (value) => {
    ctx.filterData(null, "negj", value);
  };
  const changeTuluw = (value) => {
    ctx.filterData(null, "tuluw", value);
  };
  let id = 1;
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
                value={ctx.state.baraaner}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("baraaner", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
              placeholder="цэг даслал (,) ашиглахгүй"
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
              placeholder="цэг даслал (,) ашиглахгүй"
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
              placeholder="цэг даслал (,) ашиглахгүй"
                value={ctx.state.niitune}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("niitune", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.ajiltan}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("ajiltan", event.target.value)
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
                onChange={changeNegj}
                defaultValue={ctx.state.negj}
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: null,
                    label: "Бүгд",
                  },
                  {
                    value: "Баар",
                    label: "Баар",
                  },
                  {
                    value: "Пааб",
                    label: "Пааб",
                  },
                ]}
              />
            </td>
            <td>
              <Input
                value={ctx.state.shiree}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("shiree", event.target.value)
                }
                onPressEnter={() => {
                  ctx.changeStateValue("filter", true);
                  ctx.filterData();
                }}
              />
            </td>
            <td>
              <Input
                value={ctx.state.utga}
                style={{ margin: "0px", padding: "0px" }}
                onChange={(event) =>
                  ctx.changeStateValue("utga", event.target.value)
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
                onChange={changeTuluw}
                defaultValue={ctx.state.tuluw}
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: null,
                    label: "Бүгд",
                  },
                  {
                    value: "Зарсан",
                    label: "Зарсан",
                  },
                  {
                    value: "Таталт",
                    label: "Таталт",
                  },
                ]}
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
              <tr
              style={{ backgroundColor: id % 2 == 0 ? "#E6F4FF" : "white" }}
              key={id++}
            >
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
