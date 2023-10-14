import { useQuestions } from "../contexts/QuestionDataProvider";

//real props index and option

function Options({ optionIndex }) {
  const { questions, index, answer, dispatch } = useQuestions();

  const hasAnswered = answer !== null;
  function handleAnswer() {
    dispatch({
      type: "pickAnswer",
      payload: [
        optionIndex.at(1),
        optionIndex.at(1) === questions.at(index).correctOption
          ? questions.at(index).points
          : 0,
      ],
    });
    //dispatch({type: 'pointUpdate'})
  }

  return (
    <button
      className={`btn btn-option ${
        optionIndex.at(1) === answer ? "answer" : ""
      } ${
        hasAnswered
          ? optionIndex.at(1) === questions.at(index).correctOption
            ? "correct"
            : "wrong"
          : ""
      }  
        `}
      onClick={handleAnswer}
      disabled={hasAnswered}
    >
      {optionIndex.at(0)}
    </button>
  );
}

export default Options;
