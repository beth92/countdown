import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  flex-grow: 2;
  padding: 1rem;
`;

export default class InfoPanel extends React.Component {

  render() {
    return (
      <Div>
        <h3>{ this.props.header }</h3>
        <p>{ this.props.content }</p>
      </Div>
    );
  }
}
