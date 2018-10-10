import React from 'react';
import styled from 'styled-components';

// third party components
import { ToastContainer, toast } from 'react-toastify';

// static assets required for toastify
import 'react-toastify/dist/ReactToastify.css';

import validateWord from '../utils/wordValidator';

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

export default class Answers extends React.Component {

  constructor(props) {
    super(props);
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
      console.log('validating word');
      validateWord(submission, this.props.letters).then(res => {
        if (res) {
          const pts = submission.length;
          // toastify doesn't seem to support template strings
          // https://github.com/fkhadra/react-toastify/issues/148
          toast(pts + ' points for ' + submission + '!');
          this.props.updateScore(submission.length);
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
      <Div>
        <ToastContainer autoClose={2000} hideProgressBar={ true }/>
        <Form onSubmit={ this.submitAnswer } >
          <Input disabled={ this.props.submissionDisabled } innerRef={ this.setInputRef }/>
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </Div>
    );
  }
}
