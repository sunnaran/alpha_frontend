import React, { useState, useEffect, useContext } from "react";
import axios from "../../util/myAxios";
import { message } from "antd";
const HuulgaContext = React.createContext();
const initialState = {
  loading: false,
  list: [],
  //Pagination
  page_number: 1,
  page_size: 200,
  total_row: null,
  start_row: null,
  end_row: null,
  total_page: null,
  listpage: []
};
export const HuulgaStore = (props) => {
  const [state, setState] = useState(initialState);
  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  const loadData = () => {
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
        for (let i = 1; i <= response.data.result.pagination.total_page; i++) {
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
      }}
    >
      {props.children}
    </HuulgaContext.Provider>
  );
};
export default HuulgaContext;
