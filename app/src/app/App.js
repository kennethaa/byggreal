import React, { Component, PropTypes } from 'react';
import spacing from 'material-ui/styles/spacing';
import 'mdi/css/materialdesignicons.css';
import './App.css';
import './Grid.css';
import Nav from './Nav';
import Footer from './Footer';

class App extends Component {
    render() {
        const { children } = this.props;

        return (
            <div
                className="container-fluid"
                style={{
                    display: 'flex',
                    minHeight: '100vh',
                    flexDirection: 'column'
                }}
            >
                <Nav />
                <div
                    style={{
                        flex: 1,
                        paddingTop: spacing.desktopKeylineIncrement
                    }}
                >
                    {children}
                </div>
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node,
};

export default App;
