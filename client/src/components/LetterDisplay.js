import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  padding: 3rem;
  text-align: center;
`;

const Letter = styled.div`
  align-items: center;
  background: white;
  border: solid #313131 0.15rem;
  display: inline-flex;
  height: 8rem;
  justify-content: center;
  width: 8rem;
`;

export default class LetterDisplay extends React.Component {

  renderLetters (letters) {
    return letters.map((letter, index) => {
      return (<Letter key={ index }><h1>{ letter }</h1></Letter>);
    });
  }

  render() {
    return (
      <Div>
        { this.renderLetters(this.props.letters) }
      </Div>
    );
  }
}
