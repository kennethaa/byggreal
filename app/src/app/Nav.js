import React, { Component, PropTypes } from 'react';
import {
    BottomNavigation,
    BottomNavigationItem
} from 'material-ui/BottomNavigation';
import Home from 'material-ui/svg-icons/action/home';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import Business from 'material-ui/svg-icons/communication/business';
import Account from 'material-ui/svg-icons/action/account-box';
import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import withRoter from 'react-router/lib/withRouter';
import logo from '../images/logo.jpg';
import auth from '../utils/auth';

const NAV_ITEMS = [
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
    constructor(props, context) {
        super(props, context);

        this.updateAuth = this.updateAuth.bind(this);

        this.state = {
            loggedIn: auth.loggedIn()
        };
    }

    componentWillMount() {
        auth.onChange = this.updateAuth;
    }

    onSelect(route) {
        const { router } = this.props;

        router.push(route);
    }

    updateAuth(loggedIn) {
        this.setState({
            loggedIn: !!loggedIn
        });
    }

    render() {
        const { loggedIn } = this.state;
        const { router: { isActive } } = this.props;

        const navItems = [...NAV_ITEMS];

        if (loggedIn) {
            navItems.push({
                route: '/admin',
                name: 'Admin',
                icon: Account
            });
        }

        navItems.push({
            route: loggedIn ? '/logout' : '/login',
            name: loggedIn ? 'Logg ut' : 'Logg inn',
            icon: loggedIn ? PersonOutline : Person
        });

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
