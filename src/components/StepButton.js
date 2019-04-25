import React from 'react'

export default function StepButton(props) {
  return (
    <button class='btn btn-primary' onClick={() => props.jumpTo(props.step)}>
      {props.step > 0 ? "Go to move " + props.step : "Restart game"}
    </button>
  );
}