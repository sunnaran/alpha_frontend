import { useContext, useMemo, useState } from 'react';
import { Row, Col , Tooltip, Spin} from "antd";
import { WifiOutlined } from "@ant-design/icons";
import PosContext from './PosContext';
export default function Footer() {
    const [arrow, setArrow] = useState('Show');
    const ctx = useContext(PosContext)
  const style = {
    backgroundColor: "#FAEEFC",
    borderTop: "1px solid #E7E7E7",
    textAlign: "left", 
    position: "fixed",
    left: "0",
    bottom: "0", 
    width: "100vw",
    fontSize: "12px",  
    color: "#efefef"
  };

  const phantom = {
    display: "block",
   
    height: "30px",
    width: "100vw",
  };
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }
    if (arrow === 'Show') {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <div>
      <div style={phantom} />
      <div style={style}>
        <Row align="left" style={{paddingLeft: "10px", paddingRight: "10px"}}>
          <Col span={12}>Холбоо барих</Col>
          <Col span={12} align="right">
          <Tooltip placement="topRight" title={"Сүлжээ хэвийн"} arrow={mergedArrow}><Spin spinning={ctx.state.loading} size="small"/>
          <WifiOutlined/>
        </Tooltip>
         
          </Col>
        </Row>
      </div>
    </div>
  );
}
