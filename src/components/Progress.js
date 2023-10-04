function Progress({ length }) {
  return (
    <div className="progress">
      <progress max={length} value={10} />
      <span>Question 1 / 15</span> <span>0/280</span>
    </div>
  );
}

export default Progress;
