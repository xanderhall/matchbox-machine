import React from 'react'

export default function Scoreboard(props) {
  return (
    <div className='scoreboard'>
      <div className=''>
        <div className=''>X: {props.x || 0}</div>
        <div className=''>O: {props.o || 0}</div>
      </div>
    </div>
  );
}