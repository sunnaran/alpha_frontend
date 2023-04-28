import React, {useState} from "react";
const AdminContext = React.createContext();
const initialState = {};
export const AdminStore = (props) => {
  const [state, setState] = useState();
  return (
    <AdminContext.Provider
      value={{
        state,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContext;
