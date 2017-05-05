// @flow

import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from '../components/Loading';
import AdminHomes from './admin/AdminHomes';
import { login, onAuthStateChanged } from '../utils/auth';

type Props = {
  location: Object,
  history: Object,
};

type State = {
  error: Error | null,
  loading: boolean,
};

class Login extends Component<void, Props, State> {
  static path = '/login';

  state = {
    error: null,
    loading: false,
  };

  handleSubmit: (event: Event) => void;
  email: Object;
  password: Object;

  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const email = this.email.input.value;
    const password = this.password.input.value;

    this.setState(
      {
        error: null,
        loading: true,
      },
      () => {
        const { location, history } = this.props;

        login(email, password)
          .then(() => {
            onAuthStateChanged(() => {
              if (location.state && location.state.from) {
                return history.replace(location.state.from);
              }

              return history.replace(AdminHomes.path);
            });
          })
          .catch(error => {
            console.error('Login::error', error);
            this.setState({
              error,
              loading: false,
            });
          });
      }
    );
  }

  render() {
    const { error, loading } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-xs-10 push-xs-1 col-md-6 push-md-3">
            <div className="col-xs-12">
              <TextField
                id="email"
                floatingLabelText="E-post"
                type="email"
                required
                fullWidth
                ref={email => {
                  this.email = email;
                }}
                errorText={
                  error && error.code === 'auth/invalid-email' && error.message
                }
              />
            </div>
            <div className="col-xs-12">
              <TextField
                id="password"
                floatingLabelText="Passord"
                type="password"
                required
                fullWidth
                ref={password => {
                  this.password = password;
                }}
                errorText={
                  error && error.code === 'auth/wrong-password' && error.message
                }
              />
            </div>
            <div className="col-xs-12">
              <RaisedButton
                primary
                label="Logg inn"
                fullWidth
                type="submit"
                disabled={loading}
              />
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
