import React from "react";
const TemplateContext = React.createContext();
const initialState = {};
export const TemplateStore = (props) => {
  const [state, setState] = useState();
  return (
    <TemplateContext.Provider
      value={{
        state,
      }}
    >
      {props.children}
    </TemplateContext.Provider>
  );
};
export default TemplateContext;
