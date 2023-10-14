import { useEffect, useState } from "react";
import Options from "./Options";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import { useQuestions } from "../contexts/QuestionDataProvider";

function Questions() {
  const { questions, dispatch, index, finished } = useQuestions();
  //dispatch, finished
  const [time, setTime] = useState(500);
  const min = Math.floor(time / 60);
  const sec = time % 60;

  function handleButton() {
    if (index < questions.length - 1) dispatch({ type: "next" });
    //else {dispatch({type: 'finish'})}
    if (index === questions.length - 1) dispatch({ type: "finished" });
  }

  useEffect(
    function () {
      let timeInterval = setInterval(() => setTime((s) => s - 1), 1000);
      return () => {
        clearInterval(timeInterval);
      };
    },
    [setTime]
  );
  //console.log(totalPoints);
  return (
    <>
      {time > 0 && !finished ? (
        <>
          <Progress />
          <h4>{questions.at(index).question}</h4>
          <div className="options">
            {questions.at(index).options.map((ele, i) => (
              <Options optionIndex={[ele, i]} key={i} />
            ))}
          </div>
          <div className="timer">
            {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
          </div>
          <button className="btn btn-ui" onClick={handleButton}>
            {index === 14 ? "Finish" : "next"}
          </button>
        </>
      ) : (
        <FinishScreen />
      )}
    </>
  );
}

//point={question.points}
//correctOption={question.correctOption}
//question={questions.at(index)}
export default Questions;
