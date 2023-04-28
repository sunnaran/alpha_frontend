import React, {useEffect} from "react";
import TopMenu from "../constcomponents/TopMenu";
import MyHeader from "../constcomponents/MyHeader";

export default function Preferences() {
  useEffect(() => {
    document.exitFullscreen();
  }, [])
  
  return (
    <div>
    <MyHeader/>
      <h1>The page was created to use test</h1> 
    </div>
  );
}
