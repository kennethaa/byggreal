import React, { Component, PropTypes } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import 'mdi/css/materialdesignicons.css';
import './App.css';
import './Grid.css';
import Nav from './Nav';
import Footer from './Footer';

class App extends Component {
  render() {
    const { children, muiTheme } = this.props;

    return (
      <div
        className="container-fluid"
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <Nav />
        <div
          style={{
            flex: 1,
            paddingTop: muiTheme.appBar.height,
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
  muiTheme: PropTypes.object.isRequired,
};

export default muiThemeable()(App);
