import React from 'react';
import {
    Route,
    IndexRoute,
    Redirect
} from 'react-router';

import App from '../app/App';
import Main from '../containers/Main';
import Homes from '../containers/Homes';
import Lettings from '../containers/Lettings';
import Login from '../containers/Login';

import AdminHomes from '../containers/admin/AdminHomes';
import AdminLettings from '../containers/admin/AdminLettings';

import auth from '../utils/auth';
import '../utils/firebase';

function redirectToLogin(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
}

function redirectToAdminIfLoggedIn(nextState, replace) {
    if (auth.loggedIn()) {
        replace('/admin');
    }
}

function logout(nextState, replace) {
    if (auth.loggedIn()) {
        auth.logout(() => {
            replace('/');
        });
    }
}

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="/bolig-til-salgs" component={Homes} />
        <Route path="/bolig-til-leie" component={Lettings} />

        <Route path="/login" component={Login} onEnter={redirectToAdminIfLoggedIn} />
        <Route path="/logout" onEnter={logout} />
        <Redirect from="/admin" to={AdminHomes.path} />
        <Route path={AdminHomes.path} component={AdminHomes} onEnter={redirectToLogin}>
            <Route path=":homeId" />
        </Route>
        <Route path={AdminLettings.path} component={AdminLettings} onEnter={redirectToLogin}>
            <Route path=":lettingId" />
        </Route>
    </Route>
);
