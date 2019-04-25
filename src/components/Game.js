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

    if (determineWinningState(squares) || squares[i]) {
      return;
    }

    const player = (this.state.turn % 2) === 0 ? 'X' : 'O';
    squares[i] = player;
    this.setState({
      history: [...history, { squares: squares, lastMove: { square: i, player: player } }],
      turn: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.turn];
    const player = ((this.state.turn % 2) === 0 ? 'X' : 'O');
    const isGameOver = determineWinningState(current.squares);

    let status = 'Next player: ' + player;
    let endCondition;
    if (isGameOver) {
      endCondition = current.lastMove.player;
      status = 'Winner: ' + endCondition;
    } else if (this.state.turn === 9) {
      endCondition = 'T';
      status = 'Tie';
    }

    return (
      <div className="game">
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
          gameState={current}
          registerMove={this.handleClick}
          shouldRegisterMove={player === 'O' && !endCondition}
          legalMoves={getLegalMoves(current.squares)}
          endCondition={endCondition}
          turn={this.state.turn}
        />
      </div>
    );
  }
}

function getLegalMoves(squares) {
  const legalMoves = [];
  squares.forEach((mark, i) => {
    if (!mark) legalMoves.push(i);
  });
  return legalMoves;
}

function determineWinningState(squares) {
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
  return lines.some((line) => {
    const [a, b, c] = line;
    return squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
  });
}