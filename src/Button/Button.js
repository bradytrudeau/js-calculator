import React from "react";
import "./Button.css";

const Button = ({content, type, onButtonPress}) => {
  return <button onClick={onButtonPress(content)}className={type}>{content}</button>
};

export default Button;