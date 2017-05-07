// @flow

import React, { Component } from 'react';
import type { Children } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import 'mdi/css/materialdesignicons.css';
import './App.css';
import './Grid.css';
import Nav from './Nav';
import Footer from './Footer';

type Props = {
  children?: Children,
  muiTheme: Object,
};

class App extends Component<void, Props, void> {
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

export default muiThemeable()(App);
