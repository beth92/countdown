import React from 'react';
import { injectGlobal }  from 'styled-components';

// local components
import Answers from './Answers';
import Controls from './Controls';
import LetterDisplay from './LetterDisplay';

// local utils
import generateLetters from '../utils/letterGenerator';


injectGlobal`
  * {
    margin: 0;
    padding: 0;
  }

  html {
    /* make default rem equal to 10 */
    font-size: 62.5%;
  }

  body {
    background: #aaddcf;
    color: #555555;
    display: flex;
    max-height: 100vh;
    flex-direction: column;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 1.6rem;
  }

  input, button {
    font-size: 1.3rem;
  }

  h1 {
    font-weight: 300;
    font-size: 2.4rem;
  }
`;

const initialState = {
  running: false,
  score: 0,
  letters: generateLetters(9)
};

export default class App extends React.Component {

  constructor() {
    super();
    this.state = initialState;

    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  updateScore(n) {
    this.setState(state => {
      return {
        score: state.score + n
      };
    });
  }

  startGame() {
    console.log('Running game');
    this.setState({
      running: true
    });
  }

  resetGame() {
    // reset everything to initial defaults
    this.setState(initialState);
    this.setState({
      letters: generateLetters(9)
    });
  }

  endGame() {
    console.log('Game Over!');
    this.setState({
      running: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <Controls
          startGame={ this.startGame }
          resetGame={ this.resetGame }
          endGame={ this.endGame }
          score={ this.state.score }/>
        <LetterDisplay letters={ this.state.letters } showLetters={ this.state.running }/>
        <Answers
          updateScore={ (points) => this.updateScore(points) }
          submissionDisabled={ !this.state.running }
          letters={ this.state.letters }/>
      </React.Fragment>
    );
  }
}
