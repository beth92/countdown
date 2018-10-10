import React from 'react';
import styled from 'styled-components';
import fecha from 'fecha';

const Div = styled.div`
  text-align: center;
`;

const H2 = styled.h2`
  padding: 1rem;
`;

// TODO: do this properly so it doesn't look like crap
const Button = styled.button`
  background: ${props => props.primary ? 'white' : '#5abaa7'};
  border: 0.15rem solid #5abaa7;
  box-shadow: 0.1rem 0.2rem #5abaa7;
  border-radius: 3px;
  color: ${props => props.primary ? '#5abaa7' : 'white'};
  font-size: 1.3em;
  margin: 1em;
  min-width: 10rem;
  padding: 0.25em 1em;

  :hover {
    background: ${props => props.primary ? '#5abaa7' : 'white'};
    color: ${props => props.primary ? 'white' : '#5abaa7'};
  }
`;

const initialState = {
  timeRemaining: 60000,
  running: false,
  gameOver: false
};

const startClicked = function() {
  this.startTime = Date.now();
  this.setState({
    running: true
  });
  this.timerID = window.setInterval(updateClock.bind(this), 100);
  this.props.startGame();
};

const updateClock = function() {
  this.setState({
    timeRemaining: initialState.timeRemaining - (Date.now() - this.startTime)
  });
  if (this.state.timeRemaining < 500) {
    this.endGame();
  }
};

const resetClicked = function() {
  console.log('Reset clicked');
  window.clearInterval(this.timerID);
  this.setState(initialState);
  this.props.resetGame();
};

export default class Controls extends React.Component {

  constructor() {
    super();
    this.state = initialState;
  }

  endGame() {
    window.clearInterval(this.timerID);
    this.setState({
      timeRemaining: 0,
      running: false,
      gameOver: true
    });
    this.props.resetGame();
  }

  render() {
    return (
      <Div>
        <Button primary onClick={ startClicked.bind(this) } disabled={ this.state.running || this.state.gameOver }>Start</Button>
        <Button onClick={ resetClicked.bind(this) }>Reset</Button>
        <Div>
          <H2>
            { fecha.format(this.state.timeRemaining, 'm:ss') }
          </H2>
          <H2> { this.props.score } pts</H2>
        </Div>
      </Div>
    );
  }
}
