import React from 'react'

export default function Scoreboard(props) {
  return (
    <div className='scoreboard'>
      <div className=''>
        <div className=''>X: {props.scores.X || 0}</div>
        <div className=''>O: {props.scores.O || 0}</div>
      </div>
    </div>
  );
}