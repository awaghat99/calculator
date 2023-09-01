import React from "react";

const Buttons = (props) => {
  return (
    <div className="button" onClick={props.handleButtonClick}>
      {props.label}
    </div>
  );
};

export default Buttons;
