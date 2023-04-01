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
} from "antd";

import { DeleteOutlined, FileOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import myUtil from "../../../util/myUtil";
import noavatar from "../../../assets/no_avatar.jpg";
import CrimeReportContext from "./CrimeReportContext";
import * as myConst from "../../../MyConstant";
const dateFormat = "YYYY/MM/DD";
const { TextArea } = Input;
const { Dragger } = Upload;
const formItemLayout = {
  layout: "vertical",
};

export default function ModalInsert() {
  const ctx = useContext(CrimeReportContext);
  const { Text, Title } = Typography;

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
        let uploadfiles = ctx.state.uploadfiles;
        uploadfiles.push({
          bucket: "upload",
          name: info.file.response?.result,
          oldname: info.file.name,
          filetype: info.file.type,
          filesize: info.file.size,
          lastModified: info.file.lastModified,
        });

        ctx.changeStateValue("uploadfiles", uploadfiles);
        message.success(`Амжилттай: ${info.file.name}`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
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
        <Button
          key="Close"
          onClick={() => ctx.changeStateValue("showInsert", false)}
        >
          Хаах
        </Button>,
      ]}
    >
      <Spin spinning={ctx.state.loadingSave}>
        {ctx.state.id == null ? (
          <Title type="success" level={4}>
            Хяналт-шинжилгээ, үнэлгээ хийсэн ажлын бүртгэл
          </Title>
        ) : (
          <Title type="warning" level={4}>
            Хяналт-шинжилгээ, үнэлгээ хийсэн ажлын бүртгэл засах
          </Title>
        )}

        <Row gutter={16}>
          <Col span={12}>
            <Form {...formItemLayout} size="small">
              <Row>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Анги"
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
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    required
                    hasFeedback
                    validateStatus={ctx.state.doc != null ? "success" : "error"}
                    name="doc"
                    label="Ажлыг гүйцэтгэсэн огноо"
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      allowClear
                      format={dateFormat}
                      defaultValue={
                        ctx.state.doc != null
                          ? moment(
                              new Date(
                                ctx.state.doc.split("/")[0],
                                ctx.state.doc.split("/")[1] - 1,
                                ctx.state.doc.split("/")[2]
                              ),
                              dateFormat
                            )
                          : null
                      }
                      onChange={(date, dateString) => {
                        ctx.changeStateValue("doc", dateString);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Баримт бичгийн төрөл"
                    required
                    hasFeedback
                    validateStatus={ctx.state.ltp != null ? "success" : "error"}
                  >
                    <Select
                      value={ctx.state.ltp}
                      onSelect={(value, event) =>
                        ctx.changeStateValue("ltp", value)
                      }
                    >
                      {myConst.CONST_LTP.map((el) => (
                        <Select.Option key={el} value={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Хяналт ШҮ-ний төрөл"
                    required
                    hasFeedback
                    validateStatus={ctx.state.mnt != null ? "success" : "error"}
                  >
                    <Select
                      value={ctx.state.mnt}
                      onSelect={(value, event) =>
                        ctx.changeStateValue("mnt", value)
                      }
                    >
                      {myConst.CONST_MNT.map((el) => (
                        <Select.Option key={el} value={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Баримт бичгийн нэр"
                hasFeedback
                validateStatus={ctx.state.lnm != null ? "success" : "error"}
              >
                <TextArea
                  rows={3}
                  allowClear
                  value={ctx.state.lnm}
                  onChange={(event) =>
                    ctx.changeStateValue("lnm", event.target.value)
                  }
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Өгсөн зөвлөмжийн тоо, товч утга"
                hasFeedback
                validateStatus={ctx.state.tip != null ? "success" : "error"}
              >
                <TextArea
                  rows={3}
                  allowClear
                  value={ctx.state.tip}
                  onChange={(event) =>
                    ctx.changeStateValue("tip", event.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="ХШҮ хийсэн албан тушаалтан"
                hasFeedback
                validateStatus={ctx.state.cnt != null ? "success" : "error"}
              >
                <TextArea
                  rows={3}
                  allowClear
                  value={ctx.state.cnt}
                  onChange={(event) =>
                    ctx.changeStateValue("cnt", event.target.value)
                  }
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Form {...formItemLayout} size="small">
              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Танилцсан албан тушаалтан"
                hasFeedback
              >
                <TextArea
                  rows={3}
                  allowClear
                  value={ctx.state.ntr}
                  onChange={(event) =>
                    ctx.changeStateValue("ntr", event.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                style={{
                  marginBottom: "5px",
                }}
                label="Шийдвэрийн хэрэгжилт"
                hasFeedback
              >
                <TextArea
                  placeholder="Хяналт-шинжилгээ үнэлгээний мөрөөр авсан шийдвэрийн хэрэгжилт"
                  rows={3}
                  allowClear
                  value={ctx.state.imp}
                  onChange={(event) =>
                    ctx.changeStateValue("imp", event.target.value)
                  }
                />
              </Form.Item>
            </Form>

            <Form {...formItemLayout} size="small">
              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Материал хавсаргах:"
              >
                <Dragger {...props}>
                  <p className="ant-upload-text">
                    Файл сонгох эсвэл чирж оруулна
                  </p>
                </Dragger>
                <table style={{ width: "100%", border: "0px white solid" }}>
                  {ctx.state.uploadfiles.map((el, index) => (
                    <tr style={{ border: "0px white solid" }}>
                      <td style={{ border: "0px white solid" }}>
                        <FileOutlined />
                      </td>
                      <td style={{ border: "0px white solid" }}>
                        {el.oldname}
                      </td>
                      <td
                        style={{ border: "0px white solid" }}
                        onClick={() => ctx.onDeleteFile(index)}
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
      </Spin>
    </Modal>
  );
}
