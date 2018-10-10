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


const resetGame = function() {
  // reset everything to initial defaults
  this.setState(initialState);
  this.setState({
    letters: generateLetters(9)
  });
};

const startGame = function() {
  console.log('Running game');
  this.setState({
    running: true
  });
};

export default class App extends React.Component {

  constructor() {
    super();
    this.state = initialState;

    this.updateScore = this.updateScore.bind(this);
  }

  updateScore(n) {
    this.setState(state => {
      return {
        score: state.score + n
      };
    });
  }

  render() {
    return (
      <React.Fragment>
        <Controls
          startGame={ startGame.bind(this) }
          resetGame={ resetGame.bind(this) }
          score={ this.state.score }/>
        <LetterDisplay letters={ this.state.letters }/>
        <Answers
          updateScore={ (points) => this.updateScore(points) }
          submissionDisabled={ !this.state.running }
          letters={ this.state.letters }/>
      </React.Fragment>
    );
  }
}
