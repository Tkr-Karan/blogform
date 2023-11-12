import React from "react";

export const CheckBox = () => {
  const handleFocus = (e) => {
    e.target.textContent = " ";
    e.target.contentEditable = true;
  };

  return (
    <div>
      <p contentEditable="true">Select the checkbox questions</p>
      <div className=" flex">
        <input type="checkbox" />{" "}
        <p
          className="w-10rem"
          contentEditable="true"
          onFocus={(e) => handleFocus(e)}
        >
          here you enter option
        </p>
      </div>
      <div className="flex">
        <input type="checkbox" />{" "}
        <p contentEditable="true">here you enter option</p>
      </div>
      <div className="flex">
        <input type="checkbox" />{" "}
        <p contentEditable="true">here you enter option</p>
      </div>
      <div className="flex">
        <input type="checkbox" />{" "}
        <p contentEditable="true">here you enter option</p>
      </div>
    </div>
  );
};
