import React, { useContext } from "react";
import {
  Modal,
  Button,
  Typography,
  Spin,
  Form,
  Row,
  Col,
  Input,
  Upload,
  DatePicker,
  Checkbox,
  Divider,
  message,
  Select,
} from "antd";
import { DeleteOutlined, FileOutlined } from "@ant-design/icons";
import UuregContext from "./UuregContext";
import myUtil from "../../../util/myUtil";

const { TextArea } = Input;
const { Dragger } = Upload;
const { Text, Title } = Typography;
const { Option } = Select;
export default function ModalFulfillment() {
  const ctx = useContext(UuregContext);

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
      closable={false}
      visible={ctx.state.showFulfillmentModal}
      footer={[
        ctx.state.error && (
          <Text style={{ color: "red" }}>{ctx.state.errorMessage}</Text>
        ),

        <Button
          loading={ctx.state.loadingSave}
          key="Submit"
          type="primary"
          onClick={() => ctx.onSaveFulfillment()}
        >
          Хадгалах
        </Button>,
        <Button key="Close" onClick={() => ctx.closeFulfillment()}>
          Хаах
        </Button>,
      ]}
    >
      <Form layout="vertical" size="small">
        <Form.Item
          style={{ marginBottom: "5px" }}
          label="Гүйцэтгэл"
          required
          hasFeedback
          validateStatus={ctx.state.guitsetgel != null ? "success" : "error"}
        >
          <Select
            defaultValue={ctx.state.guitsetgel}
            onSelect={(value, event) =>
              ctx.changeStateValue("guitsetgel", value)
            }
          >
            <Select.Option key={0} value={"Бүрэн биелсэн"}>
              Бүрэн биелсэн
            </Select.Option>
            <Select.Option key={1} value={"Хагас биелсэн"}>
              Хагас биелсэн
            </Select.Option>
            <Select.Option key={2} value={"Биелээгүй"}>
              Биелээгүй
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "5px" }}
          required
          label="Тайлбар"
          hasFeedback
          validateStatus={ctx.state.tailbar != null ? "success" : "error"}
        >
          <TextArea
            rows={3}
            allowClear
            value={ctx.state.tailbar}
            onChange={(event) =>
              ctx.changeStateValue("tailbar", event.target.value)
            }
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "5px" }} label="Материал хавсаргах:">
          <Dragger {...props}>
            <p className="ant-upload-text">Файл сонгох эсвэл чирж оруулна</p>
          </Dragger>
          <table style={{ width: "100%", border: "0px white solid" }}>
            {ctx.state.uploadfiles != null &&
              ctx.state.uploadfiles.map((el, index) => (
                <tr style={{ border: "0px white solid" }}>
                  <td style={{ border: "0px white solid" }}>
                    <FileOutlined />
                  </td>
                  <td style={{ border: "0px white solid" }}>{el.oldname}</td>
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
    </Modal>
  );
}
