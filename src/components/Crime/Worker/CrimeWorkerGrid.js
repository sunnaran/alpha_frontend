import React from "react";
import CrimeWorkerHeader from "./CrimeWorkerHeader";
import CrimeWorkerTable from "./CrimeWorkerTable";
import ModalInsert from "./ModalInsert";
import MyHeader from "../../constcomponents/MyHeader";

export default function CrimeWorkerGrid() {
  return (
    <div>
      <div>
      <MyHeader/>
        <CrimeWorkerHeader />
        <ModalInsert />
      </div>
      <div>
        <CrimeWorkerTable />
      </div>
    </div>
  );
}
