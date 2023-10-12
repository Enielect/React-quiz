function Progress({ length, index, points, totalPoints, answer }) {
 // console.log(typeof length === 'string')
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
