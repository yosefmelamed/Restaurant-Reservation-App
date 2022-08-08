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
    <div className="container-fluid d-flex justify-content-center">
      <div className="row h-100">
        <div className="col-12 col-md-2 side-bar">
          <Menu />
        </div>
        <div
          className="col d-flex justify-content-center justify-content-md-start text-center text-md-left"
          id="dashboard-header"
        >
          <div>
            <Routes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
