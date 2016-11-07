import React, { Component } from 'react';
import auth from '../utils/auth';

class Admin extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loggedIn: auth.loggedIn()
        };
    }

    render() {
        const { loggedIn } = this.state;

        return (
            <div className="row">
                <div className="col-xs-12">
                    {`Logged in: ${loggedIn}`}
                </div>
            </div>
        );
    }
}

export default Admin;
