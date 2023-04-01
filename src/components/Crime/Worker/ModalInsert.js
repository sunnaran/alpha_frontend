import React, { useContext, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  DatePicker,
  Typography,
  Input,
  Select,
  Row,
  Col,
  Upload,
  message,
  Spin,
  Image,
  InputNumber,
} from "antd";

import { DeleteOutlined, FileOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import myUtil from "../../../util/myUtil";
import noavatar from "../../../assets/no_avatar.jpg";
import CrimeWorkerContext from "./CrimeWorkerContext";
import * as myConst from "../../../MyConstant";
const dateFormat = "YYYY/MM/DD";
const { TextArea } = Input;
const { Dragger } = Upload;
const formItemLayout = {
  layout: "vertical",
};
export default function ModalInsert() {
  const ctx = useContext(CrimeWorkerContext);
  const { Text, Title } = Typography;
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

  const pictureprops = {
    showUploadList: false,
    name: "file",
    multiple: false,
    // action: `${myUtil.apinodeserver}/upload/img `,
    // onChange(info) {
    //   const { status } = info.file;
    //   if (status !== "uploading") {
    //   }
    //   if (status === "done") {
    //     ctx.changeStateValue("pht", info.file.response?.result);
    //     message.success(`Амжилттай: ${info.file.name} .`);
    //   } else if (status === "error") {
    //     message.error(`${info.file.name} файл серверт илгээж чадсангүй.`);
    //   }
    // },
    // onDrop(e) {
    //   console.log("Dropped files", e.dataTransfer.files);
    // },
    beforeUpload: async (file) => {await getBase64(file, (value) => {    ctx.changeStateValue("pht", value); });         }
  };
  

  return (
    <Modal
      //   title="Modal 1000px width"
      centered
      visible={ctx.state.showInsert}
      closable={false}
      header={false}
      width={800}
      footer={[
        ctx.state.error && (
          <Text style={{ color: "red" }}>{ctx.state.errorMessage}</Text>
        ),

        <Button
          loading={ctx.state.loadingSave}
          key="Submit"
          type="primary"
          onClick={() => ctx.onSaveOrUpdate()}
        >
          Хадгалах
        </Button>,
        <Button key="Close" onClick={() => ctx.closeModal()}>
          Хаах
        </Button>,
      ]}
    >
      <Spin spinning={ctx.state.loadingSave}>
        {ctx.state.id == null ? (
          <Title type="success" level={4}>
            Тоног төхөөрөмж бүртгэх
          </Title>
        ) : (
          <Title type="warning" level={4}>
       Тоног төхөөрөмжийн бүртгэл засварлах
          </Title>
        )}
        <Input value={ctx.state.pht}/>
        <Form {...formItemLayout} size="small">
          <Row gutter={16}>
            <Col span={12}>
              <Row gutter={16}>
                <Col span={8}>
                  {ctx.state.pht != null ? (
                    <Image
                      height={90}
                      src={ctx.state.pht}
                    />
                  ) : (
                    <Image height={90} src={noavatar} />
                  )}
                </Col>
                <Col span={8}>
                  <Dragger {...pictureprops}>
                    <p className="ant-upload-text">Зураг сонгох</p>
                    <p className="ant-upload-hint">Чирж болно</p>
                  </Dragger>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Нэгж"
                    required
                    hasFeedback
                    validateStatus={ctx.state.sqd != null ? "success" : "error"}
                  >
                    <Select
                      disabled={
                        sessionStorage.getItem("role") == "scr" ? true : false
                      }
                      value={ctx.state.sqd}
                      onSelect={(value, event) =>
                        ctx.changeStateValue("sqd", value)
                      }
                    >
                      {myConst.CONST_SQD.map((el) => (
                        <Select.Option key={el} value={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Цол"
                    required
                    hasFeedback
                    validateStatus={ctx.state.rnk != null ? "success" : "error"}
                  >
                    <Select
                      value={ctx.state.rnk}
                      onSelect={(value, event) =>
                        ctx.changeStateValue("rnk", value)
                      }
                    >
                      {myConst.CONST_RANK.map((el) => (
                        <Select.Option key={el} value={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    required
                    hasFeedback
                    validateStatus={ctx.state.bdt != null ? "success" : "error"}
                    label="Төрсөн огноо"
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      allowClear
                      format={dateFormat}
                      defaultValue={
                        ctx.state.bdt != null
                          ? moment(
                              new Date(
                                ctx.state.bdt.split("/")[0],
                                ctx.state.bdt.split("/")[1] - 1,
                                ctx.state.bdt.split("/")[2]
                              ),
                              dateFormat
                            )
                          : null
                      }
                      onChange={(date, dateString) => {
                        ctx.changeStateValue("bdt", dateString);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    required
                    label="Овог"
                    hasFeedback
                    validateStatus={ctx.state.lnm != null ? "success" : "error"}
                  >
                    <Input
                      allowClear
                      value={ctx.state.lnm}
                      onChange={(event) =>
                        ctx.changeStateValue("lnm", event.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    required
                    label="Нэр"
                    hasFeedback
                    validateStatus={ctx.state.fnm != null ? "success" : "error"}
                  >
                    <Input
                      allowClear
                      value={ctx.state.fnm}
                      onChange={(event) =>
                        ctx.changeStateValue("fnm", event.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Албан тушаал"
                hasFeedback
                validateStatus={ctx.state.pst != null ? "success" : "error"}
              >
                <TextArea
                  rows={2}
                  allowClear
                  value={ctx.state.pst}
                  onChange={(event) =>
                    ctx.changeStateValue("pst", event.target.value)
                  }
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Төрсөн газар"
                hasFeedback
                validateStatus={ctx.state.bpl != null ? "success" : "error"}
              >
                <TextArea
                  rows={2}
                  allowClear
                  value={ctx.state.bpl}
                  onChange={(event) =>
                    ctx.changeStateValue("bpl", event.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Боловсрол"
                hasFeedback
                validateStatus={ctx.state.edu != null ? "success" : "error"}
              >
                <TextArea
                  rows={2}
                  allowClear
                  value={ctx.state.edu}
                  onChange={(event) =>
                    ctx.changeStateValue("edu", event.target.value)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Мэргэжил"
                hasFeedback
                validateStatus={ctx.state.occ != null ? "success" : "error"}
              >
                <TextArea
                  rows={2}
                  allowClear
                  value={ctx.state.occ}
                  onChange={(event) =>
                    ctx.changeStateValue("occ", event.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Суралцсан сургууль"
                hasFeedback
                validateStatus={ctx.state.sch != null ? "success" : "error"}
              >
                <TextArea
                  rows={2}
                  allowClear
                  value={ctx.state.sch}
                  onChange={(event) =>
                    ctx.changeStateValue("sch", event.target.value)
                  }
                />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="ХХБ-д ажилласан жил"
                    required
                    hasFeedback
                    validateStatus={ctx.state.yof != null ? "success" : "error"}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      max={100}
                      value={ctx.state.yof}
                      onChange={(value) => ctx.changeStateValue("yof", value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Ажилласан жил"
                    required
                    hasFeedback
                    validateStatus={ctx.state.wex != null ? "success" : "error"}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      max={100}
                      value={ctx.state.wex}
                      onChange={(value) => ctx.changeStateValue("wex", value)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Томилогдсон огноо, тушаал дугаар"
                hasFeedback
                validateStatus={ctx.state.adt != null ? "success" : "error"}
              >
                <TextArea
                  rows={2}
                  allowClear
                  value={ctx.state.adt}
                  onChange={(event) =>
                    ctx.changeStateValue("adt", event.target.value)
                  }
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Ажилтаны төлөв"
                required
                hasFeedback
                validateStatus={ctx.state.hrs != null ? "success" : "error"}
              >
                <Select
                  value={ctx.state.hrs}
                  onSelect={(value, event) =>
                    ctx.changeStateValue("hrs", value)
                  }
                >
                  {myConst.CONST_HR_STATUS.map((el) => (
                    <Select.Option key={el} value={el}>
                      {el}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
}
