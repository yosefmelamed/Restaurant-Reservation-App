import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-12 col-lg-2 side-bar">
          <Menu />
        </div>
        <div className="col d-flex justify-content-center justify-content-md-start text-center text-md-left">
          <div>
            <Routes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
