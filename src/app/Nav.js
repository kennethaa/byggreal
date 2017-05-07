// @flow

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import muiThemeable from 'material-ui/styles/muiThemeable';
import NavDrawer from './NavDrawer';
import { onAuthStateChanged } from '../utils/auth';
import byggrealDark from '../images/byggreal_dark.png';
import byggrealDarkHD from '../images/byggreal_dark_hd.png';
import type { User } from '../utils/types';

type Props = {
  muiTheme: Object,
  location: Object,
  history: Object,
};

type State = {
  user: User | null,
  open: boolean,
};

class Nav extends PureComponent<void, Props, State> {
  state = {
    user: null,
    open: false,
  };

  removeListener: () => void;

  componentWillMount() {
    this.removeListener = onAuthStateChanged(user => {
      this.setState({
        user,
      });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  _onLeftIconButtonTouchTap = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  _onClickRoute = (event, route) => {
    const { history } = this.props;

    history.push(route);

    this.setState({
      open: false,
    });
  };

  _onTitleTouchTap = () => {
    const { history } = this.props;

    history.push('/');
  };

  render() {
    const { user, open } = this.state;
    const { muiTheme, location } = this.props;

    return (
      <div>
        <AppBar
          title={
            <img
              src={byggrealDark}
              style={{
                width: 229,
                height: 60,
              }}
              srcSet={`${byggrealDark} 1x, ${byggrealDarkHD} 1.5x`}
              className="vertical-align-middle"
              alt="Byggreal"
            />
          }
          zDepth={0}
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          onTitleTouchTap={this._onTitleTouchTap}
          iconElementLeft={
            <IconButton>
              <NavigationMenu />
            </IconButton>
          }
          iconElementRight={
            <IconButton
              iconClassName="mdi mdi-facebook"
              href="https://www.facebook.com/Byggreal-AS-167667106644338"
              target="_blank"
            />
          }
          style={{
            position: 'fixed',
            top: 0,
            zIndex: muiTheme.zIndex.appBar + 1,
          }}
        />
        <NavDrawer
          loggedIn={!!user}
          open={open}
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          location={location}
          onClickRoute={this._onClickRoute}
        />
      </div>
    );
  }
}

export default muiThemeable()(withRouter(Nav));
