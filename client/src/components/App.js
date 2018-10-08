import React from 'react';
import { injectGlobal }  from 'styled-components';

// local components
import Answers from './Answers';
import Controls from './Controls';
import LetterDisplay from './LetterDisplay';


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

const generateLetters = () => {
  return ['H', 'S', 'G', 'E', 'I', 'A', 'C', 'S', 'Y'];
};

const initialState = {
  running: false,
  score: 0,
  letters: generateLetters()
};


const resetGame = function() {
  // reset everything to initial defaults
  this.setState(initialState);
};

const updateScore = function(n) {
  this.setState(state => {
    return {
      score: state.score + n
    };
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
  }

  render() {
    return (
      <React.Fragment>
        <Controls
          startGame={ startGame.bind(this) }
          resetGame={ resetGame.bind(this) }
          score={ this.state.score }/>
        <LetterDisplay letters={ this.state.letters }/>
        <Answers updateScore={ updateScore.bind(this) }/>
      </React.Fragment>
    );
  }
}
