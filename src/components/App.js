import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";
import Header from "./Header";
import Main from "./Main";
import Questions from "./Questions";

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
        answer: action.payload,
      };
    case "next":
      return {
        ...state,
        answer: null,

        index: state.index + 1,
      };
    default:
      return new Error("Action type not defined");
  }
}

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
};

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

  const { questions, status, index, answer } = state;

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen length={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Questions
            question={questions.at(index)}
            dispatch={dispatch}
            answer={answer}
            length={questions.length}
          />
        )}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}
