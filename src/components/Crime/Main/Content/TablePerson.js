import React, { useContext } from "react";
import { Image } from "antd";
import myUtil from "../../../../util/myUtil";
import "./Person.css";
import CrimeMainContext from "../crimeMainContext";
import {
  Modal,
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

export default function TablePerson() {
  const ctxmaincrime = useContext(CrimeMainContext);
  return (
    <div className="footer">
      <h5>Холбогдогчийн мэдээлэл</h5>
      <div style={{ overflowY: "auto", overflowX: "auto", height: "230px" }}>
        <table>
          <thead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "#e8e9ee",
            }}
          >
            <tr>
              <td style={{ border: "1px solid gray" }}>Зураг</td>
              <td style={{ border: "1px solid gray" }}>Анги</td>
              <td style={{ border: "1px solid gray" }}>Байршил</td>
              <td style={{ border: "1px solid gray" }}>Албан тушаал</td>
              <td style={{ border: "1px solid gray" }}>Цол</td>
              <td style={{ border: "1px solid gray" }}>Овог</td>
              <td style={{ border: "1px solid gray" }}>Нэр</td>
              <td style={{ border: "1px solid gray" }}>Регистер </td>
              <td style={{ border: "1px solid gray" }}>БКД</td>
              <td style={{ border: "1px solid gray" }}>Холбогдсон огноо </td>
              <td style={{ border: "1px solid gray" }}>Нас</td>
              <td style={{ border: "1px solid gray" }}>Хүйс</td>

              <td style={{ border: "1px solid gray" }}>
                Цэрэгт татагдсан анги, он, ээлж
              </td>
              <td style={{ border: "1px solid gray" }}>Тангараг өргөсөн</td>
              <td style={{ border: "1px solid gray" }}>Боловсрол</td>
              <td style={{ border: "1px solid gray" }}></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <div style={{ maxWidth: "100px" }}>
                  <Input
                    size="small" //OnPressEnter bolgoj bolno
                    value={ctxmaincrime.state.sp_rnk_id}
                    style={{ margin: "0px", padding: "0px" }}
                    onChange={(event) =>
                      ctxmaincrime.changeStateValue(
                        "sp_rnk_id",
                        event.target.value
                      )
                    }
                    onPressEnter={() => ctxmaincrime.filterData()}
                  />
                </div>
              </td>
              <td>
                <div style={{ maxWidth: "100px" }}>
                  <Input
                    size="small" //OnPressEnter bolgoj bolno
                    value={ctxmaincrime.state.sp_lst_nme}
                    style={{ margin: "0px", padding: "0px" }}
                    onChange={(event) =>
                      ctxmaincrime.changeStateValue(
                        "sp_lst_nme",
                        event.target.value
                      )
                    }
                    onPressEnter={() => ctxmaincrime.filterData()}
                  />
                </div>
              </td>
              <td>
                <div style={{ maxWidth: "100px" }}>
                  <Input
                    size="small" //OnPressEnter bolgoj bolno
                    value={ctxmaincrime.state.sp_fst_nme}
                    style={{ margin: "0px", padding: "0px" }}
                    onChange={(event) =>
                      ctxmaincrime.changeStateValue(
                        "sp_fst_nme",
                        event.target.value
                      )
                    }
                    onPressEnter={() => ctxmaincrime.filterData()}
                  />
                </div>
              </td>
              <td>
                <div style={{ maxWidth: "100px" }}>
                  <Input
                    size="small" //OnPressEnter bolgoj bolno
                    value={ctxmaincrime.state.sp_reg}
                    style={{ margin: "0px", padding: "0px" }}
                    onChange={(event) =>
                      ctxmaincrime.changeStateValue(
                        "sp_reg",
                        event.target.value
                      )
                    }
                    onPressEnter={() => ctxmaincrime.filterData()}
                  />
                </div>
              </td>
              <td>
                <div style={{ maxWidth: "100px" }}>
                  <Input
                    size="small" //OnPressEnter bolgoj bolno
                    value={ctxmaincrime.state.sp_bkd_nc}
                    style={{ margin: "0px", padding: "0px" }}
                    onChange={(event) =>
                      ctxmaincrime.changeStateValue(
                        "sp_bkd_nc",
                        event.target.value
                      )
                    }
                    onPressEnter={() => ctxmaincrime.filterData()}
                  />
                </div>
              </td>
              <td></td>
              <td>
                <div style={{ maxWidth: "100px" }}>
                  <Input
                    size="small" //OnPressEnter bolgoj bolno
                    value={ctxmaincrime.state.sp_age}
                    style={{ margin: "0px", padding: "0px" }}
                    onChange={(event) =>
                      ctxmaincrime.changeStateValue(
                        "sp_age",
                        event.target.value
                      )
                    }
                    onPressEnter={() => ctxmaincrime.filterData()}
                  />
                </div>{" "}
              </td>
              <td>
                <div style={{ maxWidth: "115px" }}>
                  <Select
                    size="small"
                    style={{ width: "110px" }}
                    defaultValue={ctxmaincrime.state.sp_sex}
                    onSelect={(value, event) => {
                      ctxmaincrime.filterDataDown("sp_sex", "sp_sex", value);
                    }}
                  >
                    <Select.Option key={100} value={null}></Select.Option>
                    <Select.Option key={0} value={"Эрэгтэй"}>
                      Эрэгтэй
                    </Select.Option>
                    <Select.Option key={1} value={"Эмэгтэй"}>
                      Эмэгтэй
                    </Select.Option>
                  </Select>
                </div>
              </td>
              <td> </td>
              <td> </td>
              <td>
                <div style={{ maxWidth: "115px" }}>
                  <Select
                    size="small"
                    style={{ width: "110px" }}
                    defaultValue={ctxmaincrime.state.sp_edu_id}
                    onSelect={(value, event) => {
                      ctxmaincrime.filterDataDown(
                        "sp_edu_id",
                        "sp_edu_id",
                        value
                      );
                    }}
                  >
                    <Select.Option key={100} value={null}></Select.Option>
                    <Select.Option key={0} value={"Боловсролгүй"}>
                      Боловсролгүй
                    </Select.Option>
                    <Select.Option key={1} value={"Бага"}>
                      Бага
                    </Select.Option>
                    <Select.Option key={2} value={"Бүрэн бус дунд"}>
                      Бүрэн бус дунд
                    </Select.Option>
                    <Select.Option key={3} value={"Бүрэн дунд"}>
                      Бүрэн дунд
                    </Select.Option>
                    <Select.Option key={4} value={"Дээд"}>
                      Дээд
                    </Select.Option>
                  </Select>
                </div>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {ctxmaincrime.state.selectedperson.map((el) => (
              <tr>
                <td>
                  {el.pht != null && (
                    <Image
                      width={40}
                      src={`${myUtil.apicdnserver}/image/${el.pht}`}
                    />
                  )}
                </td>
                <td>{el.sqd}</td>
                <td>{el.sqd_sub}</td>
                <td>{el.pstn}</td>
                <td>{el.rnk_id}</td>
                <td>{el.lst_nme}</td>
                <td>{el.fst_nme}</td>
                <td>{el.reg}</td>
                <td>{el.bkd_nc}</td>
                <td>{el.cnn_date}</td>
                <td>{el.age}</td>
                <td>{el.sex}</td>
                <td>
                  {el.tstsqd}, {el.tstdt},{el.tsteelj}
                </td>
                <td> {el.tudt}</td>
                <td> {el.edu_id}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
