import React from 'react'

export default function Square(props) {
  const style = props.position % 2 
  ? 'even-square-' + props.size 
  : 'odd-square-' + props.size;
  
  return (
    <div className={style} onClick={props.onClick}>
      {props.value}
    </div>
  )
}