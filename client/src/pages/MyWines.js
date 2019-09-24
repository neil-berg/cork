import React, { useContext } from 'react';

import UserContext from '../context/UserContext';
import Layout from '../components/layout/Layout';

const MyWines = () => {
  const [user, setUser] = useContext(UserContext);

  return user.isLoggedIn ? (
    <Layout>
      <div>My wines!!!</div>
    </Layout>
  ) : (
    <Layout>
      <div>
        <h2>Please log in to add a wine</h2>
      </div>
    </Layout>
  );
};

export default MyWines;
