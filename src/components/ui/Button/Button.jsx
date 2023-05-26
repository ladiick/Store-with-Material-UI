import React from "react";
import s from "./Button.module.scss";
const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={s.button}>
      {children}
    </button>
  );
};

export default Button;
