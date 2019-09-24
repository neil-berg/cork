import React from 'react';
import styled, { keyframes } from 'styled-components';

const BounceAnimation = keyframes`
  0% { background-color: grey; transform: scale(1) }
  50% { transform: scale(1.15) }
  100% { transform: scale(1) }
`;

const DotWrapper = styled.div`
  display: flex;
  height: calc(100vh - 130px);
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  background-color: lightgrey;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin: 0 5px;
  animation: ${BounceAnimation} 0.75s linear infinite;
  animation-delay: ${props => props.delay};
`;

const Loading = () => {
  return (
    <DotWrapper data-testid="loading-dots">
      <Dot delay="0s" />
      <Dot delay=".1s" />
      <Dot delay=".2s" />
    </DotWrapper>
  );
};

export default Loading;
