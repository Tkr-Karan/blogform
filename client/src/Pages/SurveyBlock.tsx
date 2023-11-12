import React, { useEffect, useState } from "react";
import "./Stylesheets/SurveyBlock.css";
import { questionsTypes } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setIsCreating } from "../store/surveySlice";
import InputField from "../Molecules/InputField";
import { CheckBox } from "../Molecules/CheckBox";
import { RadioFields } from "../Molecules/RadioFields";

const SurveyBlock = () => {
  const isCreating = useSelector((state: any) => state.survey.isCreating);
  const dispatch = useDispatch();
  const [selectedType, setSlectedType] = useState("");
  const [showType, setShowType] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleCreation = () => {
    dispatch(setIsCreating(isCreating));
  };

  const handleType = (val) => {
    setSlectedType(val);
    setShowType(false);
  };

  const handleAddQuestion = () => {
    setShowType(true);
  };

  return (
    <div className="survey-block-container ">
      {isCreating ? (
        <div>
          <h2>Survey Form Creation</h2>

          <div className="survey-form-container">
            <form className="survey-form">
              <div className="survey-name">
                <label> Title: </label>
                <input type="text" />
              </div>
              <div className="survey-description">
                <label> Description: </label>
                <input type="text" />
              </div>

              <div>
                {selectedType == "input" ? (
                  <InputField />
                ) : selectedType == "checkbox" ? (
                  <CheckBox />
                ) : selectedType == "radio" ? (
                  <RadioFields />
                ) : (
                  // <div>
                  //   {" "}
                  //   ques :{" "}
                  //   <span>
                  //     {" "}
                  //     <input type="text" name="" id="" />{" "}
                  //   </span>{" "}
                  //   <i
                  //     className="fa-solid fa-plus cursor-pointer"
                  //     onClick={() => handleType("input")}
                  //   ></i>
                  // </div>
                  <div className="survey-questions">
                    <div className="questions-type flex gap-2 relative">
                      {showType && (
                        <div className="flex flex-col gap-1 absolute -right-20 bg-lime-100 p-3">
                          {questionsTypes.map((type, idx) => {
                            return (
                              <p
                                className="cursor-pointer p-1 bg-stone-400 rounded-md w-[100%] text-[.8rem] hover:bg-teal-200"
                                onClick={() => handleType(type)}
                                key={idx}
                              >
                                {type}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </form>

            <div className="add-question flex justify-center items-center gap-2">
              <p>Select the questions type</p>
              <i
                className="fa-solid fa-plus p-2 rounded-md bg-orange-200 cursor-pointer"
                onClick={handleAddQuestion}
              ></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h1>Create your own Survey!</h1>
          <div
            className="create-survey font-bold flex items-center justify-center  gap-2 border-dashed border-2 p-1 cursor-pointer"
            onClick={handleCreation}
          >
            <i className="fa-solid fa-plus" style={{ color: " #a6a6a6" }}></i>
            <p className="text-sm">Create Survey</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyBlock;
