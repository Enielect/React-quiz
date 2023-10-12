import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";
import Header from "./Header";
import Main from "./Main";
import Questions from "./Questions";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  finished: false,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "quizStart":
      return {
        ...state,
        status: "active",
      };
    case "pickAnswer":
      return {
        ...state,
        answer: action.payload[0],
        points: state.points + action.payload[1],
      };
    case "next":
      return {
        ...state,
        answer: null,

        index: state.index + 1,
      };
    case "finished":
      return {
        ...state,
        finished: true,
      };
    case "updateHighScore":
      return {
        ...state,
        highScore: action.payload,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
        status: "restart",
      };
    default:
      return new Error("Action type not defined");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      })
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);

  const { questions, status, index, answer, points, finished, highScore } =
    state;
  console.log(questions);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {(status === "ready" || status === "restart") && (
          <StartScreen length={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Questions
            question={questions.at(index)}
            dispatch={dispatch}
            answer={answer}
            index={index}
            length={questions.length}
            points={points}
            finished={finished}
            highScore={highScore}
            totalPoints={questions.reduce((acc, cur) => acc + cur.points, 0)}
          />
        )}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}
