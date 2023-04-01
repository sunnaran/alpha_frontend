import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";

import rawData from "./data.js";
import { Table, Input } from "antd";

const baseColumns = [
  {
    title: "Name",
    dataIndex: "Name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Company",
    dataIndex: "Company",
    key: "company",
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "email",
  },
  {
    title: "City",
    dataIndex: "City",
    key: "city",
  },
  {
    title: "Salary",
    dataIndex: "Salary",
    key: "Salary",
  },
  {
    title: "Enable",
    dataIndex: "Enable",
    key: "enable",
  },
  {
    title: "EnterDate",
    dataIndex: "EnterDate",
    key: "enterDate",
  },
  {
    title: "Personal",
    dataIndex: "Personal",
    key: "personal",
  },
];

export default class MyCSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { filterTable: null, columns: baseColumns, baseData: rawData };
  }

  search = (value) => {
    const { baseData } = this.state;
    console.log("PASS", { value });

    const filterTable = baseData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    this.setState({ filterTable });
  };

  render() {
    const { filterTable, columns, baseData } = this.state;

    return (
      <div>
        <Input.Search
          style={{ border: "3px solid red", margin: "0 0 10px 0" }}
          placeholder="Search by..."
          enterButton
          onSearch={this.search}
        />
        <Table
          columns={columns}
          dataSource={filterTable == null ? baseData : filterTable}
        />
      </div>
    );
  }
}
