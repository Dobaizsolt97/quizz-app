import React, { useState } from "react";

const QuestionBox = ({ options, questions, selected }) => {
  const [answer, setAnswer] = useState(options);
  return (
    <div className="questionBox">
      <div className="question">{questions}</div>
      {answer.map((text, index) => (
        <button
          onClick={() => {
            setAnswer([text]);
            selected(text);
          }}
          key={index}
          className="answerBtn"
        >
          {text}
        </button>
      ))}
    </div>
  );
};
export default QuestionBox;
