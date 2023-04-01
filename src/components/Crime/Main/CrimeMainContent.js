import React, { useContext, useEffect } from "react";
import HeadContent from "./Content/HeadContent";
import SearchContent from "./Content/SearchContent";
import TableContent from "./Content/TableContent";
import TablePerson from "./Content/TablePerson";
import CrimeMainMenu from "./CrimeMainMenu";
import ModalInsert from "./ModalInsert";
import MyCSearch from "./Content/MyCSearch";
export default function CrimeMainContent() {
  useEffect(() => {}, []);

  return (
    <div>
      <CrimeMainMenu />

      <TableContent />

      <TablePerson />
      <ModalInsert />
    </div>
  );
}
