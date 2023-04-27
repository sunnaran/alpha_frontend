import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
var currencyFormatter = require("currency-formatter");
const SumCurrency = (props) => {
    const [niilber, setNiilber] = useState(1000);
  useEffect(() => {
    let sum=100;
     props.data?.map((el)=>
     {
        sum=el.itemune*el.itemtoo;
     }
     )
     setNiilber(sum);
  }, [])
  
  return (
    <div> {currencyFormatter.format(niilber, {
        symbol: "",
        decimal: ".",
        thousand: ",",
        precision: 0,
        format: "%v %s", // %s is the symbol and %v is the value
      })}</div>
  )
}

export default SumCurrency