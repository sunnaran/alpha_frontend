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
      myitems.push({ itemid: product.id, itemname: product.nme, itemtoo: 1 });
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
          });
        } else {
          myitems.push(el1);
          myitems.push({
            itemid: product.id,
            itemname: product.nme,
            itemtoo: 1,
            itemune: product.une,
          });
        }
      } else {
        myitems.push(el1);
      }
    });

    myorder.push({
      shiree: state.selectedTableId,
      items: myitems,
    });

    setState((state) => ({
      ...state,
      order: myorder,
      selectedOrderItem: product,
    }));
  };
  const addItemToOrderOld = (value) => {
    let neworder = [];
    console.log("Хоосон ордер үүсгэлээ");
    let zahialgatshireeindex = 0;
    let zahialgatshiree = false;
    state.order.map((el, index) => {
      if (state.selectedTableId == el.shiree) {
        //Umnu zahialga hiigdsen
        zahialgatshiree = true;
        zahialgatshireeindex = index;
      }
    });
    console.log("Захиалгат ширээ шалгалаа");
    console.log("Индекс :", zahialgatshireeindex);
    console.log("Утга нь:", zahialgatshiree);

    if (zahialgatshiree == false) {
      neworder = state.order;
      neworder.push({
        shiree: state.selectedTableId,
        items: [{ itemid: value, itemname: "testshine", itemtoo: 1 }],
      });
      setState((state) => ({
        ...state,
        order: neworder,
        selectedOrderItem: value,
      }));

      console.log("Захиалгат  биш байсан тул стэйт солилоо");
    } else {
      console.log("Захиалгат  тул ийшээ орж ирсэн");
      //zahialgataas busad data oruulna
      state.order.map((el) => {
        if (el.shiree != state.selectedTableId) {
          neworder.push(el);
        }
      });
      console.log("Байгаагаас бусдыг нэмсэн", neworder);
      //zahialsan shireenii medeelel zasah ehellee
      let newitems = [];
      let suuliinelementijil = false;
      console.log("items tooloh umnu");
      if (state.order[zahialgatshireeindex].items.length > 0) {
        console.log("Өгөгдөл байгааг илрүүллээ");
        let suuliinelement = state.order[zahialgatshireeindex].items.splice(-1);
        console.log("suuliin elelemnt", suuliinelement);
        console.log("suuliin elelemnt id ni", suuliinelement[0].itemid);
        console.log("songogdson elelemnt id", value);
        if (suuliinelement[0].itemid == value) {
          suuliinelementijil = true;
          console.log(suuliinelementijil);
          console.log("suuuuliin elelemnttttttttttttttttttt");
        }
        if (suuliinelementijil) {
          let mynewitems = [];
          state.order[zahialgatshireeindex].items.map((element, index) => {
            if (index < state.order[zahialgatshireeindex].items.length) {
              mynewitems.push(element);
            }
          });
          console.log("Сүүлийн элементээс өмнөхийг оноосон", mynewitems);
          mynewitems.push({
            itemid: value,
            itemname: "test",
            itemtoo: suuliinelement.itemtoo + 1,
          });
          console.log("Сүүлийн элэмэнтийг ахиулаад нэмчихлээ");
          neworder.push({ shiree: state.selectedTableId, items: mynewitems });
          setState((state) => ({
            ...state,
            order: neworder,
            selectedOrderItem: value,
          }));
        } else {
          let myitems = [];
          state.order[zahialgatshireeindex].items.map((el2) =>
            myitems.push(el2)
          );
          myitems.push({ itemid: value, itemname: "test", itemtoo: 1 });
          console.log("Сүүлийн элемент биш байсан тул шинээр нэмсэн");
          neworder.push({ shiree: state.selectedTableId, items: myitems });
          setState((state) => ({
            ...state,
            order: neworder,
            selectedOrderItem: value,
          }));
        }
      } else {
        let myitems = [];
        console.log("Өгөгдөл байхгүйг илрүүллээ");
        myitems.push({ itemid: value, itemname: "test", itemtoo: 1 });
        neworder.push({ shiree: state.selectedTableId, items: myitems });
        setState((state) => ({
          ...state,
          order: neworder,
          selectedOrderItem: value,
        }));
      }
    }
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
      }}
    >
      {props.children}
    </PosContext.Provider>
  );
};
export default PosContext;
