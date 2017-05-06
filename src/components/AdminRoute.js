// @flow

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser, onAuthStateChanged } from '../utils/auth';
import Login from '../routes/Login';

type Props = {
  component: Function,
};

type State = {
  isAuthenticated?: boolean,
};

class AdminRoute extends Component<void, Props, State> {
  state = {
    isAuthenticated: getCurrentUser() ? true : undefined,
  };

  removeListener: () => void;

  componentDidMount() {
    const { isAuthenticated } = this.state;

    if (isAuthenticated === undefined) {
      this.removeListener = onAuthStateChanged(user => {
        this.setState({
          isAuthenticated: user ? true : false,
        });
      });
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { component: AdminComponent, ...rest } = this.props;

    const { isAuthenticated } = this.state;

    if (typeof isAuthenticated !== 'boolean') {
      return null;
    }

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated
            ? <AdminComponent {...props} />
            : <Redirect
                to={{
                  pathname: Login.path,
                  state: {
                    from: props.location,
                  },
                }}
              />}
      />
    );
  }
}

export default AdminRoute;
