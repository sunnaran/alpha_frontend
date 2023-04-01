import React from "react";
import myUtil from "../../util/myUtil";
import {
  PrinterFilled,
  AudioOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  DownOutlined,
  UserOutlined,
  WalletOutlined,
  SearchOutlined,
  BarChartOutlined,
  PaperClipOutlined,
  MessageOutlined,
  FileOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
const DownloadFile = (props) => {
  return (
    <span style={{ marginLeft: "5px", marginRight: "5px" }}>
      <a
        target="_blank"
        href={`${myUtil.apicdnserver}/${props.bucket}/${props.filename}`}
      >
        {props.filetype?.includes("document") ? (
          <FileWordOutlined />
        ) : props.filetype?.includes("sheet") ? (
          <FileExcelOutlined />
        ) : props.filetype?.includes("pdf") ? (
          <FilePdfOutlined />
        ) : (
          <FileOutlined />
        )}
      </a>
    </span>
  );
};

export default DownloadFile;
