import React from "react";
import ShireeHeader from "./ShireeHeader";
import ShireeTable from "./ShireeTable";
import ModalInsert from "./ModalInsert";
import MyHeader from "../constcomponents/MyHeader";

export default function ShireeGrid() {
  return (
    <div>
      <div>
      <MyHeader/>
        <ShireeHeader />
        <ModalInsert />
      </div>
      <div>
        <ShireeTable />
      </div>
    </div>
  );
}
