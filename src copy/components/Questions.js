import { useEffect, useState } from "react";
import Options from "./Options";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

function Questions({
  question,
  dispatch,
  answer,
  length,
  index,
  points,
  totalPoints,
  finished,
  highScore
}) {
  const [time, setTime] = useState(500);
  const min = Math.floor(time / 60);
  const sec = time % 60;

  function handleButton() {
    if (index < length - 1) dispatch({ type: "next" });
    //else {dispatch({type: 'finish'})}
    if(index === length - 1) dispatch({type: 'finished'})
    
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
  console.log(totalPoints);
  return (
    <>
      {time > 0 && !finished ? (
        <>
          <Progress
            length={length}
            index={index}
            points={points}
            totalPoints={totalPoints}
            answer={answer}
          />
          <h4>{question.question}</h4>
          <div className="options">
            {question.options.map((ele, i) => (
              <Options
                option={ele}
                correctOption={question.correctOption}
                key={i}
                dispatch={dispatch}
                index={i}
                answer={answer}
                point={question.points}
              />
            ))}
          </div>
          <div className="timer">
            {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}`: sec}
          </div>
          <button className="btn btn-ui" onClick={handleButton}>
            {index === 14 ? "Finish" : "next"}
          </button>
        </>
      ) : (
        <FinishScreen points={points} totalPoints={totalPoints} dispatch={dispatch} highScore={highScore}/>
      )}
    </>
  );
}

export default Questions;
