import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';

import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import WineCard from '../components/card/WineCard';
import Pagination from '../components/pagination/Pagination';
import { ReactComponent as WineBottles } from '../assets/cheers.svg';

const MyWines = () => {
  // Fetch latest 20 wines in the DB
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(null);
  const [wines, setWines] = useState(0);

  const match = useRouteMatch();

  // Fade-in wine list when loaded
  const fadeAnimation = useSpring({
    opacity: wines.length > 0 ? 1 : 0
  });

  useEffect(() => {
    const token = localStorage.getItem('cork-token');
    const fetchAllWines = async () => {
      // Determine API endpoint based on URL
      const url = match.url.includes('liked')
        ? '/api/wines/mine/liked'
        : '/api/wines/mine';
      try {
        setTotal(null);
        setLoading(true);
        const {
          data: { wines, totalCount }
        } = await axios.get(url, {
          params: {
            limit: 20,
            skip: (match.params.page - 1) * 20,
            sortBy: 'createdAt:desc'
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // If no total, set total number of wines
        if (!total) {
          setTotal(totalCount);
        }

        // Color the hearts if fetching liked wines
        if (match.url.includes('liked')) {
          wines.map(wine => Object.assign(wine, { likedByUser: true }));
        }

        setWines(wines);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    fetchAllWines();
  }, [match.url, match.params.page]);

  const renderWines = () => {
    return wines.map(wine => <WineCard key={wine._id} wine={wine} />);
  };

  const noWines = () => {
    return (
      <EmptyContainer>
        <WineBottles className="icon" />
        <p>Add and like some wines!</p>
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
      <Toggler>
        <Link
          className={match.url.includes('liked') ? 'link' : 'active-link'}
          to="/wines/mine/1"
        >
          Added Wines
        </Link>
        <Link
          className={match.url.includes('liked') ? 'active-link' : 'link'}
          to="/wines/mine/liked/1"
        >
          Liked Wines
        </Link>
      </Toggler>
      <WineList>{renderWines()}</WineList>
      <Pagination page={match.params.page} total={total} />
    </animated.div>
  ) : (
    noWines()
  );
};

const Toggler = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  .link,
  .active-link {
    padding: 0.5rem 1rem;
    margin: 0 1rem;
    font-size: 1.25rem;
    cursor: pointer;
    transition: border 0.2s ease;
  }

  .link {
    border-bottom: 2px transparent solid;
  }

  .active-link {
    border-bottom: 2px var(--maroon) solid;
  }
`;

const WineList = styled.div`
  max-width: 1080px;
  margin: 0 auto;
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
