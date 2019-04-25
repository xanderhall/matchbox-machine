import React from 'react';
import Square from './Square';
import { chunk } from 'lodash';

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const squares = this.props.squares.map((square, i) => this.renderSquare(i));
    const rows = chunk(squares, 3).map((row, i) =>
      <tr key={i} className="board-row">{row}</tr>
    );

    return (
      <table className="game-board">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}