import { useQuestions } from "../contexts/QuestionDataProvider";

function Progress() {
  // console.log(typeof length === 'string')
  const { questions, index, points, answer } = useQuestions();
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  const length = questions.length;
  return (
    <div className="progress">
      <progress max={length} value={index + Number(answer !== null)} />
      <span>
        Question {index + 1} / {length}
      </span>
      <span>
        {points} / {totalPoints}
      </span>
    </div>
  );
}

export default Progress;
