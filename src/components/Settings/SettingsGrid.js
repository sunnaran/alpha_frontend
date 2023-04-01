import React, { useContext, useState } from "react";
import MyHeader from "../constcomponents/MyHeader";
import { Row, Col, Image } from "antd";
import { Link } from "react-router-dom";
import axios from "../../util/myAxios";
import AccountContext, { AccountStore } from "./Account/AccountContext";
import SettingsSideBar from "./SettingsSideBar";
import AccountGrid from "./Account/AccountGrid";
export default function SettingsGird() {
  const ctxAccount = useContext(AccountContext);
  return (
    <div>
      
      <div>
  
        <div
          style={{
            position: "absolute", 
            width: "100vw",
             
          }}
        >
          <div
            style={{
              overflowX: "auto",
              overflowY: "auto",
              height: "calc(100vh - 90px)",
            }}
          >
            <AccountGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
