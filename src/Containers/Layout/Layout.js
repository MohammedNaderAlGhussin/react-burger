import React, { Fragment, useState } from "react";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import Classes from "./Layout.module.css";
import SideDeawer from "./../../Components/Navigation/SideDeawer/SideDeawer";

const Layout = (props) => {
  const [showSideDeawerState, setShowSideDeawerState] = useState({
    showSideDeawer: false,
  });

  const sideDeawerHandler = () => {
    setShowSideDeawerState({ showSideDeawer: false });
  };

  const sideDeawerToggleHandler = () => {
    setShowSideDeawerState({
      showSideDeawer: !showSideDeawerState.showSideDeawer,
    });
  };
  return (
    <Fragment>
      <Toolbar drawerTogglerClicked={sideDeawerToggleHandler} />
      <SideDeawer
        closed={sideDeawerHandler}
        open={showSideDeawerState.showSideDeawer}
      />
      <main className={Classes.content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
