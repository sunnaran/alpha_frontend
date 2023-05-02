import React, {useEffect, useState} from "react";
import TopMenu from "../constcomponents/TopMenu";
import MyHeader from "../constcomponents/MyHeader";


export default function Preferences() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  
  return (
    <div>
    <MyHeader/>
      <h1>The page was created to use test</h1> 
      <h1>Counter: {counter}</h1>    
    </div>
  );
}
 