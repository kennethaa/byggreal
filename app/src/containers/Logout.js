// @flow

import React, { Component } from 'react';
import Loading from '../components/Loading';
import { logout } from '../utils/auth';

type Props = {
    history: Object,
};

class Logout extends Component<void, Props, void> {
    static path = '/logout';

    componentDidMount() {
        const { history } = this.props;

        logout()
        .then(() => history.replace('/'))
        .catch((error) => {
            console.error('Logout::error', error);
            history.replace('/');
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <Loading />
                </div>
            </div>
        );
    }
}

export default Logout;
