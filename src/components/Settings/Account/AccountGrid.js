import React from "react";
import ModalInsert from "./ModalInsert";
import AccountHeader from "./AccountHeader";
import AccountTable from "./AccountTable";
import MyHeader from "../../constcomponents/MyHeader";

export default function AccountGrid() {
  return (
    <div>
       <MyHeader/>
      <AccountHeader />
      <ModalInsert />
      <AccountTable />
    </div>
  );
}
