import React, { useContext } from 'react';

import UserContext from '../context/UserContext';

const MyWines = () => {
  const [user, setUser] = useContext(UserContext);

  return user.isLoggedIn ? (
    <div>My wines!!!</div>
  ) : (
    <div>
      <h2>Please log in to add a wine</h2>
    </div>
  );
};

export default MyWines;
