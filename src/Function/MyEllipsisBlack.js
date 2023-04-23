import React from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;
const MyEllipsisBlack = ({ row, children }) => {
  return (
    <Paragraph
      ellipsis={{
        rows: row,
      }}
      style={{ marginBottom: 0, fontSize: "20px", fontWeight: "bold" }}
      title={children}
    >
      {children}
    </Paragraph>
  );
};
export default MyEllipsisBlack;