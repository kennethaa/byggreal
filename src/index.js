import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getTheme from './theme';

import AdminRoute from './components/AdminRoute';

import App from './app/App';
import Main from './routes/Main';
import Homes from './routes/Homes';
import Lettings from './routes/Lettings';
import Login from './routes/Login';
import Logout from './routes/Logout';

import AdminHomes from './routes/admin/AdminHomes';
import AdminLettings from './routes/admin/AdminLettings';

injectTapEventPlugin();

import './utils/firebase';

render(
  <MuiThemeProvider muiTheme={getMuiTheme(getTheme())}>
    <Router>
      <App>
        <Route path={Main.path} exact component={Main} />
        <Route path={Homes.path} component={Homes} />
        <Route path={Lettings.path} component={Lettings} />
        <Route path={Login.path} component={Login} />
        <Route path={Logout.path} component={Logout} />
        <AdminRoute
          path={`${AdminHomes.path}/:homeId?`}
          component={AdminHomes}
        />
        <AdminRoute
          path={`${AdminLettings.path}/:lettingId?`}
          component={AdminLettings}
        />
      </App>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
