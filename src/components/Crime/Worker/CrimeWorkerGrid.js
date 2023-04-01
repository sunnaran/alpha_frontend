import React from "react";
import CrimeWorkerHeader from "./CrimeWorkerHeader";
import CrimeWorkerTable from "./CrimeWorkerTable";
import ModalInsert from "./ModalInsert";

export default function CrimeWorkerGrid() {
  return (
    <div>
      <div>
        <CrimeWorkerHeader />
        <ModalInsert />
      </div>
      <div>
        <CrimeWorkerTable />
      </div>
    </div>
  );
}
