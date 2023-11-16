import { useRef, useState } from "react";

export default function InputField(props) {

    const {getData} = props

  const [inputData, setInputData] = useState("");
  const contentEditableRef = useRef(null);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setInputData(e.target.value);

    getData(e.target.value)
  };
  return (
    <div className="mt-1  ">
      <input
        className="bg-slate-500/10 p-2 w-[30rem]"
        type="text"
        value={inputData}
        onChange={(e) => handleInputChange(e)}
        placeholder="please enter your question?"
      />
    </div>
  );
}
