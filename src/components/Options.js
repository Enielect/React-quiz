function Options({ option, correctOption, dispatch, index, answer }) {
    const hasAnswered = answer !== null;
  
    return (
      <button
        className={`btn btn-option ${index === answer ? "answer" : ""} ${
          hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
        }  
        `}
        onClick={() => dispatch({ type: "pickAnswer", payload: index })}
        disabled={hasAnswered}
      >
        {option}
      </button>
    );
  }

export default Options
