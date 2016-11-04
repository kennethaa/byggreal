import React from 'react';
import {
    Route,
    IndexRoute,
    // Redirect
} from 'react-router';

import App from '../app/App';
import Main from '../containers/Main';
import Homes from '../containers/Homes';
import Lettings from '../containers/Lettings';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="/bolig-til-salgs" component={Homes} />
        <Route path="/bolig-til-leie" component={Lettings} />
    </Route>
);
