import React from 'react';
import styled from 'styled-components';

// third party components
import { ToastContainer, toast } from 'react-toastify';

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
  min-height: 4rem;
`;

const Form = styled.form.attrs({ autoComplete: 'off'})`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const WordList = styled.div`
  background: white;
  display: flex;
  margin: 1rem;
  overflow-y: auto;

  table {
    border-spacing: unset;
    width: 100%;
  }

  td {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  tr.invalid {
    font-style: italic;
    opacity: 0.5;
  }

  tr:hover {
    background: #f5f5f5;
  }
`;

export default class Answers extends React.Component {

  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);

    // used to auto focus form on game start
    this.setInputRef = (element) => {
      this.submissionField = element;
    };
  }

  submitForm(e) {
    e.preventDefault();
    const submission = e.target.answer.value.trim().toUpperCase();
    if(submission && submission.length > 2) {
      e.target.answer.value = '';
      this.props.submitAnswer(submission);
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
          <Form onSubmit={ this.submitForm } >
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
    return this.props.submissions.map((submission, index) => {
      return (
        <tr key={ index } className={  !submission.validated ? 'invalid' : undefined } >
          <td>{ submission.word }</td>
          <td>
            { submission.validated ? `${submission.word.length} pts` : '' }
          </td>
          <td>
            { submission.definition && `${submission.definition.partOfSpeech}: ${submission.definition.definition}` }
          </td>
        </tr>
      );
    });
  }
}
