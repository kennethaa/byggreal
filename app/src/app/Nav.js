import React, { Component, PropTypes } from 'react';
import {
    BottomNavigation,
    BottomNavigationItem
} from 'material-ui/BottomNavigation';
import Home from 'material-ui/svg-icons/action/home';
import Homes from 'material-ui/svg-icons/action/shopping-cart';
import Lettings from 'material-ui/svg-icons/communication/business';
import Login from 'material-ui/svg-icons/social/person';
import Logout from 'material-ui/svg-icons/social/person-outline';
import withRoter from 'react-router/lib/withRouter';
import auth from '../utils/auth';

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

        let navItems = [
            {
                route: '/',
                name: 'Byggreal',
                icon: Home
            },
            {
                route: '/bolig-til-salgs',
                name: 'Bolig til salgs',
                icon: Homes
            },
            {
                route: '/bolig-til-leie',
                name: 'Bolig til leie',
                icon: Lettings
            }
        ];

        if (loggedIn) {
            navItems = [
                {
                    route: '/admin/bolig-til-salgs',
                    name: 'Bolig til salgs',
                    icon: Homes
                },
                {
                    route: '/admin/bolig-til-leie',
                    name: 'Bolig til leie',
                    icon: Lettings
                }
            ];
        }

        navItems.push({
            route: loggedIn ? '/logout' : '/login',
            name: loggedIn ? 'Logg ut' : 'Logg inn',
            icon: loggedIn ? Logout : Login
        });

        const selectedIndex = navItems.findIndex((navItem, index) =>
            index !== 0 && isActive(navItem.route));

        return (
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
        );
    }
}

Nav.propTypes = {
    router: PropTypes.object.isRequired
};

export default withRoter(Nav);
