import React from 'react';
import Square from './Square';
import { chunk } from 'lodash';
import PropTypes from 'prop-types';

export default class Board extends React.Component {

  static propTypes = {
    squares: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.string
  }

  static defaultProps = {
    onClick: () => {},
    size: 'small'
  }
  
  renderSquare(i) {
    return (
      <Square
        key={i}
        position={i}
        size={this.props.size}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const squares = this.props.squares.map((square, i) => this.renderSquare(i));
    const rows = chunk(squares, 3).map((row, i) => <div key={i} className="board-row">{row}</div>);

    return (
      <div className="game-board">
        {rows}
      </div>
    );
  }
}