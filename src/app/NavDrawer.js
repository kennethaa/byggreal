// @flow

import React, { PureComponent } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Home from 'material-ui/svg-icons/action/home';
import Homes from 'material-ui/svg-icons/action/shopping-cart';
import Lettings from 'material-ui/svg-icons/communication/business';
import Login from 'material-ui/svg-icons/social/person';
import Logout from 'material-ui/svg-icons/social/person-outline';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const SelectableList = makeSelectable(List);

type Props = {
  loggedIn: boolean,
  open: boolean,
  onLeftIconButtonTouchTap: () => void,
  location: Object,
  onClickRoute: (event: Event, route: string) => void,
};

class NavDrawer extends PureComponent<void, Props, void> {
  render() {
    const {
      loggedIn,
      open,
      onLeftIconButtonTouchTap,
      location,
      onClickRoute,
    } = this.props;

    const navItems = [
      {
        route: '/',
        name: 'Hjem',
        icon: Home,
      },
      {
        route: '/bolig-til-salgs',
        name: 'Bolig til salgs',
        icon: Homes,
      },
      {
        route: '/bolig-til-leie',
        name: 'Bolig til leie',
        icon: Lettings,
      },
    ];

    const navItemsAdmin = [
      {
        route: loggedIn ? '/logout' : '/login',
        name: loggedIn ? 'Logg ut' : 'Logg inn',
        icon: loggedIn ? Logout : Login,
      },
    ];

    if (loggedIn) {
      navItemsAdmin.push({
        route: '/admin/bolig-til-salgs',
        name: 'Bolig til salgs',
        icon: Homes,
      });

      navItemsAdmin.push({
        route: '/admin/bolig-til-leie',
        name: 'Bolig til leie',
        icon: Lettings,
      });
    }

    return (
      <Drawer open={open} docked={false}>
        <AppBar
          zDepth={0}
          onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
          iconElementLeft={
            <IconButton>
              <NavigationClose />
            </IconButton>
          }
        />
        <SelectableList
          value={location.pathname}
          onChange={onClickRoute}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {navItems.map(navItem => (
            <ListItem
              key={navItem.route}
              primaryText={navItem.name}
              leftIcon={<navItem.icon />}
              value={navItem.route}
            />
          ))}
        </SelectableList>
        <Divider />
        <Subheader>
          {'Admin'}
        </Subheader>
        <SelectableList
          value={location.pathname}
          onChange={onClickRoute}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {navItemsAdmin.map(navItem => (
            <ListItem
              key={navItem.route}
              primaryText={navItem.name}
              leftIcon={<navItem.icon />}
              value={navItem.route}
            />
          ))}
        </SelectableList>
      </Drawer>
    );
  }
}

export default NavDrawer;
