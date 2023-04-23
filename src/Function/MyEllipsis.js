import React from "react";
import { Typography } from "antd";
const { Paragraph } = Typography;
const MyEllipsis = ({ row, children }) => {
  return (
    <Paragraph
      ellipsis={{
        rows: row,
      }}
      style={{ marginBottom: 0, color: "#571E94" }}
      title={children}
    >
      {children}
    </Paragraph>
  );
};
export default MyEllipsis;