import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";
import Header from "./Header";
import Main from "./Main";
import Questions from "./Questions";
import { useQuestions } from "../contexts/QuestionDataProvider";

export default function App() {
  const { status } = useQuestions();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {(status === "ready" || status === "restart") && <StartScreen />}
        {status === "active" && <Questions />}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}

//length={questions.length}
//totalPoints={questions.reduce((acc, cur) => acc + cur.points, 0)}
