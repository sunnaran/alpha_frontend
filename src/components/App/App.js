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
import ShireeGrid from "../Shiree/ShireeGrid";
import {  ShireeStore } from "../Shiree/ShireeContext";
import {  ProductsStore } from "../Products/ProductsContext";

import ProductsGrid from "../Products/ProductsGrid";
import QrmenuGrid from "../QRmenu/QrmenuGrid"; 
import PosGrid from "../../Page/Pos/PosGrid";
import { PosStore } from "../../Page/Pos/PosContext";
import OrlogoGrid from "../../Page/Orlogo/OrlogoGrid";
import AdminContext, {AdminStore} from "../../context/AdminContext";
import HuugaGrid from "../../Page/Huulga/HuugaGrid";
import { HuulgaStore } from "../../Page/Huulga/HuulgaContext";
import UldegdelGrid from "../../Page/Uldegdel/UldegdelGrid";
import { UldegdelStore } from "../../Page/Uldegdel/UldegdelContext";
function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <>
     <PosStore>
     <Routes>  
    
        <Route path="/qrmenu/:id" element={<QrmenuGrid/>} />           
        <Route path="*" element={ <Login setToken={setToken}/> }/>
        
      </Routes>
      </PosStore>
    </>
  
  } 
  else 
  return (
    <>
    <AdminStore>
    <PosStore>
        <Routes>
        <Route path="/" element={<HuulgaStore><HuugaGrid /></HuulgaStore>} />
        <Route exact path="/huulga" element={<HuulgaStore><HuugaGrid /></HuulgaStore>} />
        <Route exact path="/uldegdel" element={<UldegdelStore><UldegdelGrid/></UldegdelStore>} />
        <Route path="/pos" element={<PosGrid />} />
        <Route path="/baraa" element={<ProductsStore><ProductsGrid/></ProductsStore>} />
        <Route path="/shiree" element={<ShireeStore><ShireeGrid /></ShireeStore>} />
        <Route path="/qrmenu/:id" element={<QrmenuGrid/>} />
             <Route
          path="/user"
          element={
            <AccountStore>
              <SettingsGird />
            </AccountStore>
          }
        />
        <Route path="/orlogo" element={<OrlogoGrid />} />
        <Route path="/tonog" element={<div><CrimeWorkerStore><CrimeWorkerGrid/></CrimeWorkerStore></div>} />
        {!token && <Route path="*" element={ <Login setToken={setToken}/> }/>}        
      </Routes>
      </PosStore>
      </AdminStore>
    </>
  );
}

export default App;
