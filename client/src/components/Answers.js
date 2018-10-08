import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input.attrs({ type: 'text' })`
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

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const submitAnswer = (e) => {
  e.preventDefault();
  alert('submitted');
};

export default class Answers extends React.Component {

  render() {
    return (
      <Div>
        <Form onSubmit={ submitAnswer }>
          <Input/>
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </Div>
    );
  }
}
