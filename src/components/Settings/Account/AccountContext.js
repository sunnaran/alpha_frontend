import React, { useState, useEffect, useContext } from "react";
import { message } from "antd";
import axios from "../../../util/myAxios";
const AccountContext = React.createContext();
const initialState = {
  //data
  dataList: [],
  selectedPerson: [],
  // Modal
  showInsert: false,
  // Loading
  loadingSave: false,
  loadingData: false,
  loadingMenu: false,
  // Error
  error: false,
  errorMessage: null,
  // БҮРТГЭЛ НЭМЭХ, ЗАСАХ
  checkedList: [],
  id: null,
  sqd: null,
  id: null,
  sqd: null,
  lnm: null,
  fnm: null,
  rnk: null,
  unm: null,
  cde: null,
  sts: null,
  rle: null,
  pht: null,
  usr: null,
  cdt: null,
  uploadfiles: [],
  filter: false,

  //Pagination
  page_number: 1,
  page_size: 100,
  total_row: null,
  start_row: null,
  end_row: null,
  total_page: null,
};
export const AccountStore = (props) => {
  const [state, setState] = useState(initialState);

  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const onSaveOrUpdate = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    if (
      //      state.pht == null ||
      state.sqd == null ||
      state.lnm == null ||
      state.fnm == null ||
      state.rnk == null ||
      state.unm == null ||
      state.sts == null ||
      state.rle == null
    ) {
      message.error("Талбаруудыг гүйцэт бөглөнө үү");
      return;
    }

    setState({ ...state, loadingSave: true, error: false });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 200001,
      },
    };
    const data = {
      token,
      id: state.id,
      pht: state.pht,
      sqd: state.sqd,
      lnm: state.lnm,
      fnm: state.fnm,
      rnk: state.rnk,
      unm: state.unm,
      cde: state.cde,
      sts: state.sts,
      rle: state.rle,
    };

    axios
      .post("/public/request", data, config)
      .then((response) => {
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(response.data.message);
          return;
        }
        changeStateValue("loadingSave", false);
        if (response.data.code == 400) {
          message.error(response.data.message);
          return;
        }
        message.info("Амжилттай хадгалагдлаа");
        loadAllData();
      })
      .catch((error) => {
        changeStateValue("loadingSave", false);
        console.log(error);
      });
  };

  const onDeleteFile = (index1) => {
    let arr;
    arr = state.uploadfiles.filter((item, index) => index !== index1);
    changeStateValue("uploadfiles", arr);
  };

  const loadAllData = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 200000,
      },
    };
    const data = {
      token,
      page_size: state.page_size,
      page_number: 1,
    };
    setState((state) => ({
      ...state,
      id: null,
      s_sqd: null,
      s_lnm: null,
      s_fnm: null,
      s_rnk: null,
      s_unm: null,
      s_cde: null,
      s_sts: null,
      s_rle: null,
      s_pht: null,
      s_usr: null,
      s_cdt: null,
      filter: false,
      loadingData: true,
      page_number: 1,
    }));
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
          dataList:
            response.data.result.list != null ? response.data.result.list : [],
          total_row,
          start_row,
          end_row,
          total_page,
          loadingData: false,
        }));
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа: code is 200000");
      });
  };

  const deleteData = (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 200003,
      },
    };
    const data = {
      id,
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
        changeStateValue("loadingData", false);
        message.info("Амжилттай устгалаа");
        loadAllData();
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.error("Алдаа гарлаа");
      });
  };
  const filterData = (obj, name, value) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 200000,
      },
    };
    const data = {
      token,
      page_size: state.page_size,
      page_number: state.page_number,
      sqd: state.s_sqd,
      lnm: state.s_lnm,
      fnm: state.s_fnm,
      rnk: state.s_rnk,
      unm: state.s_unm,
      sts: state.s_sts,
      rle: state.s_rle,
      usr: state.s_usr,
      cdt: state.s_cdt,
      [obj]: value,
    };
    changeStateValue("loadingData", true);
    changeStateValue([name], value);
    changeStateValue("filter", true);
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
          dataList:
            response.data.result.list != null ? response.data.result.list : [],
          total_row,
          start_row,
          end_row,
          total_page,
          loadingData: false,
        }));
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа: code is 200000");
      });
  };

  const openInsert = () => {
    setState((state) => ({
      ...state,
      showInsert: true,
      isInsert: true,
      id: null,
      sqd: null,
      lnm: null,
      fnm: null,
      rnk: null,
      unm: null,
      cde: null,
      sts: null,
      rle: null,
      pht: null,
      usr: null,
      cdt: null,
    }));
  };
  const openUpdate = (el) => {
    console.log("OPEN UPDAT");

    setState((state) => ({
      ...state,
      showInsert: true,
      id: el.id,
      pht: el.pht,
      rnk: el.rnk,
      lnm: el.lnm,
      fnm: el.fnm,
      usr: el.usr,
      cdt: el.cdt,
      sqd: el.sqd,
      unm: el.unm,
      sts: el.sts,
      rle: el.rle,
    }));
  };
  const closeModal = () => {
    setState((state) => ({
      ...state,
      showInsert: false,
      id: null,
      pht: null,
      rnk: null,
      lnm: null,
      fnm: null,
      pst: null,
      bdt: null,
      bpl: null,
      edu: null,
      occ: null,
      sch: null,
      yof: null,
      wex: null,
      adt: null,
      usr: null,
      cdt: null,
      sqd: null,
    }));
  };
  const setCheckedList = (list) => {
    setState((state) => ({ ...state, checkedList: list }));
  };
  return (
    <AccountContext.Provider
      value={{
        state,
        setCheckedList,
        changeStateValue,
        onDeleteFile,
        onSaveOrUpdate,
        filterData,
        loadAllData,
        deleteData,
        openUpdate,
        closeModal,
        openInsert,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};
export default AccountContext;
