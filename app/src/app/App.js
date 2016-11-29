import React, { Component, PropTypes } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import spacing from 'material-ui/styles/spacing';
import 'mdi/css/materialdesignicons.css';
import './App.css';
import './Grid.css';
import Nav from './Nav';
import Footer from './Footer';

class App extends Component {
    render() {
        const { children, muiTheme: { prepareStyles } } = this.props;

        return (
            <div className="container-fluid">
                <Nav />
                <div
                    style={prepareStyles({
                        paddingTop: spacing.desktopKeylineIncrement,
                        minHeight: 500
                    })}
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
    muiTheme: PropTypes.object.isRequired
};

export default muiThemeable()(App);
