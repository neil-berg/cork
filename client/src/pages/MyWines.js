import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';

import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import WineCard from '../components/card/WineCard';
import Pagination from '../components/pagination/Pagination';
import { ReactComponent as WineBottles } from '../assets/cheers.svg';

const MyWines = () => {
  // Fetch latest 20 wines in the DB
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wines, setWines] = useState([]);

  const match = useRouteMatch();

  // Fade-in wine list when loaded
  const fadeAnimation = useSpring({
    opacity: wines.length > 0 ? 1 : 0
  });

  useEffect(() => {
    const token = localStorage.getItem('cork-token');
    const fetchAllWines = async () => {
      // setLoading(false);
      // setError(false);
      try {
        setLoading(true);
        const { data: wines } = await axios.get('/api/wines/mine', {
          params: {
            limit: 20,
            skip: (match.params.page - 1) * 20,
            sortBy: 'createdAt:desc'
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { data } = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Append new boolean prop 'likedByUser' if wine id's match
        const likedWines = data.likedWines;
        wines.map(wine =>
          likedWines.includes(wine._id)
            ? Object.assign(wine, { likedByUser: true })
            : Object.assign(wine, { likedByUser: false })
        );

        setTotal(wines.length);
        setWines(wines);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    fetchAllWines();
  }, []);

  // // Fetch likedWines
  useEffect(() => {
    const token = localStorage.getItem('cork-token');
    const fetchLikedWines = async () => {
      try {
        const data = await axios.get('/api/users/me/likes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        //console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLikedWines();
  }, []);

  const renderWines = () => {
    return wines.map(wine => <WineCard key={wine._id} wine={wine} />);
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

  return wines.length > 0 ? (
    <animated.div style={fadeAnimation}>
      <WineList>{renderWines()}</WineList>
      <Pagination page={match.params.page} total={total} />
    </animated.div>
  ) : (
    noWines()
  );
};

const WineList = styled.div`
  max-width: 1080px;
  margin: 1rem auto 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  justify-content: center;

  @media screen and (min-width: 450px) {
    grid-gap: 1rem;
    padding: 0 1rem;
  }
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
