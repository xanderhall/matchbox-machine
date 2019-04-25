import React from 'react'

export default function Square (props) {
  return (
    <td className="square" onClick={props.onClick}>
      {props.value}
    </td>
  )
}