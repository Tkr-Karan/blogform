import React, { useState } from "react";

export const CheckBox = ({ getData, index }) => {
  const [question, setQuestion] = useState({
    description: "",
    options: [
      { id: 1, text: "" },
      { id: 2, text: "" },
    ],
  });

  const handleQuestionChange = (e) => {
    // console.log(e.target.value);
    const newDesc = e.target.value;
    // console.log(newDesc);
    setQuestion({ ...question, description: newDesc });
    // console.log(question.description);
    updateData();
  };

  const handleOptionChange = (optionId, newText) => {
    // console.log("newText ", newText);
    const updatedOptions = question.options.map((option) =>
      option.id === optionId ? { ...option, text: newText } : option
    );
    setQuestion({ ...question, options: updatedOptions });
    // console.log("desc", updatedOptions);
    updateData(updatedOptions);
  };
  
  const updateData = (options) => {
    const data = {
      description: question.description,
      options: options != undefined && options.map((option) => option.text),
    };
    getData(data);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label>
          <input
            type="text"
            value={question.description}
            onChange={handleQuestionChange}
            placeholder="Select the checkbox questions"
            className="w-[30rem] bg-slate-500/10 p-2"
          />
        </label>
      </div>
      {question.options.map((option) => (
        <div className="flex gap-2" key={option.id}>
          <input type="checkbox" className="" />{" "}
          <input
            className="w-[25rem] pl-2"
            type="text"
            // onFocus={(e) => handleFocus(e)}
            onChange={(e) => handleOptionChange(option.id, e.target.value)}
            value={option.text}
            placeholder="option value"
          />
        </div>
      ))}
    </div>
  );
};
