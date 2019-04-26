import sample from 'lodash/sample';
import React from 'react';
import StateTable from './StateTable';

export default class MatchboxMachine extends React.Component {
  constructor(props) {
    super(props);
    this.props.getMachineEvaluationFunction(this.resolveMove.bind(this));
    this.state = {
      decisionMap: {},
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
    const map = {...this.state.decisionMap};
    const history = this.state.history.filter(h => h.turn < props.turn);

    // Check if current game state has previously been evaluated
    if (!map.hasOwnProperty(key)) {
      map[key] = [];
      props.legalMoves.forEach(move => map[key][move] = 2)
    }

    // Get list of best moves. This setup allows for adjustment from winning.
    const moves = map[key];
    const highestWeight = moves.reduce((a, b) => Math.max(a, b));

    const usefulMoves = Object.keys(moves).filter(move => moves[move] === highestWeight);
    const randomMove = sample(usefulMoves);

    // Store the move for this game
    this.setState({
      history: [...history, { state: state, move: randomMove, turn: props.turn }],
      decisionMap: map
    }, () => props.registerMove(randomMove));

  }

  resolveEnd(type) {
    // translated from current tic-tac-toe endcon, will need to be refactored
    const translation = {'X': 'L', 'O': 'W'}
    const endType = translation[type];
    if (endType === 'L') {
      this.resolveLoss();
    } else if (endType === 'W') {
      this.resolveWin();
    } else {
      this.resolveTie();
    }
  }

  resolveWin() {
    const history = this.state.history.slice();
    const map = {...this.state.decisionMap};
    history.forEach((o) => {
      map[JSON.stringify(o.state)][o.move]++;
    });

    this.setState({
      decisionMap: map
    })
  }

  resolveTie() {
    // currently, do nothing
  }

  resolveLoss() {
    // Set weight of last move used to 0
    const map = {...this.state.decisionMap};
    const history = this.state.history.slice();
    let lastMove, key;
    do {
      lastMove = history.pop();
      key = JSON.stringify(lastMove.state);
      map[key][lastMove.move] = 0;
    } while (map[key].every(weight => !weight));

    this.setState({
      decisionMap: map
    })
  }

  render() {
    return (
      <div className='machine'>
        <div className='machine-info'>
          <h1>Hi, I'm a machine!</h1>
          As you play, I'll get better at this game.
          Below, you can see the choices I'm making each time you make a move.
        </div>
        <StateTable states={this.state.decisionMap} />
      </div>
    )
  }
}