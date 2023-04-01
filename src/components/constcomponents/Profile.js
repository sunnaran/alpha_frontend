import React, { useContext, useState } from "react";

 

import { Avatar, Menu, Dropdown, Button, message, Space, Tooltip } from "antd";

import {
  SearchOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  DownOutlined,
  UserOutlined,
  WalletOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import ChangePassword from "./ChangePassword";
import myUtil from "../../util/myUtil";
export default function Profile() {
  const [showChangePassword, setShowChangePassword] = useState(false);
 
  const LogOut = () => {
    sessionStorage.clear();
    window.location.reload(false);
  };
  const handleUserGuide = () => {
    message.info(
      "Хүснэгтэн өгөгдөлд хулганы баруун талын товч дарж засах, устгах үйлдэл хийнэ үү"
    );
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<KeyOutlined />}>
        Нууц үг солих
      </Menu.Item>
      <Menu.Item key="2" icon={<WalletOutlined />}>
        Программаас гарах
      </Menu.Item>
    </Menu>
  );
  function handleMenuClick(e) {
    // message.info("Click on menu item.");
    console.log("click", e);
    if (e.key == 2) {
      LogOut();
    } else if (e.key == 1) {
      setShowChangePassword(true);
    }
  }
  const user = sessionStorage.getItem("filtername");
  return (
    <Space size={5}>
      <Avatar shape="square" icon={<UserOutlined />} />
      {user}
      <Space size={5} style={{ backgroundColor: "#bcc9f3", padding: "5px" }}>
        {/* <a href={`${myUtil.apicdnserver}/upload/ebpoguide.pdf`} target="_blank"> */}
        <a href="#">
          <Button
            size="small"
            icon={<QuestionCircleOutlined onClick={() => handleUserGuide()} />}
          />
        </a>
        <Dropdown overlay={menu} placement="topRight">
          <Button size="small" icon={<SettingOutlined />} />
        </Dropdown>
      </Space>
      <ChangePassword
        visible={showChangePassword}
        cancel={() => setShowChangePassword()}
      />
    </Space>
  );
}
