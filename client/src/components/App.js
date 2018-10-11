import React from 'react';
import { injectGlobal }  from 'styled-components';

// third party components
import { ToastContainer, toast } from 'react-toastify';
import ReactModal from 'react-modal';

// static assets required for toastify
import 'react-toastify/dist/ReactToastify.css';

// local components
import Answers from './Answers';
import Controls from './Controls';
import LetterDisplay from './LetterDisplay';
import Help from './Help';

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
    color: #555555;

    &:focus {
      outline: none;
    }
  }

  button {
    background: white;
    border: none;
    font-size: 2.1rem;
    margin: 1em;
    min-width: 10rem;
    padding: 0.25em 1em;

    &.close-modal {
      border: solid #555555 0.01rem;
    }
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
  submissions: [],
  showHelpModal: false
};

ReactModal.setAppElement('#root');

export default class App extends React.Component {

  constructor() {
    super();
    this.state = initialState;

    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.updateScore = this.updateScore.bind(this);

    this.submitAnswer = this.submitAnswer.bind(this);

    // modal related
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={ this.handleOpenModal }>How to play</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
          style={{
            content: {
              backgroundColor: 'white'
            }
          }}
        >
          <Help/>
          <button className='close-modal' onClick={this.handleCloseModal}>I'm ready to play</button>
        </ReactModal>
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
