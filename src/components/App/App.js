import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "../Login/Login";
import Preferences from "../Preferences/Preferences";
import useToken from "./useToken";
import TopMenu from "../constcomponents/TopMenu";
import "./App.css"; 
import { Helmet } from "react-helmet"; 
import MyHeader from "../constcomponents/MyHeader";
import { AccountStore } from "../Settings/Account/AccountContext";
import SettingsGird from "../Settings/SettingsGrid";
function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <>
    <Routes>
       <Route path="/" element={<Preferences />} />
       <Route path="/baraa" element={<Preferences />} />
       <Route path="/user" element={<AccountStore>
           <SettingsGird />
         </AccountStore>} />
         <Route path="/tonog" element={<Preferences />} />
    </Routes>

 </>
  );
}

export default App;
