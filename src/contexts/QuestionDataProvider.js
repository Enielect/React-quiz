import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionContext = createContext();

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

function QuestionDataProvider({ children }) {
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      })
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);

  const [
    { questions, status, index, answer, points, finished, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        finished,
        highScore,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionContext);
  if (context === undefined)
    throw new Error("Context used outside of provider");
  return context;
}

export { QuestionDataProvider, useQuestions };
