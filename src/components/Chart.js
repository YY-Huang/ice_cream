import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Chart = () => {
  const [myState, setMyState] = useState("initial state")
  const data = useSelector(state => state);

//   console.log(useSelector)
  return (
    <div>
      <div>I am a chart!</div>
      <div>This is my data:</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default Chart;