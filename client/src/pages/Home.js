import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';

import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import WineCard from '../components/card/WineCard';
import UserContext from '../context/UserContext';
import Pagination from '../components/pagination/Pagination';

const Home = () => {
  const [user, setUser] = useContext(UserContext);

  const match = useRouteMatch();

  // Fetch all wines in the DB
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wines, setWines] = useState([]);

  useEffect(() => {
    // Fetch latest wines in the DB and if a
    // user is logged in, their liked wines
    const fetchAllWines = async () => {
      setLoading(false);
      setError(false);
      try {
        setLoading(true);
        const {
          data: { wines, totalCount }
        } = await axios.get('/api/wines/all', {
          params: {
            limit: 20,
            skip: (match.params.page - 1) * 20,
            sortBy: 'createdAt:desc'
          }
        });

        // On initial mount, set total number of wines
        if (!total) {
          setTotal(totalCount);
        }

        // If a user is logged in, fetch their liked wines
        if (user.isLoggedIn) {
          const token = localStorage.getItem('cork-token');
          if (!token) setError(true);
          const {
            data: { likedWines }
          } = await axios.get('/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          // Append new boolean prop 'likedByUser' if wine id's match
          wines.map(wine =>
            likedWines.includes(wine._id)
              ? Object.assign(wine, { likedByUser: true })
              : Object.assign(wine, { likedByUser: false })
          );
        }

        setWines(wines);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchAllWines();
  }, [user.isLoggedIn, match.params.page]);

  const renderWines = () => {
    return wines.map(wine => <WineCard key={wine._id} wine={wine} />);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <WineList>{renderWines()}</WineList>
      <Pagination page={match.params.page} total={total} />
    </div>
  );
};

const WineList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  justify-content: center;
  margin-top: 1rem;
  // margin-bottom: 100px;

  @media screen and (min-width: 450px) {
    grid-gap: 1rem;
  }
`;

export default Home;
