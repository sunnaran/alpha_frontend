import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
const  QrmenuGrid = () => {
    const { id } = useParams();
  useEffect(() => {
    sessionStorage.clear(); 
  }, []);

  return <div><h1> Ширээний дотоод дугаар: {id}</h1></div>;
}
export default QrmenuGrid;
