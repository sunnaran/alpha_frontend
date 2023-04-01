import React, { createContext, useState } from "react";
import axios from "../util/myAxios";
import axiosNode from "../util/myNodeAxios";
import { message } from "antd";
import { Redirect, useHistory } from "react-router-dom";

const FileCenterContext = React.createContext();
const initialState = {
  loadingUploadFile: false,
  listCategory: [],
  loadingGetCategory: false,
  id: null,
  title: "",
  aktno: "",
  datebatlagdsan: null,
  datedagajmurduh: null,
  isvalid: "Хүчинтэй",
  uploadfiles: [],
  loadingSaveUpdate: false,
  selectedCategoryId: null,
  loadingData: false, //Үндсэн хүснэгтэд өгөгдөл дуудах
  mylist: [],

  s_catid: null,
  s_aktno: null,
  s_name: null,
  s_dateverified: null,
  s_datevalid: null,
  s_isvalid: null,
  s_createduser: null,
  s_page_size: 50,
  s_page_number: 1,
  showModal: false,
  isInsert: false,
  loadingSave: false,
  error: false,
  errorMessage: "",

  //

  // Pagination
  total: 100,
  pageCount: 10,
  start: 1,
  end: 10,
  limit: 2,
  nextPage: 6,
  prevPage: 4,
  currPage: 5,
  total_row: 0,
  listpage: [],

  // Report
};

export const FileCenterStore = (props) => {
  const [state, setState] = useState(initialState);
  let history = useHistory();
  const openUpdate = (id) => {
    const found = state.mylist.find((element) => element.id == id);
    console.log(found);
    setState((state) => ({
      ...state,
      showModal: true,
      isInsert: false,
      id: found.id,
      selectedCategoryId: found.catid,
      aktno: found.aktno,
      title: found.name,
      uploadfiles: found.uploadfiles != null ? found.uploadfiles : [],
      datebatlagdsan: found.batlagdsanognoo,
      datedagajmurduh: found.dagajmurduhognoo,
      isvalid: found.vld,
    }));
    console.log(id);
  };
  const onDeleteFile = (index1) => {
    let arr;
    arr = state.uploadfiles.filter((item, index) => index !== index1);
    changeStateValue("uploadfiles", arr);
  };

  const getCategories = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;

    changeStateValue("loadingGetCategory", true);
    axios
      .post("/public/request", null, {
        headers: {
          request_code: 101000,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(response.data.message);
          return;
        }
        if (response.data.code == 400) {
          message.warning(response.data.message);
          return;
        }
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(response.data.message);
          return;
        }

        setState((state) => ({
          ...state,
          listCategory: response.data.result.list,
          loadingGetCategory: false,
        }));
      })
      .catch((err) => {
        changeStateValue("loadingGetCategory", false);
        message.error(
          err.response != undefined
            ? err.response.data.result
            : "Сервертэй холбогдож чадсангүй"
        );
      });
  };

  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  const changeStateFilterValue = (name, value) => {
    let value1 = null;
    if (value != "") value1 = value;
    setState((state) => ({ ...state, [name]: value1 }));
  };

  const loadDataList = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 102005,
      },
    };
    const data = {
      catid: state.s_catid,
      aktno: state.s_aktno,
      name: state.s_name,
      dateverified: state.s_dateverified,
      datevalid: state.s_datevalid,
      isvalid: state.s_isvalid,
      createduser: state.s_createduser,
      page_size: state.s_page_size,
      page_number: state.s_page_number,
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
  const loadDataListAll = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 102005,
      },
    };
    const data = {
      catid: null,
      aktno: null,
      name: null,
      dateverified: null,
      datevalid: null,
      isvalid: null,
      createduser: null,
      page_size: state.s_page_size,
      page_number: state.s_page_number,
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
        message.info("Алдаа гарлаа: code 102005B");
      });
  };
  const deleteFileCenter = (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 102003,
      },
    };
    const data = {
      id,
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
        changeStateValue("loadingData", false);
        message.info(response.data.message);
        loadDataList();
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.error("Алдаа гарлаа");
      });
  };
  const saveData = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    if (
      state.selectedCategoryId == null ||
      state.datebatlagdsan == null ||
      state.datedagajmurduh == null ||
      state.isvalid == null ||
      state.title == "" ||
      state.uploadfiles == []
    ) {
      setState((state) => ({
        ...state,
        error: true,
        errorMessage: "Талбаруудыг гүйцэт бөглөнө үү....",
      }));
      return;
    }
    setState({ ...state, loadingSave: true, error: false });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 102001,
      },
    };

    const data = {
      id: state.id,
      aktno: state.aktno,
      name: state.title,
      batlagdsanognoo: state.datebatlagdsan,
      dagajmurduhognoo: state.datedagajmurduh,
      vld: state.isvalid,
      catid: state.selectedCategoryId,
      nemelt: state.uploadfiles,
      token,
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
        const loaddata = response.data.data;
        setState({
          ...state,
          listData: loaddata,
          error: false,
          loadingSave: false,
          success: true,
          showModal: false,
          isInsert: false,
        });
        message.info("Амжилттай хадгалагдлаа");
        loadDataList();
      })
      .catch((error) => {
        setState({
          ...state,
          error: true,
          errorMessage: "Алдаа гарлаа:",
          loadingSave: false,
          success: false,
          successMessage: null,
        });
      });
  };

  const cancelFilter = () => {
    setState((state) => ({
      ...state,
      s_catid: null,
      s_aktno: null,
      s_name: null,
      s_isvalid: null,
      s_dateverified: null,
      s_datevalid: null,
      s_createduser: null,
      s_page_number: 1,
    }));
    loadDataListAll();
  };

  const setShowModal = () => {
    setState((state) => ({
      ...state,
      id: null,
      showModal: true,
      isInsert: true,
    }));
  };
  return (
    <FileCenterContext.Provider
      value={{
        state,
        openUpdate,
        setShowModal,
        loadDataList,
        loadDataListAll,
        deleteFileCenter,
        changeStateValue,
        changeStateFilterValue,
        saveData,
        cancelFilter,

        getCategories,
        onDeleteFile,
      }}
    >
      {props.children}
    </FileCenterContext.Provider>
  );
};

export default FileCenterContext;
