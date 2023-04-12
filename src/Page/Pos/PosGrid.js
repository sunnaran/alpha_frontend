import React from 'react'
import PosHeader from './PosHeader';
import Shiree from './Shiree';
import { PosStore } from './PosContext';
import Footer from './Footer';

const PosGrid = () =>

{

  return <div><PosStore><PosHeader/><Shiree/></PosStore><Footer/></div>
}
export default   PosGrid;