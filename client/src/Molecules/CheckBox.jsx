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
    setQuestion({ ...question, description: e.target.value });
    updateData();
  };

  const handleOptionChange = (optionId, newText) => {
    // console.log("newText ", newText);
    const updatedOptions = question.options.map((option) =>
      option.id === optionId ? { ...option, text: newText } : option
    );
    setQuestion({ ...question, options: updatedOptions });
    updateData();
  };

  // console.log(question, "question");

  //   const handleDataChange = (optionId, newText) => {
  //     const updatedOptions = options.map((option) =>
  //       option.id === optionId ? { ...option, text: newText } : option
  //     );
  //     setOptions(updatedOptions);

  //     const data = updatedOptions.map((option) => option.text);
  //     getData(data);
  //   };

  const updateData = () => {
    const data = {
      description: question.description,
      options: question.options.map((option) => option.text),
    };
    // console.log(data, "data");
    getData(data);
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="text"
            value={question.description}
            onChange={handleQuestionChange}
            placeholder="Select the checkbox questions"
          />
        </label>
      </div>
      {/* <p contentEditable="true" onInput={handleQuestionChange}>
        {question.description || "Select the checkbox questions"}
      </p> */}
      {question.options.map((option) => (
        <div className="flex" key={option.id}>
          <input type="checkbox" />{" "}
          <input
            className="w-10rem"
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
