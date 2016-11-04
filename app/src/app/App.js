import React, { Component, PropTypes } from 'react';
import './App.css';
import './Grid.css';
import Nav from './Nav';

class App extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className="container-fluid">
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
