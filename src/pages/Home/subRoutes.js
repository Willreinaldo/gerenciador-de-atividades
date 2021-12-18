import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from '../NotFound';

export default function SubRoutes() {
    return (
      <Switch>
        {/* Rotas inexistentes */}
        <Route path={'*'} component={NotFound} />
      </Switch>
    )
  }
  