import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "../Login/Login";
import Preferences from "../Preferences/Preferences";
import useToken from "./useToken";
import "./App.css";
import { AccountStore } from "../Settings/Account/AccountContext"; 
import SettingsGird from "../Settings/SettingsGrid";
import CrimeWorkerGrid from "../../components/Crime/Worker/CrimeWorkerGrid"
import { CrimeWorkerStore } from "../Crime/Worker/CrimeWorkerContext";
import MyHeader from "../constcomponents/MyHeader";

function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <>
    <MyHeader/>
      <Routes>
        <Route path="/" element={<Preferences />} />
        <Route path="/baraa" element={<Preferences />} />
        <Route
          path="/user"
          element={
            <AccountStore>
              <SettingsGird />
            </AccountStore>
          }
        />
        <Route path="/tonog" element={<div><CrimeWorkerStore><CrimeWorkerGrid/></CrimeWorkerStore></div>} />
      </Routes>
    </>
  );
}

export default App;
