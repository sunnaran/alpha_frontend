import React, { useState, useEffect, useContext } from "react";
const CrimeContext = React.createContext();
const initialState = { sub_menu: 1, loading_save: false, loading_menu: false };
export const CrimeStore = (props) => {
  const [state, setState] = useState(initialState);
  const changeStateValue = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  return (
    <CrimeContext.Provider
      value={{
        state,
        changeStateValue,
      }}
    >
      {props.children}
    </CrimeContext.Provider>
  );
};
export default CrimeContext;
