import React from "react";
import HuulgaContext from "./HuulgaContext";
import MyHeader from "../../components/constcomponents/MyHeader";
import HuulgaTable from "./HuulgaTable"; 
import { useEffect } from "react";
import { useContext } from "react";
import HuulgaHeader from "./HuulgaHeader";
export default function HuugaGrid() {
  const ctx = useContext(HuulgaContext);
  useEffect(() => {
    ctx.loadData();
  }, []);

  return (
    <>
      <div>
        <MyHeader />
        <HuulgaHeader />
        <HuulgaTable />
      </div>
    </>
  );
}
