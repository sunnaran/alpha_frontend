import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  FileOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default function AntMenu() {
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    console.log("click ", e);
    <Link to="/hr">Бүрэлдэхүүн</Link>;
    setCurrent(e.key);
  };
  return (
    <Menu
      inlineIndent={0}
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      forceSubMenuRender
      overflowedIndicator="Бусад цэсүүд"
      style={{
        padding: "0px",
        margin: "0px",
        lineHeight: "25px",
      }}
    >
      <Menu.Item key="pos" icon={<AppstoreOutlined />}>
        <Link to="/pos">ПОС</Link>
      </Menu.Item>
      <Menu.Item key="huulga" icon={<AppstoreOutlined />}>
        <Link to="/huulga">Хуулга</Link>
      </Menu.Item>
      <Menu.Item key="orlogo" icon={<AppstoreOutlined />}>
        <Link to="/orlogo">Барааны орлого</Link>
      </Menu.Item>
      <Menu.Item key="baraa" icon={<AppstoreOutlined />}>
        <Link to="/baraa">Бараа</Link>
      </Menu.Item>
      <Menu.Item key="shiree" icon={<AppstoreOutlined />}>
        <Link to="/shiree">Ширээ</Link>
      </Menu.Item>
      {sessionStorage.getItem("role") == "hcr" && (
        <Menu.Item key="settings" icon={<AppstoreOutlined />}>
          <Link to="/user">Ажилтан</Link>
        </Menu.Item>
      )}
      <Menu.Item key="tonog" icon={<FileOutlined />}>
        <Link to="/tonog">Тоног төхөөрөмж</Link>
      </Menu.Item>  
    </Menu>
  );
}
