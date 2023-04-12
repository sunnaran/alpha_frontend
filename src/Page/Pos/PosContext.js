import React, {useState} from "react";
import axios from "../../util/myAxios";
import {message} from "antd";
const PosContext = React.createContext();
const initialState = {
  shireenuud: [],

};

export const PosStore = (props) => {
  const [state, setState] = useState(initialState);
  
const getShiree = () => {
  const token = JSON.parse(sessionStorage.getItem("token"))?.token;
  const configload = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      request_code: 123000,
    },
  };
  const data = {
    
    token,
  };
  changeStateValue("loadingData", true);
  axios
    .post("/public/request", data, configload)
    .then((response) => {
      if (response.data.code == 401) {
        sessionStorage.clear();
        window.location.reload(false);
        message.warning(response.data.message);
        return;
      }
      let start_row = response.data.result.pagination.start_row;
      let end_row = response.data.result.pagination.end_row;
      let total_row = response.data.result.pagination.total_row;
      let total_page = response.data.result.pagination.total_page;
      setState((state) => ({
        ...state,
        mylist: response.data.result.list,
        total_row,
        start_row,
        end_row,
        total_page,
        loadingData: false,
      }));
    })
    .catch((error) => {
      changeStateValue("loadingData", false);
      message.info("Алдаа гарлаа 123");
    });
};

const changeStateValue = (name, value) => {
  setState((state) => ({ ...state, [name]: value }));
};

  return (
    <PosContext.Provider
      value={{
        state,
      }}
    >
      {props.children}
    </PosContext.Provider>
  );
};
export default PosContext;
