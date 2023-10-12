function Options({ option, correctOption, dispatch, index, answer, point }) {
  const hasAnswered = answer !== null;
  function handleAnswer() {
    dispatch({
      type: "pickAnswer",
      payload: [index, index === correctOption ? point : 0],
    });
    //dispatch({type: 'pointUpdate'})
  }

  return (
    <button
      className={`btn btn-option ${index === answer ? "answer" : ""} ${
        hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
      }  
        `}
      onClick={handleAnswer}
      disabled={hasAnswered}
    >
      {option}
    </button>
  );
}

export default Options;
