import React from 'react';
import StepButton from './StepButton';
import Scoreboard from './Scoreboard';

export default function InfoPanel(props) {

  return (
    <div className="game-info card">
      <div className='card-body'>
        <h5 className='card-title'>Game Info</h5>
        <Scoreboard scores={props.scores}/>
        <p className='card-text'>{props.status}</p>
        <StepButton step={0} jumpTo={props.jumpTo}></StepButton>
      </div>
    </div>
  );
}
