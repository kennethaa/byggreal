import React, { Component, PropTypes } from 'react';
import './App.css';
import './Grid.css';
import Nav from './Nav';
import logo from '../images/logo.jpg';

class App extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div
                        className="
                            col-xs-12
                            col-sm-6 push-sm-3
                            col-md-6 push-md-3
                            col-lg-4 push-lg-4
                            text-center
                        "
                    >
                        <img
                            className="img-fluid"
                            src={logo}
                            alt="Byggreal Logo"
                        />
                    </div>
                </div>
                <Nav />
                {children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node
};

export default App;
