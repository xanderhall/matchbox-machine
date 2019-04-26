import React, { Component } from 'react';
import Board from './Board';
import InfoPanel from './InfoPanel';
import MatchboxMachine from '../bot/Machine';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastMove: null,
      }],
      turn: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.turn + 1);
    const squares = history[history.length - 1].squares.slice();

    if (determineEndCondition(squares) || squares[i]) {
      return;
    }

    const player = (this.state.turn % 2) === 0 ? 'X' : 'O';
    squares[i] = player;
    this.setState({
      history: [...history, { squares: squares, lastMove: { square: i, player: player } }],
      turn: history.length,
    }, () => {
      const endCondition = determineEndCondition(squares);
      if (endCondition || player === 'X') {
        this.state.evaluateMachineMove({
          state: squares,
          turn: this.state.turn,
          legalMoves: getLegalMoves(squares),
          endCondition: endCondition,
          registerMove: this.handleClick
        })
      }
    });
  }

  render() {
    const history = this.state.history.slice();
    const current = history[this.state.turn];
    const player = ((this.state.turn % 2) === 0 ? 'X' : 'O');
    const endCondition = determineEndCondition(current.squares);

    let status;
    if (endCondition === 'X' || endCondition === 'O') {
      status = 'Winner: ' + endCondition;
    } else if (endCondition === 'T') {
      status = 'Tie';
    } else {
      status = 'Next player: ' + player;
    }

    return (
      <div className="container-fluid">
        <Board
          squares={current.squares}
          onClick={this.handleClick}
        />
        <InfoPanel
          status={status}
          history={history}
          jumpTo={(i) => this.setState({ turn: i })}
        />
        <MatchboxMachine
          getMachineEvaluationFunction={(func) => this.setState({ evaluateMachineMove: func })}
        />
      </div>
    );
  }
}

function getLegalMoves(squares) {
  return Object.keys(squares).filter(i => !squares[i]);
}

function determineEndCondition(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line in lines) {
    const [a, b, c] = lines[line];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (!squares.some(square => !square)) {
    return 'T';
  }
  return false;
}