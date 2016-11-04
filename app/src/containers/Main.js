import React, { Component, PropTypes } from 'react';
import Gavel from 'material-ui/svg-icons/action/gavel';
import Paintbrush from 'material-ui/svg-icons/editor/format-paint';
import DashBoard from 'material-ui/svg-icons/action/dashboard';
import info from '../images/info.jpg';

class Main extends Component {
    render() {
        const { muiTheme } = this.context;

        return (
            <div>
                <div
                    className="row"
                >
                    <div
                        className="col-xs-12 text-center"
                    >
                        <img src={info} alt="Byggreal" className="img-fluid" />
                    </div>
                </div>
                <div
                    className="row flex-items-xs-middle"
                    style={{
                        background: muiTheme.bottomNavigation.backgroundColor,
                        color: muiTheme.bottomNavigation.unselectedColor,
                        padding: muiTheme.spacing.desktopGutter
                    }}
                >
                    <div className="col-xs-6 text-center">
                        <Gavel style={{ color: muiTheme.bottomNavigation.unselectedColor, width: '50px', height: '50px' }} />
                    </div>
                    <div className="col-xs-6 text-center">
                        <h2>Snekkeroppdrag</h2>
                    </div>
                </div>
                <div
                    className="row flex-items-xs-middle"
                    style={{
                        padding: muiTheme.spacing.desktopGutter
                    }}
                >
                    <div className="col-xs-6 text-center">
                        <Paintbrush style={{ width: '50px', height: '50px' }} />
                    </div>
                    <div className="col-xs-6 text-center">
                        <h2>Maleroppdrag</h2>
                    </div>
                </div>
                <div
                    className="row flex-items-xs-middle"
                    style={{
                        background: muiTheme.bottomNavigation.backgroundColor,
                        color: muiTheme.bottomNavigation.unselectedColor,
                        padding: muiTheme.spacing.desktopGutter
                    }}
                >
                    <div className="col-xs-6 text-center">
                        <DashBoard style={{ color: muiTheme.bottomNavigation.unselectedColor, width: '50px', height: '50px' }} />
                    </div>
                    <div className="col-xs-6 text-center">
                        <h2>Mureroppdrag</h2>
                    </div>
                </div>
            </div>
        );
    }
}

Main.contextTypes = {
    muiTheme: PropTypes.object.isRequired
};

export default Main;
