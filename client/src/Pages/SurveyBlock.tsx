import React, { useEffect, useState } from "react";
import "./Stylesheets/SurveyBlock.css";
import { questionsTypes } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setIsCreating } from "../store/surveySlice";
import InputField from "../Molecules/InputField";
import { CheckBox } from "../Molecules/CheckBox";
import { RadioFields } from "../Molecules/RadioFields";
import { SurveyBlocks } from "../ApiCalls/blocks";
import { ToastContainer, toast } from "react-toastify";

const SurveyBlock = () => {
  const isCreating = useSelector((state: any) => state.survey.isCreating);
  const dispatch = useDispatch();
  const [showType, setShowType] = useState(false);
  const [questions, setQuestions] = useState<any>([]);
  const [selectedType, setSelectedType] = useState("");
  const [inputData, setInputData] = useState<string[]>([]);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");

  const [questionsData, setQuestionsData] = useState<any>([]);
  const [count, setCount] = useState(1);

  const handleCreation = () => {
    dispatch(setIsCreating(isCreating));
  };
  const handleAddQuestion = (type) => {
    setSelectedType(type);
    setQuestions([...questions, type]);
    // setInputData([...inputData, ""]);
    setQuestionsData([...questionsData, { type, data: "" }]);

    setShowType(false);
  };

  const handleQuestionType = () => {
    setShowType(!showType);
  };

  const handleSurveySubmit = async () => {
    const formData = {
      title: surveyTitle,
      description: surveyDescription,
      questionsData,
    };

    console.log(formData);

    const res = await SurveyBlocks(formData);

    if (res.success) {
      toast.success("survey block added successfully");
    } else {
      toast.error("survey blocks failed!!");
    }
  };
  // const getData = (data) => {
  //   console.log(data);
  // };

  const handleInputChange = (index, value) => {
    const updatedInputData = [...inputData];
    updatedInputData[index] = value;

    const updatedQuestionsData = [...questionsData];
    updatedQuestionsData[index].data = value;

    setInputData(updatedInputData);
    setQuestionsData(updatedQuestionsData);
  };

  const handleCheckBoxData = (index, data) => {
    // console.log(data, "hhhhh")
    setQuestionsData(prevQuestionsData => {
    const updatedQuestionsData = [...prevQuestionsData];
    updatedQuestionsData[index] = { type: "checkbox", data };
    // console.log("efree", updatedQuestionsData)
    return updatedQuestionsData;
  });
  };

  const handleRadioData = (index, data) => {
    const updatedQuestionsData = [...questionsData];
    updatedQuestionsData[index] = { type: "radio", data };
    setQuestionsData(updatedQuestionsData);
  };
  // console.log(questionsData, "questionsData123");

  const renderSurveyBlock = () => {
    return (
      <div className="survey-questions flex flex-col gap-2 items-start ">
        {questions.map((question, idx) => (
          <div key={idx} className="">
            {question === "input" ? (
              <InputField
                key={idx}
                index={idx}
                value={inputData[idx]}
                getData={(value) => handleInputChange(idx, value)}
              />
            ) : question === "checkbox" ? (
              <CheckBox
                key={idx}
                index={idx}
                getData={(value) => handleCheckBoxData(idx, value)}
              />
            ) : question === "radio" ? (
              <RadioFields
                key={idx}
                getData={(data) => handleRadioData(idx, data)}
              />
            ) : (
              <p>{question}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="survey-block-container ">
      {isCreating ? (
        <div>
          <div >
            <h2>Survey Form Creation</h2>
          </div>

          <div className="survey-form-container  p-2 rounded-lg bg-green-100 shadow-slate-600 border-1 border-solid flex gap-3 relative ">
            <form className="w-[30rem] survey-form flex flex-col gap-2 items-start">
              <div className="survey-name w-[100%] flex justify-between">
                <label> Title: </label>
                <input
                  type="text"
                  value={surveyTitle}
                  onChange={(e) => setSurveyTitle(e.target.value)}
                  className="w-[70%] pl-3"
                />
              </div>
              <div className="survey-description w-[100%] flex justify-between">
                <label> Description: </label>
                <input
                  type="text"
                  value={surveyDescription}
                  onChange={(e) => setSurveyDescription(e.target.value)}
                  className="w-[70%] pl-3"
                />
              </div>

              {renderSurveyBlock()}
            </form>

            {questions.length < 5 && (
              <i
                className="fa-solid fa-plus p-2 rounded-md bg-orange-200 cursor-pointer mt-2 h-[2rem]  "
                onClick={handleQuestionType}
              ></i>
            )}

            <div className="add-question flex justify-center items-center gap-2">
              {showType && (
                <div className="questions-type flex gap-2">
                  {questions.length < 5 && (
                    <div className="flex gap-1 absolute -right-[13rem] top-[0.5rem] bg-lime-100 p-3 align-top">
                      {questionsTypes.map((type, idx) => (
                        <p
                          className="cursor-pointer p-1 bg-stone-400 rounded-md w-[100%] text-[.8rem] hover:bg-teal-200"
                          onClick={() => {
                            // handleType(type);
                            handleAddQuestion(type);
                            // Close the options list after selecting a type
                          }}
                          key={idx}
                        >
                          {type}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
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

      {questions.length >= 5 && (
        <div
          className="submit bg-slate-400 p-2 rounded-md cursor-pointer mt-3"
          onClick={handleSurveySubmit}
        >
          submit
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default SurveyBlock;
