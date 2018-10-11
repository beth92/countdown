import React from 'react';
import { injectGlobal }  from 'styled-components';

// third party components
import { ToastContainer, toast } from 'react-toastify';

// static assets required for toastify
import 'react-toastify/dist/ReactToastify.css';

// local components
import Answers from './Answers';
import Controls from './Controls';
import LetterDisplay from './LetterDisplay';

// local utils
import generateLetters from '../utils/letterGenerator';
import validateWord from '../utils/wordValidator';
import { wordAlreadySubmitted } from '../utils/util';


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
  letters: generateLetters(9),
  submissions: []
};

export default class App extends React.Component {

  constructor() {
    super();
    this.state = initialState;

    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.updateScore = this.updateScore.bind(this);

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  startGame() {
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
    this.setState({
      running: false
    });
  }

  updateScore(n) {
    this.setState(state => {
      return {
        score: state.score + n
      };
    });
  }

  submitAnswer(submission) {
    // don't allow duplicate submissions
    if (wordAlreadySubmitted(submission, this.state.submissions)) {
      toast.info('Word ' + submission + ' already submitted!');
      return;
    }

    // register the new submission
    this.setState((state) => {
      return {
        submissions: state.submissions.concat([{
          word: submission,
          validated: false,
          definition: undefined
        }])
      };
    });

    // start word verification and update state once a response comes back
    validateWord(submission, this.state.letters).then(def => {
      if (def) {
        const pts = submission.length;
        // toastify doesn't seem to support template strings
        // https://github.com/fkhadra/react-toastify/issues/148
        toast(pts + ' points for ' + submission + '!');
        this.updateScore(submission.length);

        // update validated and definition
        this.setState((state) => {
          return {
            submissions: state.submissions.map(item => {
              if (item.word === submission) {
                item.validated = true;
                item.definition = def;
              }
              return item;
            })
          };
        });
      } else {
        toast.error(submission + ' is invalid!');
      }
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
          submissionDisabled={ !this.state.running }
          submissions={ this.state.submissions }
          submitAnswer={ (submission) => this.submitAnswer(submission) }/>
        <ToastContainer autoClose={2000} hideProgressBar={ true }/>
      </React.Fragment>
    );
  }
}
