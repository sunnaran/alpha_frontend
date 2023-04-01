import React, { useState, useEffect, useContext } from "react";
import { message } from "antd";
import axios from "../../../util/myAxios";
const CrimeReportContext = React.createContext();
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
export const CrimeReportStore = (props) => {
  const [state, setState] = useState(initialState);
  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const onSaveOrUpdate = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    if (
      state.sqd == null ||
      state.doc == null ||
      state.ltp == null ||
      state.lnm == null ||
      state.mnt == null ||
      state.tip == null ||
      state.cnt == null
    ) {
      message.error("Талбаруудыг гүйцэт бөглөнө үү");
      return;
    }
    setState({ ...state, loadingSave: true, error: false });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 104001,
      },
    };
    const data = {
      token,
      id: state.id,
      sqd: state.sqd,
      doc: state.doc,
      ltp: state.ltp,
      lnm: state.lnm,
      mnt: state.mnt,
      tip: state.tip,
      cnt: state.cnt,
      ntr: state.ntr,
      imp: state.imp,
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
        request_code: 104000,
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
      sqd: null,
      doc: null,
      ltp: null,
      lnm: null,
      mnt: null,
      tip: null,
      cnt: null,
      ntr: null,
      imp: null,
      uploadfiles: [],
      usr: null,
      cdt: null,
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
 console.log("state begin");
        let listpage1 = [];
        for (let i = 1; i <= response.data.result.pagination.total_page; i++) {
          listpage1.push(i);
        }

        setState((state) => ({
          ...state,
          dataList:
            response.data.result.list != null ? response.data.result.list : [],
          total_row,
          start_row,
          end_row,
          total_page,
          listpage: listpage1,
          loadingData: false,
        }));
        console.log("state end");
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа: code 104000");
        console.log('error =========================================================================================');
        console.log(error);
      
      });
  };

  const deleteData = (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 104003,
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
        request_code: 104000,
      },
    };
    const data = {
      token,
      page_size: state.page_size,
      page_number: state.page_number,
      sqd: state.sqd,
      doc: state.doc,
      ltp: state.ltp,
      lnm: state.lnm,
      mnt: state.mnt,
      tip: state.tip,
      cnt: state.cnt,
      ntr: state.ntr,
      imp: state.imp,
      usr: state.usr,
      cdt: state.cdt,
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
        message.info("Алдаа гарлаа: code is 103000");
      });
  };

  const openUpdate = (el) => {
    let myuploadfiles = [];
    el.uploadfiles != null &&
      el.uploadfiles.map((el) =>
        myuploadfiles.push({
          id: el.id,
          bucket: el.bucket,
          name: el.name,
          oldname: el.oldname,
          filetype: el.type,
          filesize: el.size,
        })
      );

    setState((state) => ({
      ...state,
      showInsert: true,
      id: el.id,
      sqd: el.sqd,
      doc: el.doc,
      ltp: el.ltp,
      lnm: el.lnm,
      mnt: el.mnt,
      tip: el.tip,
      cnt: el.cnt,
      ntr: el.ntr,
      imp: el.imp,
      usr: el.usr,
      cdt: el.cdt,

      uploadfiles: myuploadfiles,
    }));
  };

  return (
    <CrimeReportContext.Provider
      value={{
        state,
        changeStateValue,
        onDeleteFile,
        onSaveOrUpdate,
        filterData,
        loadAllData,
        deleteData,
        openUpdate,
      }}
    >
      {props.children}
    </CrimeReportContext.Provider>
  );
};
export default CrimeReportContext;
