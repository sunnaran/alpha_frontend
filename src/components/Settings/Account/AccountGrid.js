import React from "react";
import ModalInsert from "./ModalInsert";
import AccountHeader from "./AccountHeader";
import AccountTable from "./AccountTable";

export default function AccountGrid() {
  return (
    <div>
      <AccountHeader />
      <ModalInsert />
      <AccountTable />
    </div>
  );
}
