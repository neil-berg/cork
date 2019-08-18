import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
);
export default App;
