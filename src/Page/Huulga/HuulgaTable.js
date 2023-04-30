import { Table } from "antd";
import React from "react";
import "./tableclass.css";
import { useContext } from "react";
import HuulgaContext from "./HuulgaContext";
import MyCurrency from "../../Function/MyCurrency";

export default function HuulgaTable() {
  const ctx = useContext(HuulgaContext); 
   

  return (
    <div style={{width: "100%",  }}>
      <table>
        {ctx.state.list?.sort((a, b) => a.ognoo.localeCompare(b.ognoo))?.slice()?.reverse()?.map((el)=>
        <tr>
            <td>
                {el.ognoo}
            </td>
            
            <td>
                {el.productname}
            </td>
            <td>
                {el.producttoo}
            </td>
            <td >
               <div style={{textAlign: "right"}}><MyCurrency> {el.productune}</MyCurrency></div>
            </td>
            <td>
            <div style={{textAlign: "right"}}><MyCurrency> {el.totalprice}</MyCurrency></div>                
            </td>
            <td>
                {el.username}
            </td>
            <td>
                {el.haana} 
            </td>
            <td>
                {el.shireename } 
            </td>
            <td>
                {el.utga } 
            </td>
            
            
            <td>
               {el.zarsan}
            </td>
        </tr>
        )}
      </table>
      
    </div>
  );
}
