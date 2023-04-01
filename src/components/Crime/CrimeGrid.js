import React, { useContext, useState } from "react";
import MyHeader from "../constcomponents/MyHeader";
import { Row, Col, Image } from "antd";
import { Link } from "react-router-dom";
import axios from "../../util/myAxios";
import CrimeSideBar from "./CrimeSideBar";
import CrimeContext from "../../context/CrimeContext";
import CrimeMainContent from "./Main/CrimeMainContent";
import CrimeReportGrid from "./Report/CrimeReportGrid";
import { CrimeMainStore } from "./Main/crimeMainContext";
import { CrimeWorkerStore } from "./Worker/CrimeWorkerContext";
import { CrimeReportStore } from "./Report/CrimeReportContext";
import CrimeWorkerGrid from "./Worker/CrimeWorkerGrid";

export default function CrimeGird() {
  const ctxCrime = useContext(CrimeContext);
  return (
    <div>
      <MyHeader />
      <div>
        <div
          style={{
            minWidth: "170px",
            zIndex: 1,
            width: "230px",
            float: "left",
            height: "calc(100vh - 85px)",
            borderRight: "1px solid gray",
          }}
        >
          <CrimeSideBar />
        </div>
        <div
          style={{
            position: "absolute",
            left: "230px",
            float: "left",

            width: "calc(100vw - 230px)",
            height: "100wh",
          }}
        >
          <div
            style={{
              overflowX: "auto",
              overflowY: "auto",
              height: "calc(100vh - 90px)",
            }}
          >
            {ctxCrime.state.sub_menu == 1 && (
              <CrimeMainStore>
                <CrimeMainContent />
              </CrimeMainStore>
            )}
            {ctxCrime.state.sub_menu == 2 && (
              <CrimeReportStore>
                <CrimeReportGrid />
              </CrimeReportStore>
            )}
            {ctxCrime.state.sub_menu == 3 && (
              <CrimeWorkerStore>
                <CrimeWorkerGrid />
              </CrimeWorkerStore>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
