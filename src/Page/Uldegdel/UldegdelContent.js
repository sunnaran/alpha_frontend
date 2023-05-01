import { Alert, Button, DatePicker, Space, Spin, message } from "antd";
import React, { useState, useEffect, useContext } from "react";
import axios from "../../util/myAxios";
import MyCurrency from "../../Function/MyCurrency";
const initialValue = {
  loading: false,
  ognoo: "2100-01-01 01:01:01",
  listpage: [],
  list: [],
};
export default function UldegdelContent() {
  const [state, setState] = useState(initialValue);
  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  useEffect(() => {
    loadData();
  }, []);

  const getCount = () =>
  {
    let dun=0;
    state.list?.map((el)=>dun++)
    return dun;
  }
  const getSum = () =>
  {
    let dun=0;
    state.list?.map((el)=>dun+=Number(el.piece))
    return dun;
  }
  const getTotal = () =>
  {
    let dun=0;
    state.list?.map((el)=>dun+=Number(el.piece)*Number(el.price))
    return dun;
  }

  
  const loadData = () => {
    changeStateValue("loading", true);
    let messagecode = 128000;
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: messagecode,
      },
    };
    const data = {
      token,
      ognoo: state.ognoo,
    };

    axios
      .post("/public/request", data, configload)
      .then((response) => {
        console.log("success: ", messagecode);
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(response.data.message);
          return;
        }
        if (response.data.code == 400) {
          message.warning(`Амжилтгүй` + response.data.message);
        }
        if (response.data.code == 200) {
          let start_row = response.data.result?.pagination?.start_row;
          let end_row = response.data.result?.pagination?.end_row;
          let total_row = response.data.result?.pagination?.total_row;
          let total_page = response.data.result?.pagination?.total_page;

          let listpage1 = [];
          for (
            let i = 1;
            i <= response.data.result?.pagination?.total_page;
            i++
          ) {
            listpage1.push(i);
          }

          setState((state) => ({
            ...state,
            list:
              response.data.result.list != null
                ? response.data.result.list
                : [],
            total_row,
            start_row,
            end_row,
            total_page,
            listpage: listpage1,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        message.info("Алдааны код" + messagecode);
      })
      .finally(() => {
        changeStateValue("loading", false);
      });
  };

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    changeStateValue("ognoo", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
    loadData();
  };
  let id = 1;
  return (
    <div
      
    >
      <div style={{ background: "#CEDDFF", height: "48px" }}>
        <Space style={{ height: "100%" }}>
          <div>Огноо</div>
          <Spin spinning={state.loading}>
            <DatePicker onChange={onChange} />
            <Button type="primary" onClick={() => loadData()}>
              Үлдэгдэл харах
            </Button>
          </Spin>
        </Space>
      </div>
      <Space style={{ height: "48px" }}>
      <div> <b><MyCurrency>{getCount()}</MyCurrency></b> нэр төрлийн <b> <MyCurrency>{getSum()}</MyCurrency></b> ширхэг <b><MyCurrency>{getTotal()}</MyCurrency></b>₮ үнийн дүнтэй үлдэгдэл байна.</div>
      </Space>
      <div style={{
        overflowY: "auto",
        overflowX: "auto",
        height: "calc(100vh - 180px)",
      }}>
      <table>
        <tr style={{backgroundColor: "#E8E9EE"}}>
          <td>№</td>
          <td>Бараа, бүтээгдэхүүний нэр</td>
          <td>Үнэ</td>
          <td>Тоо</td>
          <td>Нийт</td>
        </tr>
        {state.list?.map((el) => (
          <tr
            style={{ backgroundColor: id % 2 == 0 ? "#E6F4FF" : "white" }}
            key={el.id}
          >
            <td>{id++}</td>
            <td>{el.name}</td>
            <td>
              <MyCurrency>{el.price}</MyCurrency>
            </td>
            <td>
              <MyCurrency>{el.piece}</MyCurrency>
            </td>
            <td>
              <MyCurrency>{el.piece * el.price}</MyCurrency>
            </td>
          </tr>
        ))}
      </table> </div>
    </div>
  );
}
