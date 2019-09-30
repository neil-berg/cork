import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import axios from 'axios';

import UserContext from './context/UserContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AddWine from './pages/AddWine';
import MyWines from './pages/MyWines';
import UserAccount from './pages/UserAccount';
import NotFound from './pages/NotFound';

import './styles/Layout.css';

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
          _id,
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
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/wines/add">
            <AddWine />
          </Route>
          <Route path="/wines/view">
            <MyWines />
          </Route>
          <Route path="/account">
            <UserAccount />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </UserContext.Provider>
    </div>
  );
};

export default App;
