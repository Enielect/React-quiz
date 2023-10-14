import { useQuestions } from "../contexts/QuestionDataProvider";

function StartScreen() {
  const { questions, dispatch } = useQuestions();
  console.log(questions.length)
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "quizStart" })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
