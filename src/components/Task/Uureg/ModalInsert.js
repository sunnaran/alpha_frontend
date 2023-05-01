import React, { useContext, useEffect } from "react";
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
} from "antd";
import moment from "moment";
import UuregContext from "./UuregContext";
import * as myConstClass from "../../../MyConstant.js";
import { DeleteOutlined, FileOutlined } from "@ant-design/icons";
import myUtil from "../../../util/myUtil";
const { TextArea } = Input;
const { Dragger } = Upload;
const { Text, Title } = Typography;
export default function ModalInsert() {
  const ctx = useContext(UuregContext);
  const dateFormat = "YYYY/MM/DD HH:mm:ss";

  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [checkPort, setCheckPort] = React.useState(false);
  const [checkCenter, setCheckCenter] = React.useState(false);
  const [checkSouth, setCheckSouth] = React.useState(false);
  const [checkNorth, setCheckNorth] = React.useState(false);
  const [checkSpecial, setCheckSpecial] = React.useState(false);

  const CheckboxGroup = Checkbox.Group;
  useEffect(() => {
    checkControl(ctx.state.checkedList);
  }, []);

  const checkControl = (list) => {
    let myAll = true;
    let myPort = true;
    let mySpecial = true;
    let myCenter = true;
    let myNorth = true;
    let mySouth = true;
    if (list?.length === myConstClass.CONST_SQD.length) {
      myAll = true;
    } else {
      myAll = false;
    }

    myConstClass.CONST_SQD_PORT?.map((el) => {
      if (list.includes(el) == false) {
        myPort = false;
      }
    });
    myConstClass.CONST_SQD_SPECIAL?.map((el) => {
      if (list.includes(el) == false) {
        mySpecial = false;
      }
    });

    myConstClass.CONST_SQD_CENTER?.map((el) => {
      if (list.includes(el) == false) {
        myCenter = false;
      }
    });

    myConstClass.CONST_SQD_SOUTH?.map((el) => {
      if (list.includes(el) == false) {
        mySouth = false;
      }
    });
    myConstClass.CONST_SQD_NORTH?.map((el) => {
      if (list.includes(el) == false) {
        myNorth = false;
      }
    });
    setCheckAll(myAll);
    setCheckCenter(myCenter);
    setCheckNorth(myNorth);
    setCheckSouth(mySouth);
    setCheckSpecial(mySpecial);
    setCheckPort(myPort);
  };
  const onChange = (list) => {
    ctx.setCheckedList(list);
    checkControl(list);
  };

  const onCheckAllChange = (e) => {
    ctx.setCheckedList(e.target.checked ? myConstClass.CONST_SQD : []);
    checkControl(e.target.checked ? myConstClass.CONST_SQD : []);
    setCheckAll(e.target.checked);
  };
  const onCheckPortChange = (e) => {
    ctx.setCheckedList(e.target.checked ? myConstClass.CONST_SQD_PORT : []);
    setCheckPort(e.target.checked);
    checkControl(e.target.checked ? myConstClass.CONST_SQD_PORT : []);
  };
  const onCheckCenterChange = (e) => {
    ctx.setCheckedList(e.target.checked ? myConstClass.CONST_SQD_CENTER : []);
    setCheckCenter(e.target.checked);

    checkControl(e.target.checked ? myConstClass.CONST_SQD_CENTER : []);
  };
  const onCheckSouthChange = (e) => {
    ctx.setCheckedList(e.target.checked ? myConstClass.CONST_SQD_SOUTH : []);
    setCheckSouth(e.target.checked);
    checkControl(e.target.checked ? myConstClass.CONST_SQD_SOUTH : []);
  };
  const onCheckNorthChange = (e) => {
    ctx.setCheckedList(e.target.checked ? myConstClass.CONST_SQD_NORTH : []);
    setCheckNorth(e.target.checked);

    checkControl(e.target.checked ? myConstClass.CONST_SQD_NORTH : []);
  };
  const onCheckSpecialChange = (e) => {
    ctx.setCheckedList(e.target.checked ? myConstClass.CONST_SQD_SPECIAL : []);
    setCheckSpecial(e.target.checked);
    checkControl(e.target.checked ? myConstClass.CONST_SQD_SPECIAL : []);
  };

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
  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const onChange1 = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  return (
    <Modal
      //   title="Modal 1000px width"
      centered
      visible={ctx.state.showInsert}
      closable={false}
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
            Үүрэг даалгавар өгөх
          </Title>
        ) : (
          <Title type="warning" level={4}>
            Үүрэг даалгавар засах
          </Title>
        )}
      </Spin>
      <Form layout="vertical" size="small">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              style={{ marginBottom: "5px" }}
              required
              label="Үүрэг"
              hasFeedback
              validateStatus={ctx.state.tsk != null ? "success" : "error"}
            >
              <TextArea
                rows={3}
                allowClear
                value={ctx.state.tsk}
                onChange={(event) =>
                  ctx.changeStateValue("tsk", event.target.value)
                }
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "5px" }}
              required
              label="Хэнээс"
              hasFeedback
              validateStatus={ctx.state.frm != null ? "success" : "error"}
            >
              <Input
                allowClear
                value={ctx.state.frm}
                onChange={(event) =>
                  ctx.changeStateValue("frm", event.target.value)
                }
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "5px" }}
              required
              label="Хэнд"
              hasFeedback
              validateStatus={ctx.state.top != null ? "success" : "error"}
            >
              <Input
                allowClear
                value={ctx.state.top}
                onChange={(event) =>
                  ctx.changeStateValue("top", event.target.value)
                }
              />
            </Form.Item>

            <Row>
              <Col>
                <Form.Item
                  style={{ marginBottom: "5px" }}
                  required
                  hasFeedback
                  validateStatus={ctx.state.bdt != null ? "success" : "error"}
                  label="Эхлэх огноо"
                >
                  <DatePicker
                    showTime
                    onChange={(date, dateString) => {
                      ctx.changeStateValue("bdt", dateString);
                    }}
                    onOk={onOk}
                    format={dateFormat}
                    style={{ width: "100%" }}
                    allowClear
                    value={ctx.state.bdt != null && moment(ctx.state.bdt)}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  style={{ marginBottom: "5px" }}
                  required
                  hasFeedback
                  validateStatus={ctx.state.edt != null ? "success" : "error"}
                  label="Дуусах огноо"
                >
                  <DatePicker
                    showTime
                    onChange={(date, dateString) => {
                      ctx.changeStateValue("edt", dateString);
                    }}
                    onOk={onOk}
                    format={dateFormat}
                    style={{ width: "100%" }}
                    allowClear
                    value={ctx.state.edt != null && moment(ctx.state.edt)}
                  />
                </Form.Item>
              </Col>
            </Row>
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
                {ctx.state.uploadfiles != null &&
                  ctx.state.uploadfiles?.map((el, index) => (
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
          </Col>
          <Col span={12}>
            <div>Аль ангид: </div>
            <Checkbox
              indeterminate={false}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Бүх анги
            </Checkbox>
            <Checkbox
              indeterminate={false}
              onChange={onCheckPortChange}
              checked={checkPort}
            >
              Боомттой анги
            </Checkbox>
            <Checkbox
              indeterminate={false}
              onChange={onCheckCenterChange}
              checked={checkCenter}
            >
              Төвийн бүс
            </Checkbox>
            <Checkbox
              indeterminate={false}
              onChange={onCheckSouthChange}
              checked={checkSouth}
            >
              Өмнөд хил
            </Checkbox>
            <Checkbox
              indeterminate={false}
              onChange={onCheckNorthChange}
              checked={checkNorth}
            >
              Хойд хил
            </Checkbox>
            <Checkbox
              indeterminate={false}
              onChange={onCheckSpecialChange}
              checked={checkSpecial}
            >
              Тусгай салбар
            </Checkbox>
            <Divider />
            <CheckboxGroup
              options={myConstClass.CONST_SQD}
              value={ctx.state.checkedList}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
