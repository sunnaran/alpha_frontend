import React, { useContext, useState } from "react";
import UuregContext from "./UuregContext";
import { Alert, Typography, Dropdown, Menu, Modal, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ModalFulfillment from "./ModalFulfillment";
import "./UuregTable.css";
import DownloadFile from "../../constcomponents/DownloadFile";
import Tour from "reactour";
import UuregDetailHeader from "./UuregDetailHeader";
const { confirm } = Modal;
const { Title, Text } = Typography;
export default function UuregDetails() {
  const ctx = useContext(UuregContext);
  if (ctx.state.loadOneTask == true) {
    return <Spin tip="Түр хүлээнэ үү..." />;
  }
  if (ctx.state.selectedTask == null) {
    return (
      <Alert
        message="Алдааны мэдээлэл"
        description="Үүрэг олдсонгүй"
        type="error"
        showIcon
      />
    );
  }
  const menu = (el) => (
    <Menu>
      <Menu.Item key="taniltsah" onClick={() => showIntroducedConfirm(el.id)}>
        Танилцах
      </Menu.Item>
      <Menu.Item
        key="bielelt"
        onClick={() => {
          ctx.setFulfillment(el.id);
        }}
      >
        Биелэлт оруулах
      </Menu.Item>
    </Menu>
  );
  const showIntroducedConfirm = (id) => {
    confirm({
      title: "Анхааруулга",
      icon: <ExclamationCircleOutlined />,
      content: "Танилцсанаар тэмдэглэх үү!",
      okText: "Тийм",
      okType: "info",
      cancelText: "Үгүй",
      onOk() {
        ctx.setIntroduce(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div>
      <UuregDetailHeader />
      <div style={{ padding: "5px" }}>
        <ModalFulfillment />
        <div>Үүрэг:</div>
        <div>
          <Title level={4}>{ctx.state.selectedTask.tsk}</Title>
        </div>
        <div>Хэнээс:</div>
        <Title level={5}>{ctx.state.selectedTask.frm}</Title>
        <div>Хэнд:</div>
        <Title level={5}>{ctx.state.selectedTask.top}</Title>
        <div>Хугацаа:</div>
        <Text>
          Эхлэх: {ctx.state.selectedTask.bdt} <br />
          Дуусах: {ctx.state.selectedTask.bdt}
        </Text>
        <Title level={3}>Үүргийн биелэлт</Title>
        <table>
          <thead>
            <tr key={"header"}>
              <th rowSpan={2}>Анги</th>
              <th colSpan={2}>Танилцсан</th>
              <th rowSpan={2}>Гүйцэтгэл</th>
              <th rowSpan={2}>Тайлбар</th>
              <th rowSpan={2}>Файл</th>
              <th colSpan={2}>Биелэлт оруулсан</th>
            </tr>
            <tr key={"header1"}>
              <th>Ажилтан</th>
              <th>Огноо</th>
              <th>Ажилтан</th>
              <th>Огноо</th>
            </tr>
          </thead>
          <tbody>
            {ctx.state.selectedTaskDetails != null &&
              ctx.state.selectedTaskDetails?.map((el) => (
                <Dropdown overlay={menu(el)} trigger={["contextMenu"]}>
                  <tr key={el.id}>
                    <td>
                      <div style={{ width: "70px", maxWidth: "100px" }}>
                        {el.sqd}
                      </div>
                    </td>
                    <td>
                      <div style={{ width: "200px", maxWidth: "200px" }}>
                        {el.ntr}
                      </div>
                    </td>
                    <td>
                      <div style={{ width: "130px", maxWidth: "130px" }}>
                        {el.idt}
                      </div>
                    </td>
                    <td>
                      <div style={{ width: "100px", maxWidth: "100px" }}>
                        {el.prp}
                      </div>
                    </td>
                    <td>
                      <div style={{ width: "250px", maxWidth: "250px" }}>
                        {el.cmt}
                      </div>
                    </td>
                    <td>
                      <div style={{ width: "130px" }}>
                        {el.uploadfiles != null &&
                          el.uploadfiles?.map((el) => (
                            <DownloadFile
                              filename={el.name}
                              bucket={el.bucket}
                              filetype={el.type}
                            />
                          ))}
                      </div>
                    </td>
                    <td>
                      <div style={{ width: "200px", maxWidth: "200px" }}>
                        {el.flf}
                      </div>
                    </td>
                    <td>
                      <div style={{ width: "130px", maxWidth: "130px" }}>
                        {el.fdt}
                      </div>
                    </td>
                  </tr>
                </Dropdown>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
