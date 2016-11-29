import React, { PureComponent, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';

class Feature extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this._handleMouseEnter = this._handleMouseEnter.bind(this);
        this._handleMouseLeave = this._handleMouseLeave.bind(this);

        this.state = {
            zDepth: 0
        };
    }

    _handleMouseEnter() {
        this.setState({
            zDepth: 4
        });
    }

    _handleMouseLeave() {
        this.setState({
            zDepth: 0
        });
    }

    render() {
        const { zDepth } = this.state;
        const {
            title,
            iconClassName,
            backgroundColor
        } = this.props;

        return (
            <div className="col-xs-12 col-md-4 text-center">
                <Paper
                    zDepth={zDepth}
                    onMouseEnter={this._handleMouseEnter}
                    onMouseLeave={this._handleMouseLeave}
                    style={{
                        margin: 20,
                        backgroundColor
                    }}
                >
                    <h3
                        style={{
                            backgroundColor: grey200,
                            fontWeight: typography.fontWeightMedium,
                            color: typography.textDarkBlack,
                            fontSize: 20,
                            paddingTop: 20,
                            paddingBottom: 20,
                        }}
                    >
                        {title}
                    </h3>
                    <span
                        className={iconClassName}
                        style={{
                            fontSize: 100
                        }}
                    />
                </Paper>
            </div>
        );
    }
}

Feature.propTypes = {
    title: PropTypes.string.isRequired,
    iconClassName: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
};

export default Feature;
