import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/orphanages-map" component={OrphanagesMap} />

        <Route path="/orphanage/:id" component={Orphanage} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
