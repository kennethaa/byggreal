import React, { Component, PropTypes } from 'react';
import logo from './logo.svg';
import './App.css';
import './Grid.css';

class App extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="app-header">
                            <div className="text-center">
                                <img src={logo} className="app-logo" alt="logo" />
                            </div>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node
};

export default App;
