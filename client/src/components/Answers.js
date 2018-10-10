import React from 'react';
import styled from 'styled-components';

import validateWord from '../utils/wordValidator';

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input.attrs({ type: 'text', name: 'answer'})`
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
  }

  submitAnswer(e) {
    e.preventDefault();
    const submission = e.target.answer.value.trim().toUpperCase();
    if(submission && submission.length > 2) {
      e.target.answer.value = '';
      console.log('validating word');
      validateWord(submission, this.props.letters).then(res => {
        if (res) {
          console.log('word ' + submission + ' valid');
          this.props.updateScore(submission.length);
        }
      });
    }
  }

  render() {
    return (
      <Div>
        <Form onSubmit={ this.submitAnswer } >
          <Input disabled={ this.props.submissionDisabled }/>
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </Div>
    );
  }
}
