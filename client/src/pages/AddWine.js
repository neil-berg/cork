import React, { useContext } from 'react';

import UserContext from '../context/UserContext';
import Layout from '../components/Layout';

const AddWine = () => {
  const [user, setUser] = useContext(UserContext);

  return user.isLoggedIn ? (
    <Layout>
      <div>Add wine!!!</div>
    </Layout>
  ) : (
    <Layout>
      <div>
        <h2>Please log in to add a wine</h2>
      </div>
    </Layout>
  );
};

export default AddWine;
