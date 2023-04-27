import React, {useState} from "react";
import axios from "../../util/myAxios";
import {message} from "antd";
const PosContext = React.createContext();
const initialState = {
  shireenuud: [],
  baraanuud: [],
  baraaangilal: [],
  total_row : null,
  start_row : null,
  end_row: null,
  total_page: null,
  loading: false,
  //pos grid
  loading: false,
  order: null,
  selectedOrderItem: null,
  selectedTableId: null,

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
  changeStateValue("loading", true);
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
        shireenuud: response.data.result.list,
        total_row,
        start_row,
        end_row,
        total_page,
        loading: false,
      }));
    })
    .catch((error) => {
      changeStateValue("loading", false);
      message.info("Алдаа гарлаа");
    });
};

const getBaraa = () => {
  const token = JSON.parse(sessionStorage.getItem("token"))?.token;
  const configload = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      request_code: 124000,
    },
  };
  const data = {
    
    token,
  };
  changeStateValue("loading", true);
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
        baraanuud: response.data.result.list,
        total_row,
        start_row,
        end_row,
        total_page,
        loading: false,
      }));
    })
    .catch((error) => {
      changeStateValue("loading", false);
      message.info("Алдаа гарлаа 124000");
    });
};


const getBaraaAngilal = () => {
  const token = JSON.parse(sessionStorage.getItem("token"))?.token;
  const configload = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      request_code: 100001,
    },
  };
  const data = {
    search_text:"baraaniiturul",
    token,
  };
  changeStateValue("loading", true);
  axios
    .post("/public/request", data, configload)
    .then((response) => {
      if (response.data.code == 401) {
        sessionStorage.clear();
        window.location.reload(false);
        message.warning(response.data.message);
        return;
      }
       
      setState((state) => ({
        ...state,
        baraaangilal: response.data.result.list,
        
        loading: false,
      }));
    })
    .catch((error) => {
      changeStateValue("loading", false);
      message.info("Алдаа гарлаа 10011001");
    });
};



const changeStateValue = (name, value) => {
  setState((state) => ({ ...state, [name]: value }));
};

  return (
    <PosContext.Provider
      value={{
        state,getShiree,getBaraa, getBaraaAngilal, changeStateValue 
      }}
    >
      {props.children}
    </PosContext.Provider>
  );
};
export default PosContext;
