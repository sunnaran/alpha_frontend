import React, { useState } from "react";
import axios from "../../util/myAxios";
import { message } from "antd";
import { VerticalRightOutlined } from "@ant-design/icons";
const PosContext = React.createContext();
const initialState = {
  shireenuud: [],
  baraanuud: [],
  baraaangilal: [],
  total_row: null,
  start_row: null,
  end_row: null,
  total_page: null,
  loading: false,
  //pos grid
  loading: false,
  order: [],
  selectedOrderItem: null,
  selectedTableId: null,
  selectedProductCategory: null,
  selectedProductID: null,
  selectedProductDate: null
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
      search_text: "baraaniiturul",
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

  const addItemToOrder = (product) => {
    if(state.selectedTableId == null)
    {
      message.warning("Ширээ сонгоно уу");
      return;
    }
    console.log(product);
    let myorder = [];
    state.order
      .filter(({ shiree }) => shiree != state.selectedTableId)
      .map((el) => myorder.push(el));
    let myitems = [];
    let olditems = [];
    if (
      state.order.find(({ shiree }) => shiree == state.selectedTableId)
        ?.items != null
    ) {
      olditems = state.order.find(
        ({ shiree }) => shiree == state.selectedTableId
      ).items;
    } else {
      myitems.push({ itemid: product.id, itemname: product.nme,  itemune: product.une, itemtoo: 1, itemdate: Date.now() });
    }

    let itemlenght = olditems.length;
    olditems.map((el1, index) => {
      if (index == itemlenght - 1) {
        if (el1.itemid == product.id) {
          myitems.push({
            itemid: el1.itemid,
            itemname: el1.itemname,
            itemtoo: el1.itemtoo + 1,
            itemune: product.une,
            itemdate: Date.now()
          });
        } else {
          myitems.push(el1);
          myitems.push({
            itemid: product.id,
            itemname: product.nme,
            itemtoo: 1,
            itemune: product.une,
            itemdate: Date.now()
          });
        }
      } else {
        myitems.push(el1);
      }
    });
    //niit dun tootsoh
    let totalprice = 0;
    myitems.map((el) => {
      console.log(el);
      totalprice = totalprice + el.itemune * el.itemtoo;
    });

    myorder.push({
      shiree: state.selectedTableId,
      totalprice: totalprice,
      items: myitems,
    });

    setState((state) => ({
      ...state,
      order: myorder,
      selectedOrderItem: product,
    }));
  };
  
  // Plus, minus item
  
  const changePieceOfItem = (itemid, itemdate, isplus) => {      
    let myorder = [];
    state.order
      .filter(({ shiree }) => shiree != state.selectedTableId)
      .map((el) => myorder.push(el));
    let myitems = [];
    let olditems = state.order.find(
      ({ shiree }) => shiree == state.selectedTableId
    ).items;

    olditems.map((el9, index) => {
      let itemtoo9 = el9.itemtoo;
      if(el9.itemid == itemid && itemdate==el9.itemdate){
        isplus ? itemtoo9++ : itemtoo9--;
      }
      if(itemtoo9<0) itemtoo9 = 0;
      myitems.push({ itemid: el9.itemid, itemname: el9.itemname,  itemune: el9.itemune, itemtoo: itemtoo9, itemdate: el9.itemdate });
    })


   
    //niit dun tootsoh
    let totalprice = 0;
    myitems.map((el) => {
      console.log(el);
      totalprice = totalprice + el.itemune * el.itemtoo;
    });

    myorder.push({
      shiree: state.selectedTableId,
      totalprice: totalprice,
      items: myitems,
    });

    setState((state) => ({
      ...state,
      order: myorder, 
    }));
  };


  return (
    <PosContext.Provider
      value={{
        state,
        getShiree,
        getBaraa,
        getBaraaAngilal,
        changeStateValue,
        addItemToOrder,
        changePieceOfItem
      }}
    >
      {props.children}
    </PosContext.Provider>
  );
};
export default PosContext;
