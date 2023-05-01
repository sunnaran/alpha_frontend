import React, { useState, useEffect } from "react"; 
import PropTypes from "prop-types";
import axios from "../../util/myAxios";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Image,
  Spin,
  Alert,
  message,
} from "antd"; 
import "./Login.css";
import background from "../../assets/intro.jpg";
import logo from "../../assets/logo_s.png"; 
import myUtil from "../../util/myUtil"; 

const { Title, Text } = Typography;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 14,
  },
};

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
 
  }, []);
  const onFinish = async (values) => {
    let mytoken;
    setLoading(true);
    axios
      .post("/public/request", values, {
        headers: {
          request_code: "100000",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(response.data.message);
          return;
        }
        if (response.data.code == 400) {
          message.warning(response.data.message);
          setLoading(false);
          return;
        }
        sessionStorage.setItem("filtername", response.data.result.filtername);
        localStorage.setItem("branch", response.data.result.sqd);
        sessionStorage.setItem("role", response.data.result.role);
        
 

        setToken(response.data.result);
        setLoading(false);
        const data1 = {
          roomid: "loggeduser",
          username: response.data.result.filtername,
        }; 
      })
      .catch((err) => {
        message.error(
          err.response != undefined
            ? err.response.data.result
            : "Сервертэй холбогдож чадсангүй"
        );
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="login-wrapper"
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: `url(${background}) no-repeat left top`,
        backgroundSize: "cover",
      }}
    >
      <Image width={80} src={logo} />
      <br />
      <Title level={4}>ALPHA BAR & RESTAURANT</Title>
      <Text type="secondary">Удирдлагын программ 1.0</Text>

      <br />

      <Spin spinning={loading}>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Нэвтрэх нэр:"
            name="username"
            rules={[
              {
                required: true,
                message: "Нэвтрэх нэр оруулна уу!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Нууц үг"
            name="password"
            rules={[
              {
                required: true,
                message: "Нууц үг оруулна уу!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Нэвтрэх
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
