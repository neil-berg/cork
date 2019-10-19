import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { ReactComponent as Grapes } from '../../assets/grapes.svg';
import { ReactComponent as Field } from '../../assets/field.svg';
import { ReactComponent as Globe } from '../../assets/worldwide.svg';
import { ReactComponent as Flag } from '../../assets/flag.svg';
import { capitalize } from '../../util/capitalize';

const DetailsOverlay = ({ showDetails, wine }) => {
  // const slideAnimation = useSpring({
  //   opacity: showDetails ? 1 : 0,
  //   transform: showDetails ? `translateX(0)` : `translateX(-100px)`
  // });

  const typeColorMap = {
    red: 'rgb(247, 20, 103)',
    white: 'rgb(248, 247, 250)',
    rosé: '#fabfb6',
    orange: '#fab143',
    dessert: '#901e96',
    sparkling: '#f5f1b3'
  };

  return (
    <OverlayContainer showDetails={showDetails}>
      <div className="info-container">
        <FontAwesomeIcon
          className="info-icon"
          icon={faCircle}
          color={typeColorMap[wine.type]}
        />
        <span className="info-text">{capitalize(wine.type)}</span>
      </div>
      {wine.vineyard && (
        <div className="info-container">
          <Field className="info-icon" />
          <span className="info-text">{wine.vineyard}</span>
        </div>
      )}
      {wine.varietal && (
        <div className="info-container">
          <Grapes className="info-icon" />
          <span className="info-text">{wine.varietal}</span>
        </div>
      )}
      {wine.country && (
        <div className="info-container">
          <Globe className="info-icon" />
          <span className="info-text">{wine.country}</span>
        </div>
      )}
      {wine.region && (
        <div className="info-container">
          <Flag className="info-icon" />
          <span className="info-text">{wine.region}</span>
        </div>
      )}
    </OverlayContainer>
  );
};

const OverlayContainer = styled.div`
  position: absolute;
  top: 26px;
  left: 0;
  width: 75%;
  padding: 2.5rem 1rem 1rem 1rem;
  background: rgba(76, 76, 79, 0.95);
  border-radius: 0 10px 10px 0;
  border: 1px var(--grey) solid;
  box-shadow: 0px 10px 20px rgba(243, 243, 243, 0.35);
  opacity: ${props => (props.showDetails ? '1' : '0')};
  transform: translateX(${props => (props.showDetails ? '0px' : '-50px')});
  transition: all 0.3s ease;

  .info-container {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }

  .info-icon {
    height: 25px;
    width: 25px;
    margin-right: 1rem;
    fill: var(--white);
  }

  .info-text {
    color: var(--white);
  }
`;

export default DetailsOverlay;
