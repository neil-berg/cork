import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import axios from 'axios';

import UserContext from './context/UserContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // If a valid token exists, log the user in on app mount
    const logUserIn = async () => {
      try {
        const token = localStorage.getItem('cork-token');
        const res = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { _id, name, username, email } = res.data;

        setUser({
          name,
          username,
          email,
          id: _id,
          isLoggedIn: true
        });
      } catch (error) {
        console.log(error);
      }
    };
    logUserIn();
  }, []);

  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
};

export default App;
