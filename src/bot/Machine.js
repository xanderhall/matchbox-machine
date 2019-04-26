import sample from 'lodash/sample';
import React from 'react';
import StateTable from './StateTable';

export default class MatchboxMachine extends React.Component {
  constructor(props) {
    super(props);
    this.props.getMachineEvaluationFunction(this.resolveMove.bind(this));
    this.state = {
      stateMap: new Map(),
      history: [],
    }
  }

  resolveMove(props) {
    if (props.endCondition) {
      this.resolveEnd(props.endCondition);
      return;
    }
    const state = props.state;
    const key = JSON.stringify(state);
    const map = this.state.stateMap;
    const history = this.state.history.slice(0, props.turn + 1);

    // Check if current game state has previously been evaluated
    if (!map.has(key)) {
      const weightMap = [];
      props.legalMoves.forEach((move) => weightMap[move] = 1);
      map.set(key, weightMap);
    }

    // Get list of available moves that haven't been 'marked off'
    const availableMoves = map.get(key);

    const usefulMoves = [];
    availableMoves.forEach((weight, move) => {
      if (weight > 0) usefulMoves.push(move);
    })
    const randomMove = sample(usefulMoves);

    // Store the move for this game
    history[props.turn] = { state: state, move: randomMove };
    this.setState({
      history: history,
    });

    // Register the move with the game
    props.registerMove(randomMove);
  }

  resolveEnd(type) {
    if (type === 'X') {
      this.resolveLoss();
    } else if (type === 'O') {
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
    const key = JSON.stringify(lastMove.state);
    const availableMoves = map.get(key).slice();
    availableMoves[lastMove.move] = 0;
    map.set(key, availableMoves);
    if (availableMoves.every(weight => !weight)) {
      this.resolveLoss();
    }
  }

  render() {
    return (
      <div className='machine'>
        <div className='machine-info'>
          <h1>Hi, I'm a machine!</h1>
          As you play, I'll get better at this game.
          Below, you can see the choices I'm making each time you make a move.
        </div>
        <StateTable states={this.state.stateMap}/>
      </div>
    )
  }
}