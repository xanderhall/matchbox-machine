import React from 'react'
import PropTypes from 'prop-types'
import sample from 'lodash/sample';

export default class MatchboxMachine extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stateMap: new Map(),
      history: [],
    }
  }

  static propTypes = {
    gameState: PropTypes.object.isRequired,
    registerMove: PropTypes.func.isRequired,
    shouldRegisterMove: PropTypes.bool,
    legalMoves: PropTypes.array,
    endCondition: PropTypes.string
  }

  resolveMove() {
    const state = this.props.gameState;
    const stateString = JSON.stringify(state);
    const map = this.state.stateMap;
    const history = this.state.history.slice(0, this.props.turn + 1);

    // Check if current game state has previously been evaluated
    if (!map.has(stateString)) {
      const weightMap = [];
      this.props.legalMoves.forEach((move) => weightMap[move] = 1);
      map.set(stateString, weightMap);
    }

    // Get list of available moves that haven't been 'marked off'
    const availableMoves = map.get(stateString);
    const usefulMoves = [];
    availableMoves.forEach((weight, move) => {
      if (weight > 0) usefulMoves.push(move);
    })
    const randomMove = sample(usefulMoves);

    // Register the move with the game
    this.props.registerMove(randomMove);

    // Store the moves for this game
    history[this.props.turn] = { state: state, move: randomMove };
    this.setState({
      history: history,
    });
  }

  resolveEnd() {
    if (this.props.endCondition === 'X') {
      this.resolveLoss();
    } else if (this.props.endCondition === 'O') {
      this.resolveWin();
    } else {
      this.resolveTie();
    }
  }

  resolveWin() {
    // currently, do nothing
  }

  resolveTie() {
    // currently, do nothing
  }

  resolveLoss() {
    // Set weight of last move used to 0
    const lastMove = this.state.history.slice().pop();
    const map = this.state.stateMap;
    const stateString = JSON.stringify(lastMove.state);
    const availableMoves = map.get(stateString).slice();
    availableMoves[lastMove.move] = 0;
    map.set(stateString, availableMoves);
    if (availableMoves.every(weight => !weight)) {
      this.resolveLoss();
    }
  }

  renderMatchboxes() {
    const rows = [];
    this.state.stateMap.forEach((moves, stateString) => {
      rows.push(
        <tr key={stateString}>
          <td>For the state given by {stateString}, the bot has these weights:</td>
          {moves.map((weight, move) => <td key={move}>{move}: {weight}</td>)}
        </tr>
      );
    });
    return rows;
  }

  render() {
    if (this.props.endCondition) {
      this.resolveEnd();
    } else if (this.props.shouldRegisterMove) {
      this.resolveMove();
    }

    return (
      <div className='machine'>
        <div className='machine-info'>
          <h1>Hi, I'm a machine!</h1>
        </div>
        <table className='matchboxes'>
          {this.renderMatchboxes()}
        </table>
      </div>
    )
  }
}