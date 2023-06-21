"use client";
import React, { createContext, useState } from "react";

export const LoginProvider = createContext();

const LoginContext = ({ children }) => {
  const [logindata, setLogindata] = useState();
  return (
    <LoginProvider.Provider value={{ logindata, setLogindata }}>
      {children}
    </LoginProvider.Provider>
  );
};

export default LoginContext;
