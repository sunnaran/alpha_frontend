import React from "react";
import ShireeHeader from "./ShireeHeader";
import ShireeTable from "./ShireeTable";
import ModalInsert from "./ModalInsert";

export default function ShireeGrid() {
  return (
    <div>
      <div>
        <ShireeHeader />
        <ModalInsert />
      </div>
      <div>
        <ShireeTable />
      </div>
    </div>
  );
}
