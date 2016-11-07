import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from '../components/Loading';
import auth from '../utils/auth';

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            error: false,
            loading: false
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        const username = this.username.input.value;
        const password = this.password.input.value;

        this.setState({
            error: false,
            loading: true
        }, auth.login(username, password, (loggedIn) => {
            if (!loggedIn) {
                return this.setState({
                    error: true,
                    loading: false
                });
            }

            const { location } = this.props;

            if (location.state && location.state.nextPathname) {
                return this.props.router.replace(location.state.nextPathname);
            }

            return this.props.router.replace('/admin');
        }));
    }

    render() {
        const { error, loading } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div
                        className="
                            col-xs-10 push-xs-1
                            col-md-6 push-md-3
                        "
                    >
                        <div className="col-xs-12">
                            <TextField
                                id="username"
                                floatingLabelText="Brukernavn"
                                type="text"
                                fullWidth
                                ref={(username) => {
                                    this.username = username;
                                }}
                                errorText={error && 'Brukernavnet kan være feil'}
                            />
                        </div>
                        <div className="col-xs-12">
                            <TextField
                                id="password"
                                floatingLabelText="Passord"
                                type="password"
                                fullWidth
                                ref={(password) => {
                                    this.password = password;
                                }}
                                errorText={error && 'Passordet kan være feil'}
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

Login.propTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default Login;
