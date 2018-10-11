import React from 'react';
import styled from 'styled-components';

// third party components
import { ToastContainer, toast } from 'react-toastify';

// static assets required for toastify
import 'react-toastify/dist/ReactToastify.css';

// helpers
import validateWord from '../utils/wordValidator';
import { wordAlreadySubmitted } from '../utils/util';

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input.attrs({ type: 'text', name: 'answer', ref: 'submissionField'})`
  border: solid #313131 0.05rem;
  border-radius: 0.5rem;
  font-size: 2.5rem;
  margin: 1rem;
  padding: 1rem;
  flex-grow: 3;
`;

const SubmitButton = styled.button`
  background: white;
  border: solid #313131 0.05rem;
  border-radius: 0.5rem;
  flex-grow: 1;
  margin: 1rem;
`;

const Form = styled.form.attrs({ autoComplete: 'off'})`
  display: flex;
  width: 100%;
`;

const WordList = styled.div`
  background: white;
  display: flex;
  margin: 1rem;
  overflow-y: auto;

  table {
    border-spacing: unset;
  }

  td {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  tr:hover {
    background: #f5f5f5;
  }
`;

export default class Answers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submissions: []
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.setInputRef = (element) => {
      this.submissionField = element;
    };
  }

  submitAnswer(e) {
    e.preventDefault();
    const submission = e.target.answer.value.trim().toUpperCase();
    if(submission && submission.length > 2) {
      e.target.answer.value = '';
      if (wordAlreadySubmitted(submission, this.state.submissions)) {
        toast.info('Word' + submission + 'already submitted!');
        return;
      }
      this.setState((state) => {
        return {
          submissions: state.submissions.concat([{
            word: submission,
            validated: false,
            definition: undefined
          }])
        };
      });
      validateWord(submission, this.props.letters).then(def => {
        if (def) {
          const pts = submission.length;
          // toastify doesn't seem to support template strings
          // https://github.com/fkhadra/react-toastify/issues/148
          toast(pts + ' points for ' + submission + '!');
          this.props.updateScore(submission.length);
          // update the validated and definitions
          // find submission in submissions array
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
    } else {
      toast.info('Words must be longer than two letters');
    }
  }

  componentDidUpdate() {
    if(!this.props.submissionDisabled) {
      // focus the input bar when the game is running
      this.submissionField.focus();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Div>
          <ToastContainer autoClose={2000} hideProgressBar={ true }/>
          <Form onSubmit={ this.submitAnswer } >
            <Input disabled={ this.props.submissionDisabled } innerRef={ this.setInputRef }/>
            <SubmitButton>Submit</SubmitButton>
          </Form>
        </Div>
        <WordList>
          <table>
            <tbody>
              { this.renderSubmissions() }
            </tbody>
          </table>
        </WordList>
      </React.Fragment>
    );
  }

  renderSubmissions() {
    return this.state.submissions.map((submission, index) => {
      return (
        <tr key={ index }>
          <td>{ submission.word }</td>
          <td>{ submission.validated ? submission.word.length : '' }</td>
          <td>{ submission.definition && submission.definition.definition }</td>
        </tr>
      );
    });
  }
}
