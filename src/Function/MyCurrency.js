import React from 'react'
var currencyFormatter = require("currency-formatter");
const MyCurrency = (props) => {
  return (
    <> {currencyFormatter.format(props.children, {
        symbol: "",
        decimal: ".",
        thousand: ",",
        precision: 0,
        format: "%v %s", // %s is the symbol and %v is the value
      })}</>
  )
}

export default MyCurrency