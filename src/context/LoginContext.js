import React, { useState } from "react";
import axios from "../util/myAxios";

const LoginContext = React.createContext();
const initialState = {
  loading: false,
};
export const LoginStore = (props) => {
  const [state, setState] = useState(initialState);
  //Нэвтрэх
  const loginUser = (username, password) => {
    setState({ ...state, loading: true });
    const data = {
      username,
      password,
    };
    axios
      .post("login", data)
      .then((result) => {
        setState({
          ...state,
          loading: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          loadingLogin: false,
          error: true,
          errorMessage:
            err.response != undefined
              ? err.response.data.error.message
              : "Сервертэй холбогдож чадсангүй",
          // errorCode: err.code,
          token: null,
          userid: null,
          expireDate: null,
        });
      });
  };

  const logout = () => {
    sessionStorage.clear();
    axios
      .post("login/logout")
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  return (
    <UserContext.Provider
      value={{
        state,

        loginUser,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
