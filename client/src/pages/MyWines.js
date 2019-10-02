import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import WineCard from '../components/card/WineCard';
import { ReactComponent as WineBottles } from '../assets/cheers.svg';

const MyWines = () => {
  // Fetch latest 20 wines in the DB
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wines, setWines] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('cork-token');
    const fetchAllWines = async () => {
      // setLoading(false);
      // setError(false);
      try {
        setLoading(true);
        const res = await axios.get('/api/wines/mine', {
          params: {
            limit: 20,
            skip: 0,
            sortBy: 'createdAt:desc'
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWines(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    fetchAllWines();
  }, []);

  const renderWines = () => {
    return wines.map(wine => (
      <li key={wine._id}>
        <WineCard wine={wine} />
      </li>
    ));
  };

  const noWines = () => {
    return (
      <EmptyContainer>
        <WineBottles className="icon" />
        <p>Add some wines!</p>
      </EmptyContainer>
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return wines.length > 0 ? <WineList>{renderWines()}</WineList> : noWines();
};

const WineList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  grid-gap: 1rem;
  justify-content: center;
  margin-bottom: 100px;
`;

const ColorAnimation = keyframes`
  0% { color: var(--lightpurple)}
  50% { color: var(--purple) }
  100% { color: var(--lightpurple) }
`;

const EmptyContainer = styled.div`
  height: calc(100vh - 130px);
  min-width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon {
    max-width: 350px;

    circle {
      fill: var(--maroon) !important;
    }
  }

  p {
    font-size: 2em;
    animation: ${ColorAnimation} 2s linear infinite;
    padding: 1rem;
    margin: 0 auto;
  }
`;

export default MyWines;
