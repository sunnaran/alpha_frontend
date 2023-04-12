import React from "react";
import ProductsHeader from "./ProductsHeader";
import ProductsTable from "./ProductsTable";
import ModalInsert from "./ModalInsert";
import MyHeader from "../constcomponents/MyHeader";

export default function ProductsGrid() {
  return (
    <div>
      <div>
        <MyHeader/>
        <ProductsHeader />
        <ModalInsert />
      </div>
      <div>
        <ProductsTable />
      </div>
    </div>
  );
}
