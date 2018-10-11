import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  margin: 3rem;
`;

const H2 = styled.h2`
  padding: 1rem 0px;
`;

const P = styled.p`
  line-height:
  padding: 1rem;
`;

const Li = styled.li`
  line-height: 120%;
  padding: 1rem;
`;

export default class Help extends React.Component {

  render() {
    return (
      <Div>
        <H2>A Game of Countdown</H2>
        <P> You have one minute to try to find as many words as possible from
          the letters provided. Here are the rules: </P>
        <ul>
          <Li>Type your answers in with the keyboard and hit enter (or the submit button) to submit</Li>
          <Li>You get a point for each letter in the word you submit</Li>
          <Li>Words must consist of at least 3 letters</Li>
          <Li>CLick the reset button to start again!</Li>
        </ul>
      </Div>
    );
  }
}
