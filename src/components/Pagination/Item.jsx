import React from "react";

import style from "../../../styles/pagination.module.scss";

const Item = ({ children, active = false, disabled = false, onClick }) => {
  return (
    <li
      onClick={onClick}
      disabled={disabled}
      className={`${active ? style.active : ""} ${
        style.item
      } border bg-lighter cu-pointer flex-center`}
    >
      {children}
    </li>
  );
};

export default Item;
