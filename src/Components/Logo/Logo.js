import React from "react";
import burgerLogo from "./../../resources/Images/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="MyBurger" />
    </div>
  );
};
export default Logo;
