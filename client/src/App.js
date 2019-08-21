import React, { useState } from 'react';
import { Route, Switch } from 'react-router';

import UserContext from './context/UserContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  const [user, setUser] = useState({});

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
