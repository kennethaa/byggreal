import React, { Component, PropTypes } from 'react';
import {
    BottomNavigation,
    BottomNavigationItem
} from 'material-ui/BottomNavigation';
import Home from 'material-ui/svg-icons/action/home';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import Business from 'material-ui/svg-icons/communication/business';
import withRoter from 'react-router/lib/withRouter';
import logo from '../images/logo.jpg';

const navItems = [
    {
        route: '/',
        name: 'Byggreal',
        icon: Home
    },
    {
        route: '/bolig-til-salgs',
        name: 'Bolig til salgs',
        icon: ShoppingCart
    },
    {
        route: '/bolig-til-leie',
        name: 'Bolig til leie',
        icon: Business
    }
];

class Nav extends Component {
    onSelect(route) {
        const { router } = this.props;

        router.push(route);
    }

    render() {
        const { router: { isActive } } = this.props;

        const selectedIndex = navItems.findIndex((navItem, index) =>
            index !== 0 && isActive(navItem.route));

        return (
            <div>
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
                <div className="row">
                    <div className="col-xs-12">
                        <BottomNavigation
                            selectedIndex={selectedIndex < 0 ? 0 : selectedIndex}
                        >
                            {navItems.map((navItem) =>
                                <BottomNavigationItem
                                    key={navItem.route}
                                    label={navItem.name}
                                    icon={<navItem.icon />}
                                    onTouchTap={() => this.onSelect(navItem.route)}
                                />
                            )}
                        </BottomNavigation>
                    </div>
                </div>
            </div>
        );
    }
}

Nav.propTypes = {
    router: PropTypes.object.isRequired
};

export default withRoter(Nav);
