import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal,
  Typography,
  Space,
  message,
} from "antd";
import axios from "../../util/myAxios";

const { Text, Link } = Typography;
const { Option } = Select;
const ChangePassword = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const data = {
      token,
      confirm: values.confirm,
      oldpassword: values.oldpassword,
      password: values.password,
    };
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 100002,
      },
    };
    setLoading(true);
    axios
      .post("/public/request", data, configload)
      .then((response) => {
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(response.data.message);
          return;
        }
        setLoading(false);
        message.info(response.data.message);
        response.data.code == 200 && handleCancel();
      })
      .catch((error) => {
        setLoading(false);
        message.info("Алдаа гарлаа: Code is 100002");
      });
  };

  const handleOk = () => {
    props.cancel(false);
  };

  const handleCancel = () => {
    props.cancel(false);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 14 },
  };
  return (
    <Modal
      visible={props.visible}
      title="Нууц үг солих"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        {...formItemLayout}
        form={form}
        footer={null}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="oldpassword"
          label="Хуучин нууц үг"
          rules={[
            {
              required: true,
              message: "Хуучин нууц үгээ оруулна уу!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password"
          label="Шинэ нууц үг"
          rules={[
            {
              min: 6,
              required: true,
              message: "Шинэ нууц үгээ оруулна уу!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Шинэ нууц үгээ давтах"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              min: 6,
              required: true,
              message: "Нууц үгээ давтаж оруулна уу!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Нууц үгээ зөв давтаж оруулна уу!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            //  loading={loading}
            //onClick={handleOk}
          >
            Хадгалах
          </Button>{" "}
          <Button
            key="cancel"
            //  loading={loading}
            onClick={handleCancel}
          >
            Хаах
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ChangePassword;
