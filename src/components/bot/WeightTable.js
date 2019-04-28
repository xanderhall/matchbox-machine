import React from 'react';

export default function WeightTable(props) {
  const headers = [];
  const bodies = [];

  props.moves.forEach((weight, move) => {
    headers.push(
      <th key={10 - move}>({Math.floor(move / 3)},{move % 3})</th>
    );
    bodies.push(
      <td key={move} className={weight ? 'alert-success' : 'alert-danger'}>{weight}</td>
    )
  });

  return (
    <table class='weight-table'>
      <thead class='thead-light'><tr>{headers}</tr></thead>
      <tbody><tr>{bodies}</tr></tbody>
    </table>
  )
}