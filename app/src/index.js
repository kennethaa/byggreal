import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import getTheme from './theme';

injectTapEventPlugin();

render(
    <MuiThemeProvider muiTheme={getMuiTheme(getTheme())}>
        <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>,
    document.getElementById('root')
);
