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
import Resizer from "react-image-file-resizer";
import { DeleteOutlined, FileOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import moment from "moment"; 
import noavatar from "../../assets/no_avatar.jpg";
import ProductsContext from "./ProductsContext";
import * as myConst from "../../MyConstant";
const dateFormat = "YYYY/MM/DD";
const { TextArea } = Input;
const { Dragger } = Upload;
const formItemLayout = {
  layout: "vertical",
};
export default function ModalInsert() {
  useEffect(() => {
   ctx.getBaraaniiTurul();
  }, [])
  
  const ctx = useContext(ProductsContext);
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
  
  const handleChangeimage = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          500,
          500,
          "PNG",
          72,
          0,
          (uri) => {
            console.log(uri); 
            ctx.changeStateValue("pht", uri); 
            
          },
          "base64"
        );
      } catch (err) {
        console.log(err);
      }
    }
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
            Бараа нэмэх
          </Title>
        ) : (
          <Title type="warning" level={4}>
       Бараа засварлах
          </Title>
        )}
     
        <Form {...formItemLayout} size="small">
          <Row gutter={16}>
            <Col span={24} >
              <Row gutter={16}  
              // style={{display: "none"}}
              >
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
                <div style={{ background: "white" }}>
                <h4 style={{ color: "gray" }}>
                  Доорхи товчыг дарж зургаа сонгоно уу
                </h4>
              </div>

              <div>
                <input
                  type="file"
                  name="upload_file"
                  onChange={handleChangeimage}
                />
              </div>


                {/* <ImgCrop >
                  <Dragger {...pictureprops}>
                    <p className="ant-upload-text">Зураг сонгох</p>
                    <p className="ant-upload-hint">Чирж болно</p>
                  </Dragger>
                  </ImgCrop> */}
                </Col>
              </Row>
              
              <Row gutter={16}>             
                <Col span={24}>
                <Form.Item
            style={{ marginBottom: "5px" }}
            label="Нэгж"
            required
            hasFeedback
            validateStatus={ctx.state.trl != null ? "success" : "error"}
          >
            <Select
              showSearch={true}
              value={ctx.state.trl}
              onSelect={(value, event) => ctx.changeStateValue("trl", value)}
            >
              {ctx.state.trl_list?.map((el) => (
                <Select.Option key={el.id}>
                  {el.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "5px" }}
                    required
                    label="Нэр"
                    hasFeedback
                    validateStatus={ctx.state.nme != null ? "success" : "error"}
                  >
                    <Input
                      allowClear
                      value={ctx.state.nme}
                      onChange={(event) =>
                        ctx.changeStateValue("nme", event.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
                
                  
              
                 
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
}
