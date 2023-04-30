import React, { useEffect, useState, useContext, useRef } from "react";
import MyHeader from "../../components/constcomponents/MyHeader";
import {
  Row,
  Col,
  InputNumber,
  Button,
  Alert,
  Modal,
  message,
  Spin,
} from "antd";
import PosContext from "../Pos/PosContext";
import { Input } from "antd";
import axios from "../../util/myAxios";
const { TextArea } = Input;

const initialState = {
  totalprice: 0,
  totalpieces: 0,
  orlogo: [],
};

export default function OrlogoGrid() {
  const [state, setState] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [utga, setUtga] = useState("");
  const [loading, setLoading] = useState(false);
  const ctx = useContext(PosContext);

  useEffect(() => {
    ctx.getBaraa();
  }, []);
  const [keyboard, setKeyboard] = useState(true);

  const saveOrlog = () => {
    setLoading(true);
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const messagecode = 126001;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: messagecode,
      },
    };
    const data = {
      token,

      orlogo: state.orlogo,
      tooshirheg: getSum(),
      totalprice: getTotalPrice(),
      utga,
    };
    changeStateValue("loading", true);
    axios
      .post("/public/request", data, configload)
      .then((response) => {
        console.log("success: ", messagecode);
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(`Хадгалж чадсангүй` + response.data.message);
          return;
        }
        if (response.data.code == 400) {
          message.warning(`Хадгалж чадсангүй` + response.data.message);
        }
        if (response.data.code == 200) {
          message.info(response.data.message);
          setOpen(false);
        }
        setState((state) => ({
          ...state,
          loading: false,
        }));
      })
      .catch((error) => {
        changeStateValue("loading", false);
        message.info("Алдаа гарлаа. code:", messagecode, error.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  const ctxChangedOrlogo = (productID, too) => {
    let neworlogo = [];
    state.orlogo
      .filter((el) => el.productID != productID)
      ?.map((el1) => neworlogo.push(el1));
    neworlogo.push({
      productID,
      productName: ctx.state.baraanuud.find((el1) => el1.id == productID)?.nme,
      une:
        state.orlogo.find((el) => el.productID == productID)?.une == null
          ? ctx.state.baraanuud.find((el1) => el1.id == productID)?.une
          : state.orlogo.find((el) => el.productID == productID).une,
      too,
    });
    changeStateValue("orlogo", neworlogo);
  };
  const ctxChangedOrlogoune = (productID, une) => {
    let neworlogo = [];
    state.orlogo
      .filter((el) => el.productID != productID)
      ?.map((el1) => neworlogo.push(el1));
    neworlogo.push({
      productID,
      productName: ctx.state.baraanuud.find((el1) => el1.id == productID)?.nme,
      too:
        state.orlogo.find((el) => el.productID == productID)?.too == null
          ? 0
          : state.orlogo.find((el) => el.productID == productID).too,
      une,
    });
    changeStateValue("orlogo", neworlogo);
  };
  const getSum = () => {
    let sum = 0;
    state.orlogo?.map((el) => (sum += el.too));
    return sum;
  };
  const getTotalPrice = () => {
    let total = 0;
    state.orlogo?.map((el) => (total += el.une * el.too));
    return total;
  };

  return (
    <div>
      <MyHeader />
      <div>
        <div>
          <Alert
            message={
              state.orlogo.length + ` нэр төрлийн ` + getSum() + ` ширхэг `
            }
            type="success"
          />
          <Alert message={`Нийт үнэ: ` + getTotalPrice()} type="success" />
          <Spin spinning={loading}>
            {" "}
            <Button type="primary" onClick={() => setOpen(true)}>
              Орлого хадгалах
            </Button>
          </Spin>
        </div>
        <div
          style={{
            height: "calc(100vh - 180px)",
            overflow: "scroll",
          }}
        >
          <table>
            <tr>
              <td>Бараа</td>
              <td>Үнэ</td>
              <td>Тоо ширхэг</td>
            </tr>
            {ctx.state.baraanuud?.map((el, index) => (
              <tr
                key={el.id}
                style={{ background: index % 2 == 0 && "#e6f4ff" }}
              >
                <td>{el.nme}</td>
                <td>
                  <InputNumber
                    style={{ width: "110px" }}
                    defaultValue={el.une}
                    min={0}
                    onChange={(value) => ctxChangedOrlogoune(el.id, value)}
                    formatter={(value) =>
                      `₮ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\₮\s?|(,*)/g, "")}
                  />
                </td>
                <td>
                  <InputNumber
                    min={0}
                    style={{ background: "#F6FFED" }}                  
                    onChange={(value) => ctxChangedOrlogo(el.id, value)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>

      <Modal
        title="Орлогын утгыг оруулж баталгаажуулна уу"
        centered
        open={open}
        onOk={() => saveOrlog()}
        okText="Баталгаажуулах"
        onCancel={() => setOpen(false)}
        cancelText="Хаах"
        minWidth={250}
        confirmLoading={loading}
      >
        <TextArea
          rows={2}
          placeholder="Орлого"
          defaultValue={"Орлого"}
          onChange={(event) => setUtga(event.target.value)}
        />
      </Modal>
    </div>
  );
}
