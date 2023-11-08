import React, { useDebugValue, useState } from "react";
import "./Stylesheets/SurveyBlock.css";
import { questionsTypes } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setIsCreating } from "../store/surveySlice";

const SurveyBlock = () => {
  const isCreating = useSelector((state : any) => state.survey.isCreating);
  const dispatch = useDispatch();

  const handleCreation = () => {
    dispatch(setIsCreating(isCreating));
  };

  const handleType = (val) => {
    console.log(val);
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

              <div className="survey-questions">
                <p>Select the questions type</p>
                <div className="questions-type flex gap-2">
                  {questionsTypes.map((type, idx) => {
                    return (
                      <p
                        className="cursor-pointer p-1 bg-stone-400 rounded-md w-[50%] text-[.8rem]"
                        onClick={() => handleType(type)}
                        key={idx}
                      >
                        {type}
                      </p>
                    );
                  })}
                </div>
              </div>
            </form>
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
