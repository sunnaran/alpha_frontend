import React from "react";
import UldegdelContext from "./UldegdelContext";  
import { useEffect } from "react";
import { useContext } from "react"; 
import MyHeader from "../../components/constcomponents/MyHeader";
import UldegdelContent from "./UldegdelContent";
export default function HuugaGrid() {
  const ctx = useContext(UldegdelContext);
  useEffect(() => {
    ctx.loadData();
  }, []);

  return (
    <>
      <div>
        <MyHeader />      
        <UldegdelContent/>
      </div>
    </>
  );
}
