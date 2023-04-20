import React, { createContext, useState } from "react";

export const addData = createContext();

const ContextProvider = ({ children }) => {
  const [usernameadd, setusernameadd] = useState();
  const [numberadd, setnumberadd] = useState();
  const [] = useState();
  return (
    <>
      <addData.Provider
        value={{ usernameadd, setusernameadd, numberadd, setnumberadd }}
      >
        {children}
      </addData.Provider>
    </>
  );
};

export default ContextProvider;
