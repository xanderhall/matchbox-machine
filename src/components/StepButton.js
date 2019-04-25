import React from 'react'

const StepButton = (props) => {
  return (
    <li>
      <button onClick={() => props.jumpTo()}>
        {props.step > 0 ? "Go to move " + props.step : "Go to game start"}
      </button>
    </li>
  );
}

export default StepButton
