import Options from "./Options";
import Progress from "./Progress";

function Questions({ question, dispatch, answer,length }) {
  return (
    <>
      <Progress length={length}  />
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
          />
        ))}
      </div>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
        next
      </button>
    </>
  );
}

export default Questions;
