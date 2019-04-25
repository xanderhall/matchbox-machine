import React from 'react';
import StepButton from './StepButton';

export default function InfoPanel(props) {
  const moveList = props.history.map((step, i) =>
    <StepButton
      key={i}
      step={i}
      jumpTo={() => props.jumpTo(i)}
    />
  );

  return (
    <div className="game-info">
      <div>{props.status}</div>
      <ol>
        <StepButton step={0} jumpTo={() => props.jumpTo(0)}></StepButton>
      </ol>
    </div>
  );
}
