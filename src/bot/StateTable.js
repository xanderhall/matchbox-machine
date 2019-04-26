import React, { Component } from 'react';
import Board from '../components/Board';
import { orderBy } from 'lodash';

export default class StateTable extends Component {
  render() {
    return (
      <table class='table table-borderless' className='state-table'>
        <tbody>{this.renderRows()}</tbody>
      </table>
    )
  }

  renderRows() {
    const entries = Object.entries(this.props.states);
    const sortedEntries = orderBy(entries, (e) => JSON.parse(e[0]).filter(square => !square).length , 'desc');

    return sortedEntries.map((entry) => {
      const [key, moves] = entry;
      return (
        <tr key={key}>
          <td><Board squares={JSON.parse(key)} /></td>
          <td class='h-100'>{this.renderWeightTable(moves)}</td>
        </tr>
      );
    });
  }

  renderWeightTable(moves) {
    const headers = [];
    const bodies = [];
    moves.forEach((weight, move) => {
      headers.push(
        <th key={move}>({Math.floor(move / 3)},{move % 3})</th>
      );
      bodies.push(
        <td key={move} className={weight ? 'alert alert-success' : 'alert alert-danger'}>{weight}</td>
      )
    });
    return (
      <table class='table table-bordered text-center'>
        <thead class='thead-light'><tr>{headers}</tr></thead>
        <tbody><tr>{bodies}</tr></tbody>
      </table>
    )
  }
}
