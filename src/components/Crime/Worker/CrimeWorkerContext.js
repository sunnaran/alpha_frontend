import React, { useState, useEffect, useContext } from "react";
import { message } from "antd";
import axios from "../../../util/myAxios";
const CrimeWorkerContext = React.createContext();
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
  id: null,
  sqd: null,
  doc: null,
  ltp: null,
  lnm: null,
  mnt: null,
  tip: null,
  cnt: null,
  ntr: null,
  imp: null,
  hrs: null,
  usr: null,
  cdt: null,
  uploadfiles: [],
  filter: false,

  //Pagination
  page_number: 1,
  page_size: 50,
  total_row: null,
  start_row: null,
  end_row: null,
  total_page: null,
};
export const CrimeWorkerStore = (props) => {
  const [state, setState] = useState(initialState);
  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const onSaveOrUpdate = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    if (
      state.sqd == null ||
      state.rnk == null ||
      state.bdt == null ||
      state.fnm == null ||
      state.lnm == null ||
      state.pst == null ||
      state.bpl == null ||
      state.edu == null ||
      state.occ == null ||
      state.sch == null ||
      state.yof == null ||
      state.wex == null ||
      state.hrs == null ||
      state.adt == null
    ) {
      message.error("Талбаруудыг гүйцэт бөглөнө үү");
      return;
    }
    setState({ ...state, loadingSave: true, error: false });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 105001,
      },
    };
    const data = {
      token,
      id: state.id,
      sqd: state.sqd,
      pht: state.pht,
      rnk: state.rnk,
      lnm: state.lnm,
      fnm: state.fnm,
      pst: state.pst,
      bdt: state.bdt,
      bpl: state.bpl,
      edu: state.edu,
      occ: state.occ,
      sch: state.sch,
      yof: state.yof,
      wex: state.wex,
      hrs: state.hrs,
      adt: state.adt,
      uploadfiles: state.uploadfiles,
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
        loadAllData();
        message.info("Амжилттай хадгалагдлаа");
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
        request_code: 105000,
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
      hrs: null,
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
        message.info("Алдаа гарлаа: code is 105000");
      });
  };

  const deleteData = (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 105003,
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
        request_code: 105000,
      },
    };
    const data = {
      token,
      page_size: state.page_size,
      page_number: state.page_number,
      sqd: state.sqd,
      rnk: state.rnk,
      lnm: state.lnm,
      fnm: state.fnm,
      pst: state.pst,
      bdt: state.bdt,
      bpl: state.bpl,
      edu: state.edu,
      occ: state.occ,
      sch: state.sch,
      yof: state.yof,
      wex: state.wex,
      adt: state.adt,
      usr: state.usr,
      cdt: state.cdt,
      hrs: state.hrs,
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
        message.info("Алдаа гарлаа: code is 105000");
      });
  };

  const openUpdate = (el) => {
    console.log("OPEN UPDATE");

    setState((state) => ({
      ...state,
      showInsert: true,
      id: el.id,
      pht: el.pht,
      rnk: el.rnk,
      lnm: el.lnm,
      fnm: el.fnm,
      pst: el.pst,
      bdt: el.bdt,
      bpl: el.bpl,
      edu: el.edu,
      occ: el.occ,
      sch: el.sch,
      yof: el.yof,
      wex: el.wex,
      adt: el.adt,
      usr: el.usr,
      cdt: el.cdt,
      sqd: el.sqd,
      hrs: el.hrs,
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
      hrs: null,
    }));
  };
  return (
    <CrimeWorkerContext.Provider
      value={{
        state,
        changeStateValue,
        onDeleteFile,
        onSaveOrUpdate,
        filterData,
        loadAllData,
        deleteData,
        openUpdate,
        closeModal,
      }}
    >
      {props.children}
    </CrimeWorkerContext.Provider>
  );
};
export default CrimeWorkerContext;
