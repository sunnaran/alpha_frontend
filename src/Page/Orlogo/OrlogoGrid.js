import React, { useEffect, useState, useContext, useRef  } from "react";
import MyHeader from "../../components/constcomponents/MyHeader";
import { Row, Col, InputNumber, Button, Alert } from "antd";
import PosContext from "../Pos/PosContext";
const initialState = {
    totalprice: 0,
    totalpieces: 0,
    orlogo:[],
     
}
export default function OrlogoGrid() {
  const [state, setState] = useState(initialState);
  const ctx = useContext(PosContext);
  useEffect(() => {
    ctx.getBaraa();
  }, []);
  const [keyboard, setKeyboard] = useState(true);
  const saveOrlog = ()=>{
    console.log("hi");
  }
const ctxChangedOrlogo = (productID, too) =>{
    let neworlogo=[];
    state.orlogo.filter((el)=>el.id!=productID).map((el1)=>neworlogo.push(el1));
    neworlogo.push({productID, too})
    
}
return (
    <div>
      <MyHeader />
      <div>
        <div>
          <Alert message="Тоо ширхэг:" type="success" />
          <Alert message="Нийт үнэ:" type="success" />
          <Button type="primary" onClick={()=>saveOrlog()}>Хадгалах</Button>
        </div>
        <div style={{
           height: "calc(100vh - 180px)", overflow: "scroll"
        }}>
         <table>
          {ctx.state.baraanuud.map((el, index) => (
            <tr key={el.id}><td>{el.nme}</td><td><InputNumber defaultValue={index} onChange={(value)=>ctxChangedOrlogo(el.id, value)}/></td></tr>
          ))}
        </table>
        </div>
        
      </div>
    </div>
  );
}
