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
import * as myConst from "../../../MyConstant";
import AccountContext from "./AccountContext";
const { Search } = Input;
const dateFormat = "YYYY/MM/DD";
const { TextArea } = Input;
const { Dragger } = Upload;
const formItemLayout = {
  layout: "horizontal",
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export default function ModalInsert() {
  const ctx = useContext(AccountContext);
  const { Text, Title } = Typography;
  const onSearch = (value) => console.log(value);
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
    action: `${myUtil.apinodeserver}/upload/img `,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        ctx.changeStateValue("pht", info.file.response?.result);
        //        message.success(`Амжилттай: ${info.file.name} .`);
      } else if (status === "error") {
        message.error(`${info.file.name} файл серверт илгээж чадсангүй.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    // beforeUpload: async (file) => {await getBase64(file, (result) => {  ctx.changeStateValue("pht", result); });         }

     
  };

  return (
    <Modal
      //   title="Modal 1000px width"
      centered
      visible={ctx.state.showInsert}
      closable={false}
      header={false}
      width={400}
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
            Хэрэглэгч нэмэх
          </Title>
        ) : (
          <Title type="warning" level={4}>
            Хэрэглэгч засах
          </Title>
        )}
        <Form {...formItemLayout} size="small">
          {/* <Row
            gutter={16}
            style={{
              justifyContent: "center",
            }}
          >
            <Col span={8}>
              {ctx.state.pht != null ? (
                <Image
                  height={90}
                  src={`${myUtil.apicdnserver}/image/${ctx.state.pht}`}
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
          </Row> */}

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

          <Form.Item
            style={{ marginBottom: "5px" }}
            label="Утас/Нэвтрэх"
            required
            validateStatus={ctx.state.unm != null ? "success" : "error"}
          >
            <Input
              value={ctx.state.unm}             
              placeholder="Утас/Нэвтрэх нэр"
              
              onChange={(event) =>
                ctx.changeStateValue("unm", event.target.value)
              } 
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "5px" }}
            label="Утас 2"
            required
            validateStatus={ctx.state.rnk != null ? "success" : "error"}
          >
            <Input
              value={ctx.state.rnk}             
              placeholder="Утас нэмэлт"
            
              onChange={(event) =>
                ctx.changeStateValue("rnk", event.target.value)
              } 
            />
          </Form.Item>
          
          <Form.Item
            style={{ marginBottom: "5px" }}
            label="Нууц үг"
            allowClear
            required
            hasFeedback
          >
            <Input.Password
              onChange={(event) =>
                ctx.changeStateValue("cde", event.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "5px" }}
            label="Нэгж"
            required
            hasFeedback
            validateStatus={ctx.state.sqd != null ? "success" : "error"}
          >
            <Select
              showSearch={true}
              value={ctx.state.sqd}
              onSelect={(value, event) => ctx.changeStateValue("sqd", value)}
            >
              {myConst.CONST_SQD.map((el) => (
                <Select.Option key={el} value={el}>
                  {el}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "5px" }}
            required
            label="Төвшин"
            hasFeedback
            validateStatus={ctx.state.rle != null ? "success" : "error"}
          >
            <Select
              value={ctx.state.rle}
              onSelect={(value, event) => ctx.changeStateValue("rle", value)}
            >
              <Select.Option key={1} value={"hcr"}>
               Захирал
              </Select.Option>
              <Select.Option key={2} value={"nrv"}>
                Нярав
              </Select.Option>
              <Select.Option key={0} value={"scr"}>
                Ажилтан
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "5px" }}
            required
            label="Төлөв"
            hasFeedback
            validateStatus={ctx.state.sts != null ? "success" : "error"}
          >
            <Select
              value={ctx.state.sts}
              onSelect={(value, event) => ctx.changeStateValue("sts", value)}
            >
              <Select.Option key={0} value={"act"}>
                Ажиллаж байгаа
              </Select.Option>
              <Select.Option key={1} value={"ina"}>
                Халагдсан
              </Select.Option>
            </Select>
          </Form.Item>

         
        </Form>
      </Spin>
    </Modal>
  );
}
