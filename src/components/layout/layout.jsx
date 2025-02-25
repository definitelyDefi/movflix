import React from "react";

import {Header} from "../header/header";
import classes from "./layout.module.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({children}) => {
  return (
    <div className={classes.layout}>
      <Header />
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Layout;
