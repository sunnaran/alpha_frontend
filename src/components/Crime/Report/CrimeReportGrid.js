import React from "react";
import CrimeReportHeader from "./CrimeReportHeader";
import CrimeReportTable from "./CrimeReportTable";
import ModalInsert from "./ModalInsert";

export default function CrimeReportGrid() {
  return (
    <div>
      <div>
        <CrimeReportHeader />
        <ModalInsert />
      </div>
      <div>
        <CrimeReportTable />
      </div>
    </div>
  );
}
