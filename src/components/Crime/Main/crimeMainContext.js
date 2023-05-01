import { message } from "antd";
import { PresetStatusColorTypes } from "antd/lib/_util/colors";
import React, { useState, useEffect, useContext } from "react";
import axios from "../../../util/myAxios";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const CrimeMainContext = React.createContext();
const initialState = {
  //data
  datalist: [],
  selectedperson: [],
  // Modal
  showinsert: false,
  isInsert: true,
  // Loading
  loadingSave: false,
  loadingData: false,
  loading_menu: false,
  // Error
  error: false,
  errorMessage: null,
  // БҮРТГЭЛ НЭМЭХ, ЗАСАХ
  selectedpersonindex: null,
  f_id: null,
  f_sqd_id: null,
  f_sqd_sub_cat: null,
  f_sqd_sub_nme: null,

  f_crm_date: null,
  f_crm_cat: "Зөрчил",
  f_crm_type: [],
  f_rsn: null,
  f_cnclsn: null,
  f_rslvd_id: [],
  f_rslvd_d: null,
  f_rslvd_date: null,
  uploadedFiles: [],
  // БҮРТГЭЖ БУЙ ХҮН form_person
  fp_id: null,
  fp_m_id: null,
  fp_sqd: null,
  fp_sqd_sub: null,
  fp_pstn: null,
  fp_rnk_id: null,
  fp_lst_nme: null,
  fp_fst_nme: null,
  fp_cnn_date: null,
  fp_age: null,
  fp_sex: null,
  fp_bkd: null,
  fp_bkd_nc: null,
  fp_reg: null,
  fp_tstdt: null,
  fp_tudt: null,
  fp_tsteelj: null,
  fp_tstsqd: null,
  fp_edu_id: null,
  fp_pht: null,
  //
  isupdate: false,
  //Table
  p_personlist: [],

  //Filter
  s_page_number: 1,
  s_page_size: 50,
  s_id: null,
  s_sqd_id: null,
  s_sqd_sub_cat: null,
  s_sqd_sub_nme: null,
  s_crm_date: null,
  s_crm_cat: null,
  s_crm_type: null,
  s_rsn: null,
  s_cnclsn: null,
  s_rslvd_id: null,
  s_rslvd_d: null,
  s_crtdusr: null,
  s_rslvd_date: null,
  //PERSON FILTER
  sp_lst_nme: null,
  sp_fst_nme: null,
  sp_reg: null,
  sp_bkd_nc: null,
  sp_rnk_id: null,
  sp_age: null,
  sp_sex: null,
  sp_edu_id: null,

  //Pagination
  total_row: null,
  start_row: null,
  end_row: null,
  total_page: null,
  loadingData: null,
  listpage: [],

  //excel export
  loadingDataForExcel: false,
  showExcellAllButton: false,
  excelDataList: [],
  excelDataCNN: [],
};
export const CrimeMainStore = (props) => {
  const [state, setState] = useState(initialState);
  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  const dataSet1 = [
    {
      name: "Johson",
      amount: 30000,
      sex: "M",
      is_married: true,
    },
    {
      name: "Monika",
      amount: 355000,
      sex: "F",
      is_married: false,
    },
    {
      name: "John",
      amount: 250000,
      sex: "M",
      is_married: false,
    },
    {
      name: "Josef",
      amount: 450500,
      sex: "M",
      is_married: true,
    },
  ];
  const dataSet2 = [
    {
      name: "Johnson",
      total: 25,
      remainig: 16,
    },
    {
      name: "Josef",
      total: 25,
      remainig: 7,
    },
  ];

  const excelExportOnePage = () => {
    console.log("One Page");
  };

  const removePerson = (index1) => {
    let myarray = state.p_personlist.filter((item, index) => index != index1);
    changeStateValue("p_personlist", myarray);
    changeStateValue("isupdateperson", false);
  };
  const clickedPerson = (index1) => {
    let fp_id = state.p_personlist[index1]?.fp_id;
    let fp_m_id = state.p_personlist[index1]?.fp_m_id;
    let fp_sqd = state.p_personlist[index1]?.fp_sqd;
    let fp_sqd_sub = state.p_personlist[index1]?.fp_sqd_sub;
    let fp_pstn = state.p_personlist[index1]?.fp_pstn;
    let fp_rnk_id = state.p_personlist[index1]?.fp_rnk_id;
    let fp_lst_nme = state.p_personlist[index1]?.fp_lst_nme;
    let fp_fst_nme = state.p_personlist[index1]?.fp_fst_nme;
    let fp_cnn_date = state.p_personlist[index1]?.fp_cnn_date;
    let fp_age = state.p_personlist[index1]?.fp_age;
    let fp_sex = state.p_personlist[index1]?.fp_sex;
    let fp_bkd = state.p_personlist[index1]?.fp_bkd;
    let fp_bkd_nc = state.p_personlist[index1]?.fp_bkd_nc;
    let fp_reg = state.p_personlist[index1]?.fp_reg;
    let fp_tstdt = state.p_personlist[index1]?.fp_tstdt;
    let fp_tudt = state.p_personlist[index1]?.fp_tudt;
    let fp_tsteelj = state.p_personlist[index1]?.fp_tsteelj;
    let fp_tstsqd = state.p_personlist[index1]?.fp_tstsqd;
    let fp_edu_id = state.p_personlist[index1]?.fp_edu_id;
    let fp_pht = state.p_personlist[index1]?.fp_pht;
    setState((state) => ({
      ...state,
      fp_id,
      fp_m_id,
      fp_sqd,
      fp_sqd_sub,
      fp_pstn,
      fp_rnk_id,
      fp_lst_nme,
      fp_fst_nme,
      fp_cnn_date,
      fp_age,
      fp_sex,
      fp_bkd,
      fp_bkd_nc,
      fp_reg,
      fp_tstdt,
      fp_tudt,
      fp_tsteelj,
      fp_tstsqd,
      fp_edu_id,
      fp_pht,
      isupdateperson: true,
      selectedpersonindex: index1,
    }));
  };
  const pushPerson = () => {
    if (
      state.fp_lst_nme == null ||
      state.fp_fst_nme == null ||
      state.fp_rnk_id == null ||
      state.fp_pstn == null
    ) {
      message.error("Холбогдогчийн мэдээллийг гүйцэт оруулна уу");
      return;
    }
    let new_p_personlist = [];
    state.p_personlist?.length > 0 &&
      state.p_personlist?.map((el) => {
        new_p_personlist.push(el);
      });
    new_p_personlist.push({
      fp_id: state.fp_id,
      fp_m_id: state.fp_m_id,
      fp_sqd: state.fp_sqd,
      fp_sqd_sub: state.fp_sqd_sub,
      fp_pstn: state.fp_pstn,
      fp_rnk_id: state.fp_rnk_id,
      fp_lst_nme: state.fp_lst_nme,
      fp_fst_nme: state.fp_fst_nme,
      fp_cnn_date: state.fp_cnn_date,
      fp_age: state.fp_age,
      fp_sex: state.fp_sex,
      fp_bkd: state.fp_bkd,
      fp_bkd_nc: state.fp_bkd_nc,
      fp_reg: state.fp_reg,
      fp_tstdt: state.fp_tstdt,
      fp_tudt: state.fp_tudt,
      fp_tsteelj: state.fp_tsteelj,
      fp_tstsqd: state.fp_tstsqd,
      fp_edu_id: state.fp_edu_id,
      fp_pht: state.fp_pht,
      selectedpersonindex: null,
      isupdateperson: false,
    });
    changeStateValue("p_personlist", new_p_personlist);
  };
  const updatePerson = () => {
    let new_p_personlist = [];
    state.p_personlist?.map((el, index) => {
      index != state.selectedpersonindex
        ? new_p_personlist.push(el)
        : new_p_personlist.push({
            fp_id: state.fp_id,
            fp_m_id: state.fp_m_id,
            fp_sqd: state.fp_sqd,
            fp_sqd_sub: state.fp_sqd_sub,
            fp_pstn: state.fp_pstn,
            fp_rnk_id: state.fp_rnk_id,
            fp_lst_nme: state.fp_lst_nme,
            fp_fst_nme: state.fp_fst_nme,
            fp_cnn_date: state.fp_cnn_date,
            fp_age: state.fp_age,
            fp_sex: state.fp_sex,
            fp_bkd: state.fp_bkd,
            fp_bkd_nc: state.fp_bkd_nc,
            fp_reg: state.fp_reg,
            fp_tstdt: state.fp_tstdt,
            fp_tudt: state.fp_tudt,
            fp_tsteelj: state.fp_tsteelj,
            fp_tstsqd: state.fp_tstsqd,
            fp_edu_id: state.fp_edu_id,
            fp_pht: state.fp_pht,
            selectedpersonindex: null,
            isupdateperson: false,
          });
    });
    changeStateValue("p_personlist", new_p_personlist);
  };
  const saveAndUpdateCrimeMain = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    if (
      state.f_sqd_sub_cat == null ||
      state.f_sqd_sub_nme == null ||
      state.f_crm_date == null ||
      state.f_crm_cat == null ||
      state.f_crm_type == null
    ) {
      message.error("Талбаруудыг гүйцэт бөглөнө үү");
      return;
    }
    if (state.p_personlist.length < 1) {
      message.error("Ядаж нэг холбогдогчийн мэдээлэл оруулна уу");
      return;
    }
    setState({ ...state, loadingSave: true, error: false });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 103001,
      },
    };

    const data = {
      token,
      f_id: state.f_id,
      f_sqd_id: state.f_sqd_id,
      f_sqd_sub_cat: state.f_sqd_sub_cat,
      f_sqd_sub_nme: state.f_sqd_sub_nme,
      f_crm_date: state.f_crm_date,
      f_crm_cat: state.f_crm_cat,
      f_crm_type: state.f_crm_type.toString(),
      f_rsn: state.f_rsn,
      f_cnclsn: state.f_cnclsn,
      f_rslvd_id: state.f_rslvd_id.toString(),
      f_rslvd_d: state.f_rslvd_d,
      f_rslvd_date: state.f_rslvd_date,
      uploadedfiles: state.uploadedFiles,
      l_personlist: state.p_personlist,
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
        console.log(response.data);
        changeStateValue("loadingSave", false);
        loadDataListAll();
        message.info("Амжилттай хадгалагдлаа");
      })
      .catch((error) => {
        changeStateValue("loadingSave", false);
        console.log(error);
      });
  };
  const onDeleteFile = (index1) => {
    let arr;
    arr = state.uploadedFiles.filter((item, index) => index !== index1);
    changeStateValue("uploadedFiles", arr);
  };
  const getData = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 103000,
      },
    };
    const data = {
      token,
      page_number: state.s_page_number,
      page_size: state.s_page_size,
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
          data:
            response.data.result.list == null ? [] : response.data.result.list,
          total_row,
          start_row,
          end_row,
          total_page,
          loadingData: false,
        }));
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа: Kод 103000");
      });
  };

  const filterData = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 103000,
      },
    };
    const data = {
      token,
      page_size: state.s_page_size,
      page_number: state.s_page_number,
      sqd_id: state.s_sqd_id,
      sqd_sub_cat: state.s_sqd_sub_cat,
      sqd_sub_nme: state.s_sqd_sub_nme,
      crm_date: state.s_crm_date,
      crm_cat: state.s_crm_cat,
      crm_type: state.s_crm_type,
      rsn: state.s_rsn,
      cnclsn: state.s_cnclsn,

      rslvd_id: state.s_rslvd_id,
      rslvd_d: state.s_rslvd_d,
      crtdusr: state.s_crtdusr,
      sp_lst_nme: state.sp_lst_nme,
      sp_fst_nme: state.sp_fst_nme,
      sp_reg: state.sp_reg,
      sp_bkd_nc: state.sp_bkd_nc,
      sp_rnk_id: state.sp_rnk_id,
      sp_age: state.sp_age,
      sp_sex: state.sp_sex,
      sp_edu_id: state.sp_edu_id,
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
        let selectedperson1 = [];
        if (response.data.result.list != null) {
          if (response.data.result.list?.length > 0) {
            selectedperson1 = response.data.result.list[0].person_list;
          }
        }

        setState((state) => ({
          ...state,
          datalist:
            response.data.result.list != null ? response.data.result.list : [],
          total_row,
          start_row,
          end_row,
          total_page,
          loadingData: false,
          selectedperson: selectedperson1,
        }));
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info(
          "Серверээс өгөгдөл дуудахад алдаа гарлаа: Алдааны код 103000"
        );
      });
  };
  const filterDataDown = (obj, name, value) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 103000,
      },
    };
    const data = {
      token,
      page_size: state.s_page_size,
      page_number: state.s_page_number,
      sqd_id: state.s_sqd_id,
      sqd_sub_cat: state.s_sqd_sub_cat,
      sqd_sub_nme: state.s_sqd_sub_nme,
      crm_date: state.s_crm_date,
      crm_cat: state.s_crm_cat,
      crm_type: state.s_crm_type,
      rsn: state.s_rsn,
      cnclsn: state.s_cnclsn,
      rslvd_id: state.s_rslvd_id,
      crtdusr: state.s_crtdusr,
      rslvd_d: state.s_rslvd_d,
      [obj]: value,
    };
    changeStateValue("loadingData", true);
    changeStateValue([name], value);
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
        let selectedperson1 = [];
        if (response.data.result.list != null) {
          if (response.data.result.list?.length > 0) {
            selectedperson1 = response.data.result.list[0].person_list;
          }
        }

        setState((state) => ({
          ...state,
          datalist:
            response.data.result.list != null ? response.data.result.list : [],
          total_row,
          start_row,
          end_row,
          total_page,
          loadingData: false,
          selectedperson: selectedperson1,
        }));
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа: code is 103000");
      });
  };

  const loadDataForExcelAll = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 103000,
      },
    };
    const data = {
      token,
      page_size: 1048576,
      page_number: 1,
    };
    setState((state) => ({
      ...state,
      loadingDataForExcel: true,
      showExcellAllButton: false,
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
        let excelDataCNN1 = [];
        let excelDataList1 = [];
        excelDataList1 =
          response.data.result.list == null ? [] : response.data.result.list;
        excelDataList1?.map((el) => {
          el.person_list?.map((el1) => excelDataCNN1.push(el1));
        });
        setState((state) => ({
          ...state,
          loadingDataForExcel: false,
          showExcellAllButton: true,
          excelDataList: excelDataList1,
          excelDataCNN: excelDataCNN1,
        }));
      })
      .catch((error) => {
        changeStateValue("loadingDataForExcel", false);
        setState((state) => ({
          ...state,
          loadingDataForExcel: false,
          showExcellAllButton: false,
        }));

        message.info("Сервлерээс өгөгдөл дуудахад алдаа гарлаа:: code 103000");
      });
  };

  const loadDataListAll = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 103000,
      },
    };
    const data = {
      token,
      page_size: state.s_page_size,
      page_number: state.s_page_number,
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

        let selectedperson1 = [];
        if (response.data.result.list != null) {
          if (response.data.result.list?.length > 0) {
            selectedperson1 = response.data.result.list[0].person_list;
          }
        }
        let listpage1 = [];
        for (let i = 1; i <= response.data.result.pagination.total_page; i++) {
          listpage1.push(i);
        }
        setState((state) => ({
          ...state,
          total_row: response.data.result.pagination.total_row,
          start_row: response.data.result.pagination.start_row,
          end_row: response.data.result.pagination.end_row,
          listpage: listpage1,
          total_page: response.data.result.pagination.total_page,
          loadingData: false,
          datalist:
            response.data.result.list == null ? [] : response.data.result.list,
          selectedperson: selectedperson1,
        }));
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Сервлерээс өгөгдөл дуудахад алдаа гарлаа:: code 103000");
      });
  };
  const openUpdate = (el) => {
    let mypersonlist = [];
    let myuploadfiles = [];
    el.person_list?.map((el) =>
      mypersonlist.push({
        fp_id: el.id,
        fp_m_id: el.m_id,
        fp_sqd: el.sqd,
        fp_sqd_sub: el.sqd_sub,
        fp_pstn: el.pstn,
        fp_rnk_id: el.rnk_id,
        fp_lst_nme: el.lst_nme,
        fp_fst_nme: el.fst_nme,
        fp_cnn_date: el.cnn_date,
        fp_age: el.age,
        fp_sex: el.sex,
        fp_bkd: el.bkd,
        fp_bkd_nc: el.bkd_nc,
        fp_reg: el.reg,
        fp_tstdt: el.tstdt,
        fp_tudt: el.tudt,
        fp_tsteelj: el.tsteelj,
        fp_tstsqd: el.tstsqd,
        fp_edu_id: el.edu_id,
        fp_pht: el.pht,
      })
    );
    el.uploadfiles != null &&
      el.uploadfiles?.map((el) =>
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
      showinsert: true,
      isInsert: false,
      f_id: el.key,
      f_sqd_id: el.sqd_id,
      f_crm_date: el.crm_date,
      f_sqd_sub_cat: el.sqd_sub_cat,
      f_sqd_sub_nme: el.sqd_sub_nme,
      f_crm_cat: el.crm_cat,
      f_crm_type: el.crm_type != null ? el.crm_type.split(",") : [],
      f_rsn: el.rsn,
      f_cnclsn: el.cnclsn,
      f_rslvd_id: el.rslvd_id != null ? el.rslvd_id.split(",") : [],
      f_rslvd_d: el.rslvd_d,
      f_rslvd_date: el.rslvd_date,
      p_personlist: mypersonlist,
      uploadedFiles: el.uploadfiles,
    }));
  };
  const openInsertModal = () => {
    setState((state) => ({
      ...state,
      showinsert: true,
      isInsert: true,
      f_id: null,
      f_sqd_id: null,
      f_crm_date: null,
      f_sqd_sub_cat: null,
      f_sqd_sub_nme: null,
      f_crm_cat: null,
      f_crm_type: [],
      f_rsn: null,
      f_cnclsn: null,
      f_rslvd_id: [],
      f_rslvd_d: null,
      f_rslvd_date: null,
      p_personlist: [],
      uploadedFiles: null,
      // БҮРТГЭЖ БУЙ ХҮН form_person
      fp_id: null,
      fp_m_id: null,
      fp_sqd: null,
      fp_sqd_sub: null,
      fp_pstn: null,
      fp_rnk_id: null,
      fp_lst_nme: null,
      fp_fst_nme: null,
      fp_cnn_date: null,
      fp_age: null,
      fp_sex: null,
      fp_bkd: null,
      fp_bkd_nc: null,
      fp_reg: null,
      fp_tstdt: null,
      fp_tudt: null,
      fp_tsteelj: null,
      fp_tstsqd: null,
      fp_edu_id: null,
      fp_pht: null,
    }));
  };
  const deleteCrime = (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 103003,
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
        loadDataListAll();
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.error("Алдаа гарлаа");
      });
  };

  return (
    <CrimeMainContext.Provider
      value={{
        state,
        openInsertModal,
        deleteCrime,
        openUpdate,
        changeStateValue,
        removePerson,
        clickedPerson,
        pushPerson,
        updatePerson,
        saveAndUpdateCrimeMain,
        onDeleteFile,
        filterData,
        filterDataDown,
        loadDataListAll,
        loadDataForExcelAll,
        excelExportOnePage,
      }}
    >
      {props.children}
    </CrimeMainContext.Provider>
  );
};
export default CrimeMainContext;
