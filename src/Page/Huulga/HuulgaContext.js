import React, { useState, useEffect, useContext } from "react";
import axios from "../../util/myAxios";
import { message } from "antd";
const HuulgaContext = React.createContext();
const initialState = {
  loading: false,
  list: [],
  //Pagination
  page_number: 1,
  page_size: 40,
  total_row: null,
  start_row: null,
  end_row: null,
  total_page: null,
  listpage: [],
  //filter
  filter: false,
  ognoo: null,
  baraaner: null,
  too: null,
  une: null,
  niitune: null,
  ajiltan: null,
  negj: null,
  shiree: null,
  utga: null,
  tuluw: null,
  
};
export const HuulgaStore = (props) => {
  const [state, setState] = useState(initialState);
  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  const loadData = () => {
    setState((state) => (initialState));
    changeStateValue("loading", true);

    let messagecode = 127000;
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: messagecode,
      },
    };
    const data = {
      token,
      page_number: 1,
      page_size: state.page_size,
    };

    axios
      .post("/public/request", data, configload)
      .then((response) => {
        console.log("success: ", messagecode);
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(response.data.message);
          return;
        }
        if (response.data.code == 400) {
          message.warning(`Амжилтгүй` + response.data.message);
        }
        if (response.data.code == 200) {
          let start_row = response.data.result.pagination.start_row;
          let end_row = response.data.result.pagination.end_row;
          let total_row = response.data.result.pagination.total_row;
          let total_page = response.data.result.pagination.total_page;

          let listpage1 = [];
          for (
            let i = 1;
            i <= response.data.result.pagination.total_page;
            i++
          ) {
            listpage1.push(i);
          }

          setState((state) => ({
            ...state,
            list:
              response.data.result.list != null
                ? response.data.result.list
                : [],
            total_row,
            start_row,
            end_row,
            total_page,
            listpage: listpage1,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        message.info("Алдааны код" + messagecode);
      })
      .finally(() => {
        changeStateValue("loading", false);
      });
  };

  const filterData = (obj, name, value) => {
    console.log([name]);
    console.log(value);
    changeStateValue("loading", true);
    changeStateValue([name], value);
    changeStateValue("filter", true);
    let messagecode = 127000;
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: messagecode,
      },
    };
    const data = {
      token,
      page_size: state.page_size,
      page_number: [name] == "page_number" ? value : state.page_number,
      
      ognoo: state.ognoo,
      baraaner: state.baraaner,
      too: state.too,
      une: state.une,
      niitune: state.niitune,
      ajiltan: state.ajiltan,
      negj: state.negj,
      shiree: state.shiree,
      utga: state.utga,
      tuluw: state.tuluw,
      [name]: value,
    };

    axios
      .post("/public/request", data, configload)
      .then((response) => {
        console.log("success: ", messagecode);
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(response.data.message);
          return;
        }
        if (response.data.code == 400) {
          message.warning(`Амжилтгүй` + response.data.message);
        }
        if (response.data.code == 200) {
          let start_row = response.data.result.pagination.start_row;
          let end_row = response.data.result.pagination.end_row;
          let total_row = response.data.result.pagination.total_row;
          let total_page = response.data.result.pagination.total_page;

          let listpage1 = [];
          for (
            let i = 1;
            i <= response.data.result.pagination.total_page;
            i++
          ) {
            listpage1.push(i);
          }

          setState((state) => ({
            ...state,
            list:
              response.data.result.list != null
                ? response.data.result.list
                : [],
            total_row,
            start_row,
            end_row,
            total_page,
            listpage: listpage1,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        message.info("Алдааны код" + messagecode);
      })
      .finally(() => {
        changeStateValue("loading", false);
      });
  };

  return (
    <HuulgaContext.Provider
      value={{
        state,
        changeStateValue,
        loadData,
        filterData,
      }}
    >
      {props.children}
    </HuulgaContext.Provider>
  );
};
export default HuulgaContext;
