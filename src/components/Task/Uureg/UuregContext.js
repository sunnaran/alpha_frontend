import React, { useState, useEffect, useContext } from "react";
import { message } from "antd";
import axios from "../../../util/myAxios";
const UuregContext = React.createContext();
const initialState = {
  //data
  loadOneTask: false,
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

  //findOneTask
  selectedTask: null,
  selectedTaskDetails: null,

  //Uureg Detail
  showFulfillmentModal: false,
  selectedFulfillmentID: null,
  guitsetgel: null,
  tailbar: null,
};
export const UuregStore = (props) => {
  const [state, setState] = useState(initialState);

  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const onSaveOrUpdate = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    if (
      state.tsk == null ||
      state.frm == null ||
      state.top == null ||
      state.bdt == null ||
      state.edt == null ||
      state.checkedList.length == 0
    ) {
      message.error("Талбаруудыг гүйцэт бөглөнө үү");
      return;
    }

    setState({ ...state, loadingSave: true, error: false });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 110001,
      },
    };
    const data = {
      token,
      id: state.id,
      tsk: state.tsk,
      frm: state.frm,
      top: state.top,
      bdt: state.bdt,
      edt: state.edt,
      lst: state.checkedList.toString(),
      lstarray: state.checkedList,
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
        request_code: 110000,
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
      tsk: null,
      frm: null,
      top: null,
      bdt: null,
      edt: null,
      lst: null,
      usr: null,
      cdt: null,
      tms: null,
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
        request_code: 110003,
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
        request_code: 110000,
      },
    };
    const data = {
      token,
      page_size: state.page_size,
      page_number: state.page_number,
      tsk: state.tsk,
      frm: state.frm,
      top: state.top,
      bdt: state.bdt,
      edt: state.edt,
      lst: state.lst,
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
        message.info("Алдаа гарлаа: code is 105000");
      });
  };

  const openUpdate = (el) => {
    setState((state) => ({
      ...state,
      showInsert: true,
      id: el.id,
      tsk: el.tsk,
      frm: el.frm,
      top: el.top,
      bdt: el.bdt,
      edt: el.edt,
      checkedList: el.lst.split(","),
      uploadfiles: el.uploadfiles == null ? [] : el.uploadfiles,
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
  const getTaskByID = (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 110004,
      },
    };
    const data = {
      token,
      id,
    };
    changeStateValue("loadOneTask", true);
    axios
      .post("/public/request", data, configload)
      .then((response) => {
        if (response.data.code == 401) {
          sessionStorage.clear();
          window.location.reload(false);
          message.warning(response.data.message);
          return;
        }
        const sqd1 = sessionStorage.getItem("sqd");
        const rle = sessionStorage.getItem("role");
        let taskdetails = [];
        if (rle == "scr") {
          taskdetails =
            response.data.result.details != null
              ? response.data.result.details.filter((el) => el.sqd == sqd1)
              : [];
        } else {
          taskdetails =
            response.data.result.details != null
              ? response.data.result.details
              : [];
        }

        setState((state) => ({
          ...state,
          loadOneTask: false,
          selectedTask:
            response.data.result.main != null
              ? response.data.result.main
              : null,
          selectedTaskDetails: taskdetails,
          loadOneTask: false,
        }));
      })
      .catch((error) => {
        changeStateValue("loadOneTask", false);
        message.info("Алдаа гарлаа: code is 110004");
      });
  };

  const setIntroduce = (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 110005,
      },
    };
    const data = {
      token,
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
        setState((state) => ({
          ...state,
          loadingData: false,
        }));
        getTaskByID(state.selectedTask.id);
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа: code is 110005");
      });
  };
  const setFulfillment = (id) => {
    setState((state) => ({
      ...state,
      selectedFulfillmentID: id,
      showFulfillmentModal: true,
      guitsetgel: state.selectedTaskDetails.find((el) => el.id == id).prp,
      tailbar: state.selectedTaskDetails.find((el) => el.id == id).cmt,
      uploadfiles:
        state.selectedTaskDetails.find((el) => el.id == id).uploadfiles == null
          ? []
          : state.selectedTaskDetails.find((el) => el.id == id).uploadfiles,
    }));
  };
  const onSaveFulfillment = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 110005,
      },
    };
    const data = {
      token,
      id: state.selectedFulfillmentID,
      prp: state.guitsetgel,
      cmt: state.tailbar,
      uploadfiles: state.uploadfiles,
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
        setState((state) => ({
          ...state,
          loadingData: false,
          showFulfillmentModal: false,
        }));
        getTaskByID(state.selectedTask.id);
        message.info("Амжилттай хадгалагдлаа");
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа: code is 110005");
      });
  };
  const closeFulfillment = () => {
    setState((state) => ({
      ...state,
      showFulfillmentModal: false,
    }));
  };

  return (
    <UuregContext.Provider
      value={{
        state,
        closeFulfillment,
        onSaveFulfillment,
        setIntroduce,
        setFulfillment,
        setCheckedList,
        changeStateValue,
        onDeleteFile,
        onSaveOrUpdate,
        filterData,
        loadAllData,
        deleteData,
        openUpdate,
        closeModal,
        getTaskByID,
      }}
    >
      {props.children}
    </UuregContext.Provider>
  );
};
export default UuregContext;
