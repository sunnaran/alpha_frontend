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
} from "antd";

import "./Insert.css";
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
import myUtil from "../../../util/myUtil";
import moment from "moment";
import FileCenterContext from "../../../context/FileCenterContext";
const dateFormat = "YYYY/MM/DD";
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
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
  const ctxFile = useContext(FileCenterContext);
  const { Text, Link, Title } = Typography;
  const [form] = Form.useForm();

  const props = {
    showUploadList: false,
    name: "file",
    multiple: true,
    action: `${myUtil.apinodeserver}/upload/file `,
    onChange(info) {
      const { status } = info.file;
      if (status === "uploading") {
        ctxFile.changeStateValue("loadingUploadFile", true);
      }
      if (status === "done") {
        ctxFile.changeStateValue("loadingUploadFile", false);
        let uploadfiles =
          ctxFile.state.uploadfiles == null ? [] : ctxFile.state.uploadfiles;
        uploadfiles.push({
          bucket: "upload",
          name: info.file.response?.result,
          oldname: info.file.name,
          filetype: info.file.type,
          filesize: info.file.size,
          lastModified: info.file.lastModified,
        });

        ctxFile.changeStateValue("uploadfiles", uploadfiles);
        message.success(`Амжилттай: ${info.file.name}`);
      } else if (status === "error") {
        ctxFile.changeStateValue("loadingUploadFile", false);
        message.error("Файл хавсаргаж чадсангүй");
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
      visible={ctxFile.state.showModal}
      closable={false}
      header={false}
      //   footer={null}

      //   onOk={() => setVisible(false)}
      //   onCancel={() => setVisible(false)}
      width={500}
      footer={[
        ctxFile.state.error && (
          <Text style={{ color: "red" }}>{ctxFile.state.errorMessage}</Text>
        ),

        <Button key="Submit" type="primary" onClick={() => ctxFile.saveData()}>
          Хадгалах
        </Button>,
        <Button
          key="Close"
          onClick={() => ctxFile.changeStateValue("showModal", false)}
        >
          Хаах
        </Button>,
      ]}
    >
      <Spin spinning={ctxFile.state.loadingSave}>
        {ctxFile.state.isInsert ? (
          <Title type="success" level={4}>
            Файл нэмэх
          </Title>
        ) : (
          <Title type="warning" level={4}>
            Файл засах
          </Title>
        )}

        <Row gutter={16}>
          <Col span={24}>
            <Form {...formItemLayout} size="small">
              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Ангилал"
                required
                hasFeedback
                validateStatus={
                  ctxFile.state.selectedCategoryId != null ? "success" : "error"
                }
              >
                <Select
                  value={ctxFile.state.selectedCategoryId}
                  onSelect={(value, event) =>
                    ctxFile.changeStateValue("selectedCategoryId", value)
                  }
                >
                  {ctxFile.state.listCategory?.map((el) => (
                    <Select.Option key={el.id} value={el.id}>
                      {el.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Актын дугаар"
                hasFeedback
                validateStatus={ctxFile.state.aktno != "" ? "success" : "error"}
              >
                <Input
                  allowClear
                  defaultValue={ctxFile.state.aktno}
                  onChange={(event) =>
                    ctxFile.changeStateValue("aktno", event.target.value)
                  }
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                label="Нэр"
                hasFeedback
                validateStatus={ctxFile.state.title != "" ? "success" : "error"}
              >
                <TextArea
                  rows={3}
                  allowClear
                  defaultValue={ctxFile.state.title}
                  onChange={(event) =>
                    ctxFile.changeStateValue("title", event.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                validateStatus={
                  ctxFile.state.datebatlagdsan != null ? "success" : "error"
                }
                label="Батлагдсан огноо"
              >
                <DatePicker
                  value={
                    ctxFile.state.datebatlagdsan != null
                      ? moment(
                          new Date(
                            ctxFile.state.datebatlagdsan.split("/")[0],
                            ctxFile.state.datebatlagdsan.split("/")[1] - 1,
                            ctxFile.state.datebatlagdsan.split("/")[2]
                          ),
                          dateFormat
                        )
                      : null
                  }
                  style={{ width: "100%" }}
                  allowClear
                  format={dateFormat}
                  onChange={(date, dateString) => {
                    console.log(date, dateString);
                    ctxFile.changeStateValue("datebatlagdsan", dateString);
                  }}
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "5px" }}
                required
                validateStatus={
                  ctxFile.state.datedagajmurduh != null ? "success" : "error"
                }
                label="Дагаж мөрдөх огноо"
              >
                <DatePicker
                  value={
                    ctxFile.state.datedagajmurduh != null
                      ? moment(
                          new Date(
                            ctxFile.state.datedagajmurduh.split("/")[0],
                            ctxFile.state.datedagajmurduh.split("/")[1] - 1,
                            ctxFile.state.datedagajmurduh.split("/")[2]
                          ),
                          dateFormat
                        )
                      : null
                  }
                  style={{ width: "100%" }}
                  allowClear
                  format={dateFormat}
                  onChange={(date, dateString) => {
                    console.log(date, dateString);
                    ctxFile.changeStateValue("datedagajmurduh", dateString);
                  }}
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                label="Хүчинтэй эсэх"
                required
                hasFeedback
                validateStatus={
                  ctxFile.state.isvalid != null ? "success" : "error"
                }
              >
                <Select
                  value={ctxFile.state.isvalid}
                  onSelect={(value, event) =>
                    ctxFile.changeStateValue("isvalid", value)
                  }
                >
                  <Select.Option key={1} value={"Хүчинтэй"}>
                    Хүчинтэй
                  </Select.Option>
                  <Select.Option key={0} value={"Хүчингүй"}>
                    Хүчингүй
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ marginBottom: "5px" }} label="Файл" required>
                <Dragger {...props}>
                  <p className="ant-upload-text">
                    Файл сонгох эсвэл чирж оруулна
                  </p>
                </Dragger>
                {ctxFile.state.loadingUploadFile && (
                  <Spin tip="Файл илгээж байна" size="small" />
                )}
                <table style={{ width: "100%", border: "0px white solid" }}>
                  {ctxFile.state.uploadfiles != null &&
                    ctxFile.state.uploadfiles?.map((el, index) => (
                      <tr style={{ border: "0px white solid" }}>
                        <td style={{ border: "0px white solid" }}>
                          <FileOutlined />
                        </td>
                        <td style={{ border: "0px white solid" }}>
                          {el.oldname}
                        </td>
                        <td
                          style={{ border: "0px white solid" }}
                          onClick={() => ctxFile.onDeleteFile(index)}
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
