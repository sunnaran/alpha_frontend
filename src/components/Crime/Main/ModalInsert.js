import React, { useContext, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  DatePicker,
  Typography,
  Input,
  TimePicker,
  Select,
  Cascader,
  InputNumber,
  Row,
  Col,
  Radio,
  Upload,
  message,
  List,
  Alert,
  Spin,
  Image,
} from "antd";

import {
  SmileOutlined,
  UserOutlined,
  UserDeleteOutlined,
  UploadOutlined,
  DeleteOutlined,
  LoadingOutlined,
  InboxOutlined,
  FileOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import CrimeMainContext from "./crimeMainContext";
import myUtil from "../../../util/myUtil";
import PersonList from "./PersonList";
import noavatar from "../../../assets/no_avatar.jpg";
import * as myConst from "../../../MyConstant";
const dateFormat = "YYYY/MM/DD";
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;
const { Search } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const onSearch = (value) => console.log(value);
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

export default function ModalInsert() {
  const ctxcrimemain = useContext(CrimeMainContext);
  const { Text, Link, Title } = Typography;
  const [form] = Form.useForm();
  const myrank = [
    "Энгийн",
    "Байлдагч",
    "Ахлах байлдагч",
    "Дэд түрүүч",
    "Түрүүч",
    "Ахлах түрүүч",
    "Дэд ахлагч",
    "Ахлагч",
    "Ахлах ахлагч",
    "Дэслэгч",
    "Ахлах дэслэгч",
    "Ахмад",
    "Хошууч",
    "Дэд хурандаа",
    "Хурандаа",
    "Бригадын генерал",
    "Хошууч генерал",
    "Дэслэгч генерал",
    "Генерал",
  ];
  const props = {
    showUploadList: false,
    name: "file",
    multiple: true,
    action: `${myUtil.apinodeserver}/upload/file `,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        message.success(`Файл хавсаргаж байна`);
      }
      if (status === "done") {
        let uploadedFiles =
          ctxcrimemain.state.uploadedFiles == null
            ? []
            : ctxcrimemain.state.uploadedFiles;
        uploadedFiles.push({
          bucket: "upload",
          name: info.file.response?.result,
          oldname: info.file.name,
          filetype: info.file.type,
          filesize: info.file.size,
          lastModified: info.file.lastModified,
        });

        ctxcrimemain.changeStateValue("uploadedFiles", uploadedFiles);
        message.success(`Амжилттай: ${info.file.name}`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const pictureprops = {
    showUploadList: false,
    name: "file",
    multiple: false,
    action: `${myUtil.apinodeserver}/upload/img `,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        message.warning(`Файл хавсаргаж байна`);
      }
      if (status === "done") {
        ctxcrimemain.changeStateValue("fp_pht", info.file.response?.result);
        message.success(`Амжилттай: ${info.file.name} .`);
      } else if (status === "error") {
        message.error(`${info.file.name} файл серверт илгээж чадсангүй.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Modal
      //   title="Modal 1000px width"
      centered
      visible={ctxcrimemain.state.showinsert}
      closable={false}
      header={false}
      //   footer={null}
      //   onOk={() => setVisible(false)}
      //   onCancel={() => setVisible(false)}
      width={1200}
      footer={[
        ctxcrimemain.state.error && (
          <Text style={{ color: "red" }}>
            {ctxcrimemain.state.errorMessage}
          </Text>
        ),

        <Button
          loading={ctxcrimemain.state.loadingSave}
          key="Submit"
          type="primary"
          onClick={() => ctxcrimemain.saveAndUpdateCrimeMain()}
        >
          Хадгалах
        </Button>,
        <Button
          key="Close"
          onClick={() => ctxcrimemain.changeStateValue("showinsert", false)}
        >
          Хаах
        </Button>,
      ]}
    >
      <Spin spinning={ctxcrimemain.state.loadingSave}>
        {ctxcrimemain.state.isInsert ? (
          <Title type="success" level={4}>
            Гэмт хэрэг, осол, зөрчлийн бүртгэл хийх
          </Title>
        ) : (
          <Title type="warning" level={4}>
            Гэмт хэрэг, осол, зөрчлийн бүртгэл засах
          </Title>
        )}

        <Row gutter={16}>
          <Col span={12}>
            <Form {...formItemLayout} size="small">
              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Анги"
                required
                hasFeedback
                validateStatus={
                  ctxcrimemain.state.f_sqd_id != null ? "success" : "error"
                }
              >
                <Select
                  value={ctxcrimemain.state.f_sqd_id}
                  onSelect={(value, event) =>
                    ctxcrimemain.changeStateValue("f_sqd_id", value)
                  }
                  disabled={
                    sessionStorage.getItem("role") == "scr" ? true : false
                  }
                >
                  {myConst.CONST_SQD?.map((el) => (
                    <Select.Option key={el} value={el}>
                      {el}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Байршил"
                required
                hasFeedback
                validateStatus={
                  ctxcrimemain.state.f_sqd_sub_cat != null ? "success" : "error"
                }
              >
                <Select
                  value={ctxcrimemain.state.f_sqd_sub_cat}
                  onSelect={(value, event) =>
                    ctxcrimemain.changeStateValue("f_sqd_sub_cat", value)
                  }
                >
                  <Select.Option key={0} value={"Ангийн төв"}>
                    Ангийн төв
                  </Select.Option>
                  <Select.Option key={1} value={"Застав"}>
                    Застав
                  </Select.Option>
                  <Select.Option key={2} value={"Боомт"}>
                    Боомт
                  </Select.Option>
                  <Select.Option key={3} value={"Малын суурь"}>
                    Малын суурь
                  </Select.Option>
                  <Select.Option key={4} value={"Хилийн харуул"}>
                    Хилийн харуул
                  </Select.Option>
                  <Select.Option key={5} value={"Бусад"}>
                    Бусад
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Хаана /Дэлгэрэнгүй/"
                hasFeedback
                validateStatus={
                  ctxcrimemain.state.f_sqd_sub_nme != "" ? "success" : "error"
                }
              >
                <TextArea
                  allowClear
                  value={ctxcrimemain.state.f_sqd_sub_nme}
                  onChange={(event) =>
                    ctxcrimemain.changeStateValue(
                      "f_sqd_sub_nme",
                      event.target.value
                    )
                  }
                />
              </Form.Item>
              <hr />
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                hasFeedback
                validateStatus={
                  ctxcrimemain.state.f_crm_date != null &&
                  ctxcrimemain.state.f_crm_cat != null
                    ? "success"
                    : "error"
                }
                name="datebatlagdsan"
                label="Огноо, Ангилал"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <DatePicker
                      style={{ width: "100%" }}
                      allowClear
                      format={dateFormat}
                      value={
                        ctxcrimemain.state.f_crm_date != null
                          ? moment(
                              new Date(
                                ctxcrimemain.state.f_crm_date.split("/")[0],
                                ctxcrimemain.state.f_crm_date.split("/")[1] - 1,
                                ctxcrimemain.state.f_crm_date.split("/")[2]
                              ),
                              dateFormat
                            )
                          : null
                      }
                      onChange={(date, dateString) => {
                        console.log(date, dateString);
                        ctxcrimemain.changeStateValue("f_crm_date", dateString);
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <Select
                      value={ctxcrimemain.state.f_crm_cat}
                      onSelect={(value, event) =>
                        ctxcrimemain.changeStateValue("f_crm_cat", value)
                      }
                    >
                      <Select.Option key={0} value={"Гэмт хэрэг"}>
                        Гэмт хэрэг
                      </Select.Option>
                      <Select.Option key={1} value={"Осол"}>
                        Осол
                      </Select.Option>
                      <Select.Option key={2} value={"Зөрчил"}>
                        Зөрчил
                      </Select.Option>
                    </Select>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Зөрчлийн төрөл"
                required
                hasFeedback
                validateStatus={
                  ctxcrimemain.state.f_crm_type != [] ? "success" : "error"
                }
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder=""
                  value={ctxcrimemain.state.f_crm_type}
                  onChange={(value) => {
                    ctxcrimemain.changeStateValue("f_crm_type", value);
                  }}
                >
                  <Option key={"Сахилгын зөрчил"}>Сахилгын зөрчил</Option>
                  <Option key={"Төсөв санхүүгийн зөрчил"}>
                    Төсөв санхүүгийн зөрчил
                  </Option>
                  <Option key={"Худалдан авах ажиллагааны зөрчил"}>
                    Худалдан авах ажиллагааны зөрчил
                  </Option>
                  <Option key={"Эрүүл ахуйн зөрчил"}>Эрүүл ахуйн зөрчил</Option>
                  <Option key={"Авто техникийн зөрчил"}>
                    Авто техникийн зөрчил
                  </Option>
                  <Option key={"Гэмт хэргийн шинжтэй зөрчил"}>
                    Гэмт хэргийн шинжтэй зөрчил
                  </Option>
                  <Option key={"Ёс зүйн зөрчил"}>Ёс зүйн зөрчил</Option>
                  <Option key={"Үйлдвэрлэлийн осол"}>Үйлдвэрлэлийн осол</Option>
                  <Option key={"Ахуйн осол"}>Ахуйн осол</Option>
                  <Option key={"Зам тээврийн осол"}>Зам тээврийн осол</Option>
                  <Option key={"Зэвсгийн осол"}>Зэвсгийн осол</Option>
                  <Option key={"Хүний амь настай холбоотой осол"}>
                    Хүний амь настай холбоотой осол
                  </Option>
                  <Option key={"Өөрийн бие эрхтэнд гэмтэл учруулсан"}>
                    Өөрийн бие эрхтэнд гэмтэл учруулсан
                  </Option>
                  <Option key={"ХЦАХ-тай зүй бус харьцсан"}>
                    ХЦАХ-тай зүй бус харьцсан
                  </Option>
                  <Option key={"Албаны бэлэн байдал алдагдуулсан"}>
                    Албаны бэлэн байдал алдагдуулсан
                  </Option>
                  <Option key={"Бусдын бие эрхтэнд гэмтэл учруулсан"}>
                    Бусдын бие эрхтэнд гэмтэл учруулсан
                  </Option>
                  <Option key={"Анги байрлалаа орхиж оргосон"}>
                    Анги байрлалаа орхиж оргосон
                  </Option>
                  <Option key={"Ангийн дотоод журам зөрчсөн"}>
                    Ангийн дотоод журам зөрчсөн
                  </Option>
                  <Option key={"Төсөв санхүүгийн зөрчил"}>
                    Төсөв санхүүгийн зөрчил
                  </Option>
                  <Option key={"Архидан согтуурсан"}>Архидан согтуурсан</Option>
                  <Option key={"Ажлын хариуцлага алдсан"}>
                    Ажлын хариуцлага алдсан
                  </Option>
                  <Option key={"Бусад"}>Бусад</Option>
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Шалтгаан"
                hasFeedback
              >
                <TextArea
                  rows={3}
                  allowClear
                  value={ctxcrimemain.state.f_rsn}
                  onChange={(event) =>
                    ctxcrimemain.changeStateValue("f_rsn", event.target.value)
                  }
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Form {...formItemLayout} size="small">
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Дүгнэлт"
                hasFeedback
              >
                <TextArea
                  rows={3}
                  allowClear
                  value={ctxcrimemain.state.f_cnclsn}
                  onChange={(event) =>
                    ctxcrimemain.changeStateValue(
                      "f_cnclsn",
                      event.target.value
                    )
                  }
                />
              </Form.Item>
              <hr />
              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Шийдвэрлэлтийн төрөл"
                required
                hasFeedback
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder=""
                  value={ctxcrimemain.state.f_rslvd_id}
                  onChange={(value) => {
                    ctxcrimemain.changeStateValue("f_rslvd_id", value);
                  }}
                >
                  <Option key={"хорих ял авсан"}>Хорих ял авсан</Option>
                  <Option key={"Захиргааны хариуцлага хүлээсэн"}>
                    Захиргааны хариуцлага хүлээсэн
                  </Option>
                  <Option key={"Төлбөр төлсөн"}>Төлбөр төлсөн</Option>
                  <Option key={"Цалингийн хувиар шийтгэсэн"}>
                    Цалингийн хувиар шийтгэсэн
                  </Option>
                  <Option key={"Албан тушаал бууруулсан"}>
                    Албан тушаал бууруулсан
                  </Option>
                  <Option key={"Цэргийн албанаас халсан"}>
                    Цэргийн албанаас халсан
                  </Option>
                  <Option key={"Эрүүгийн хариуцлага хүлээсэн"}>
                    Эрүүгийн хариуцлага хүлээсэн
                  </Option>
                  <Option key={"Албан тушаалдаа дүүрэн тэнцэхгүй"}>
                    Албан тушаалдаа дүүрэн тэнцэхгүй
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Шийдвэрлэлтийн байдал"
                hasFeedback
              >
                <TextArea
                  rows={3}
                  allowClear
                  value={ctxcrimemain.state.f_rslvd_d}
                  onChange={(event) =>
                    ctxcrimemain.changeStateValue(
                      "f_rslvd_d",
                      event.target.value
                    )
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                hasFeedback
                label="Шийдвэрлэсэн огноо"
              >
                <DatePicker
                  style={{ width: "100%" }}
                  allowClear
                  format={dateFormat}
                  value={
                    ctxcrimemain.state.f_rslvd_date != null
                      ? moment(
                          new Date(
                            ctxcrimemain.state.f_rslvd_date.split("/")[0],
                            ctxcrimemain.state.f_rslvd_date.split("/")[1] - 1,
                            ctxcrimemain.state.f_rslvd_date.split("/")[2]
                          ),
                          dateFormat
                        )
                      : null
                  }
                  onChange={(date, dateString) => {
                    console.log(date, dateString);
                    ctxcrimemain.changeStateValue("f_rslvd_date", dateString);
                  }}
                />
              </Form.Item>
            </Form>

            <Form {...formItemLayout} size="small">
              <hr></hr>
              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Зураг, файл хавсаргах:"
              >
                <Dragger {...props}>
                  <p className="ant-upload-text">
                    Файл сонгох эсвэл чирж оруулна
                  </p>
                </Dragger>
                <table style={{ width: "100%", border: "0px white solid" }}>
                  {ctxcrimemain.state.uploadedFiles != null &&
                    ctxcrimemain.state.uploadedFiles?.map((el, index) => (
                      <tr style={{ border: "0px white solid" }}>
                        <td style={{ border: "0px white solid" }}>
                          <FileOutlined />
                        </td>
                        <td style={{ border: "0px white solid" }}>
                          {el.oldname}
                        </td>
                        <td
                          style={{ border: "0px white solid" }}
                          onClick={() => ctxcrimemain.onDeleteFile(index)}
                        >
                          <DeleteOutlined />
                        </td>
                      </tr>
                    ))}
                </table>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <hr />

        <Row gutter={16}>
          <Col>
            <PersonList />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Title type="warning" level={5} align="center">
              Холбогдогч нэмэх засах хэсэг
            </Title>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form {...formItemLayout} size="small">
              <Form.Item
                style={{ marginBottom: "5px", display: "none" }}
                label="Хүний нөөцөөс дуудах"
              >
                <Search
                  maxLength={10}
                  minLength={6}
                  placeholder="Регистер эсвэл БКД-ээр хайх"
                  onSearch={onSearch}
                  enterButton
                />
              </Form.Item>
              <hr />
              <Form.Item style={{ marginBottom: "5px" }} label="Зураг:">
                <Row gutter={16}>
                  <Col span={12}>
                    {ctxcrimemain.state.fp_pht != null ? (
                      <Image
                        height={90}
                        src={`${myUtil.apicdnserver}/image/${ctxcrimemain.state.fp_pht}`}
                      />
                    ) : (
                      <Image height={90} src={noavatar} />
                    )}
                  </Col>
                  <Col span={12}>
                    <Dragger {...pictureprops}>
                      <p className="ant-upload-text">Зураг сонгох</p>
                      <p className="ant-upload-hint">Чирж болно</p>
                    </Dragger>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Анги, Байршил"
              >
                <Row gutter={0}>
                  <Col span={12}>
                    <Select
                      value={ctxcrimemain.state.fp_sqd}
                      onSelect={(value, event) =>
                        ctxcrimemain.changeStateValue("fp_sqd", value)
                      }
                    >
                      {myConst.CONST_SQD?.map((el) => (
                        <Select.Option key={el} value={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={12}>
                    <Select
                      value={ctxcrimemain.state.fp_sqd_sub}
                      onSelect={(value, event) =>
                        ctxcrimemain.changeStateValue("fp_sqd_sub", value)
                      }
                    >
                      <Select.Option key={0} value={"Ангийн төв"}>
                        Ангийн төв
                      </Select.Option>
                      <Select.Option key={1} value={"Застав"}>
                        Застав
                      </Select.Option>
                      <Select.Option key={2} value={"Боомт"}>
                        Боомт
                      </Select.Option>
                      <Select.Option key={3} value={"Малын суурь"}>
                        Малын суурь
                      </Select.Option>
                      <Select.Option key={4} value={"Хилийн харуул"}>
                        Хилийн харуул
                      </Select.Option>
                      <Select.Option key={5} value={"Бусад"}>
                        Бусад
                      </Select.Option>
                    </Select>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Албан тушаал"
                hasFeedback
                validateStatus={
                  ctxcrimemain.state.fp_pstn != null ? "success" : "error"
                }
              >
                <Input
                  allowClear
                  value={ctxcrimemain.state.fp_pstn}
                  onChange={(event) =>
                    ctxcrimemain.changeStateValue("fp_pstn", event.target.value)
                  }
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Form {...formItemLayout} size="small">
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Цол"
                hasFeedback
                validateStatus={
                  ctxcrimemain.state.fp_rnk_id != null ? "success" : "error"
                }
              >
                <Select
                  value={ctxcrimemain.state.fp_rnk_id}
                  onSelect={(value, event) =>
                    ctxcrimemain.changeStateValue("fp_rnk_id", value)
                  }
                  required={false}
                >
                  {myrank?.map((el) => (
                    <Select.Option key={el} value={el}>
                      {el}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item style={{ marginBottom: "5px" }} label="Регистер">
                <Input
                  allowClear
                  value={ctxcrimemain.state.fp_reg}
                  onChange={(event) =>
                    ctxcrimemain.changeStateValue("fp_reg", event.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Овог, Нэр"
                hasFeedback
                validateStatus={
                  ctxcrimemain.state.fp_lst_nme != null &&
                  ctxcrimemain.state.fp_fst_nme != null
                    ? "success"
                    : "error"
                }
              >
                <Row gutter={0}>
                  <Col span={12}>
                    <Input
                      allowClear
                      placeholder="Овог"
                      value={ctxcrimemain.state.fp_lst_nme}
                      onChange={(event) =>
                        ctxcrimemain.changeStateValue(
                          "fp_lst_nme",
                          event.target.value
                        )
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      required
                      allowClear
                      placeholder="Нэр"
                      value={ctxcrimemain.state.fp_fst_nme}
                      onChange={(event) =>
                        ctxcrimemain.changeStateValue(
                          "fp_fst_nme",
                          event.target.value
                        )
                      }
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                hasFeedback
                validateStatus={
                  ctxcrimemain.state.fp_lst_nme != null &&
                  ctxcrimemain.state.fp_fst_nme != null
                    ? "success"
                    : "error"
                }
                label="Нас, хүйс"
              >
                <Row gutter={0}>
                  <Col span={12}>
                    <InputNumber
                      placeholder="Нас"
                      allowClear
                      value={ctxcrimemain.state.fp_age}
                      onChange={(event) =>
                        ctxcrimemain.changeStateValue("fp_age", event)
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <Select
                      value={ctxcrimemain.state.fp_sex}
                      onSelect={(value, event) =>
                        ctxcrimemain.changeStateValue("fp_sex", value)
                      }
                      required={false}
                    >
                      <Select.Option key={1} value={"Эрэгтэй"}>
                        Эрэгтэй
                      </Select.Option>
                      <Select.Option key={0} value={"Эмэгтэй"}>
                        Эмэгтэй
                      </Select.Option>
                    </Select>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Бүртгэлийн Кодолсон Д..."
              >
                <Row gutter={0}>
                  <Col span={12}>
                    <Input
                      minLength={8}
                      maxLength={8}
                      placeholder="Үл өөрчлөгдөх"
                      allowClear
                      value={ctxcrimemain.state.fp_bkd_nc}
                      onChange={(event) =>
                        ctxcrimemain.changeStateValue(
                          "fp_bkd_nc",
                          event.target.value
                        )
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      placeholder="Өөрчлөгдөх"
                      allowClear
                      value={ctxcrimemain.state.fp_bkd}
                      onChange={(event) =>
                        ctxcrimemain.changeStateValue(
                          "fp_bkd",
                          event.target.value
                        )
                      }
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                name="fp_tstdt"
                label="Цэрэгт татагдсан анги, огноо:"
              >
                <Row gutter={0}>
                  <Col span={6}>
                    <Input
                      placeholder=" "
                      allowClear
                      value={ctxcrimemain.state.fp_tstsqd}
                      onChange={(event) =>
                        ctxcrimemain.changeStateValue(
                          "fp_tstsqd",
                          event.target.value
                        )
                      }
                    />
                  </Col>
                  <Col span={10}>
                    <Input
                      placeholder="19980931, 1998"
                      allowClear
                      value={ctxcrimemain.state.fp_tstdt}
                      onChange={(event) =>
                        ctxcrimemain.changeStateValue(
                          "fp_tstdt",
                          event.target.value
                        )
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Select
                      placeholder="Ээлж"
                      value={ctxcrimemain.state.fp_tsteelj}
                      onSelect={(value, event) =>
                        ctxcrimemain.changeStateValue("fp_tsteelj", value)
                      }
                    >
                      <Select.Option key={0} value={"1-р ээлж"}>
                        1-р ээлж
                      </Select.Option>
                      <Select.Option key={1} value={"2-р ээлж"}>
                        2-р ээлж
                      </Select.Option>
                    </Select>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                name="fp_tstdt"
                label="Тангаргийн огноо, Боловсрол:"
              >
                <Row gutter={0}>
                  <Col span={12}>
                    <Input
                      placeholder="19980931, 1998"
                      allowClear
                      value={ctxcrimemain.state.fp_tudt}
                      onChange={(event) =>
                        ctxcrimemain.changeStateValue(
                          "fp_tudt",
                          event.target.value
                        )
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <Select
                      placeholder="Боловсрол"
                      value={ctxcrimemain.state.fp_edu_id}
                      onSelect={(value, event) =>
                        ctxcrimemain.changeStateValue("fp_edu_id", value)
                      }
                    >
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
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={24} align="center">
            <Button type="primary" onClick={() => ctxcrimemain.pushPerson()}>
              Холбогдогчийн жагсаалтад нэмэх
            </Button>{" "}
            {ctxcrimemain.state.isupdateperson && (
              <Button danger onClick={() => ctxcrimemain.updatePerson()}>
                Холбогдогч засварлах
              </Button>
            )}
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
}
