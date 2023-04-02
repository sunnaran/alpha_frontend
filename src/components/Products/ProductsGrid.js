import React from "react";
import ProductsHeader from "./ProductsHeader";
import ProductsTable from "./ProductsTable";
import ModalInsert from "./ModalInsert";

export default function ProductsGrid() {
  return (
    <div>
      <div>
        <ProductsHeader />
        <ModalInsert />
      </div>
      <div>
        <ProductsTable />
      </div>
    </div>
  );
}
