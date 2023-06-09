import React, { useState, useEffect, useContext } from "react";
import { message } from "antd";
import axios from "../../util/myAxios";
const ProductsContext = React.createContext();
const initialState = {
  //data
  dataList: [],
  dataListImages: [],
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
  trl_list: [],
  trl: null,
  nme: null,
  une: null,
  urtug: null,
  pht: null,
  ngj: null,
  jin: null,
  id: null,
  sts: null, 
  usr: null,
  cdt: null,  
  filter: false,
  //Pagination
  page_number: 1,
  page_size: 200,
  total_row: null,
  start_row: null,
  end_row: null,
  total_page: null,
};

export const ProductsStore = (props) => {
  const [state, setState] = useState(initialState);
  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const onSaveOrUpdate = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    if (
      state.trl == null  ||  
      state.nme == null      
    ) {
      message.error("Талбаруудыг гүйцэт бөглөнө үү");
      return;
    }
    setState({ ...state, loadingSave: true, error: false });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 124001,
      },
    };
   
    const data = {
      token,
      id: state.id,

      pht: state.pht,
      trl: state.trl,
      nme: state.nme,
      une: state.une,
      urtug: state.urtug,
      ngj: state.ngj,
      jin: state.jin, 
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
    const messagecode = 124000;
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
      page_number: 1,
    };
    setState((state) => ({
      ...state,      
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
        if (response.data.code == 200) {
         loadAllDataImages();
        }
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа:"+messagecode);
      });
  };


  const loadAllDataImages = () => {
    const messagecode = 124009;
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
      page_number: 1,
    };
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
          dataListImages:
            response.data.result.list != null ? response.data.result.list : [],        
        }));
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа:"+messagecode);
      });
  };

  

   
  const filterData = (obj, name, value) => {
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
      page_size: state.page_size,
      page_number: state.page_number,
      trln: state.trln,
      trl: state.trl,
      nme: state.nme,
      ngj: state.ngj,
      jin: state.jin,
      sts: state.sts,
      usr: state.usr,
      cdt: state.cdt, 
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
        if (response.data.code == 200) {
          filterDataImages(obj, name, value);
        }


      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа: code is 124000");
      });
  };

  
  const filterDataImages = (obj, name, value) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 124009,
      },
    };
    const data = {
      token,
      page_size: state.page_size,
      page_number: state.page_number,
      trln: state.trln,
      trl: state.trl,
      nme: state.nme,
      ngj: state.ngj,
      jin: state.jin,
      sts: state.sts,
      usr: state.usr,
      cdt: state.cdt, 
    };
    
     
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
          dataListImages:
            response.data.result.list != null ? response.data.result.list : [],         
        }));
      })
      .catch((error) => {
        changeStateValue("loadingData", false);
        message.info("Алдаа гарлаа: code is 124000");
      });
  };


  const deleteData = (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 124003,
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
  const getBaraaniiTurul = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.token;
    const configload = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        request_code: 100001,
      },
    };
    const data = {
      token,
      search_text: 'baraaniiturul',
    }; 
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
          trl_list:
            response.data.result.list != null ? response.data.result.list : [],
          
        }));
      })
      .catch((error) => { 
        message.info("Алдаа гарлаа: code is 100001");
      });
  };

  const openUpdate = (el) => {
    console.log("OPEN UPDATE");

    setState((state) => ({
      ...state,
      showInsert: true,
      id: el.id,
      pht: el.pht,
      nme: el.nme,
      une: el.une,
      urtug: el.urtug,
      ngj: el.ngj,
      jin: el.jin,
      trl: el.trl,
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
      ngj: null,
      trl: null,
      jin: null,
      sts: null,

    }));
  };
  return (
    <ProductsContext.Provider
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
        getBaraaniiTurul,
        loadAllDataImages
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
export default ProductsContext;
