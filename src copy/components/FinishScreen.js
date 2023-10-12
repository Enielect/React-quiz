import { useEffect } from "react";

function FinishScreen({ points, totalPoints, dispatch, highScore }) {
  console.log(highScore);
  let emoji;
  console.log(points);
  if (points < 50) emoji = "🤦‍♂️";
  if (points > 50) emoji = "😕";
  if (points > 50 && points < 160) emoji = "😎";
  if (points > 160 && points < 280) emoji = "🤯";
  if (points === 280) emoji = "💫";


  useEffect(function() {
    dispatch({type: 'updateHighScore', payload: points > highScore ? points : highScore});
    console.log(`This is the points value ${points}`)
    console.log(`This is the highScore ${highScore}`)
    console.log(points > highScore ? points : highScore)
  },[dispatch, highScore, points])

  return (
    <div>
      <div className="result">
        {emoji} You scored {points} out of {totalPoints} (
        {Math.round((points / totalPoints) * 100)}%)
      </div>
      <div className="highscore">(Highscore: {highScore} points)</div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
