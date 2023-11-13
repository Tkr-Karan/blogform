import React, { useState } from "react";

export const RadioFields = ({ getData }) => {
  const [question, setQuestion] = useState({
    description: "",
    options: [
      { id: 1, text: "Yes" },
      { id: 2, text: "No" },
    ],
  });

  const handleQuestionChange = (e) => {
    setQuestion({ ...question, description: e.target.value });
    updateData();
  };
  const handleOptionChange = (optionId, newText) => {
    const updatedOptions = question.options.map((option) =>
      option.id === optionId ? { ...option, text: newText } : option
    );
    setQuestion({ ...question, options: updatedOptions });
    updateData();
  };

  const updateData = () => {
    const data = {
      description: question.description,
      options: question.options.map((option) => option.text),
    };
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
            placeholder="Select the radio questions"
          />
        </label>
      </div>
      {question.options.map((option) => (
        <div className="flex" key={option.id}>
          <input type="radio" />{" "}
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
