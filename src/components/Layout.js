import React from "react";
import Footer from "./Footer";
import Header from "./Header";

import "../styleSheets/Layout.css";
import Loading from "./Loading";

function Layout(props) {
  return (
    <>
      {props.loading && <Loading />}
      <Header />
      <div className='content'>{props.children}</div>
      <Footer />
    </>
  );
}

export default Layout;
