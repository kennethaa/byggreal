import React, { PureComponent, PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/navigation/chevron-right';
import { fade } from 'material-ui/utils/colorManipulator';

class AdminFinnAd extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.onTouchTap = this.onTouchTap.bind(this);
    }

    onTouchTap() {
        const { onClickAd, ad } = this.props;

        onClickAd(ad);
    }

    render() {
        const { muiTheme } = this.context;
        const { active } = this.props;
        const finnAd = this.props.ad && this.props.ad.finnAd;

        if (!finnAd) {
            return null;
        }

        let style;

        if (active) {
            style = {
                backgroundColor: fade(muiTheme.baseTheme.palette.textColor, 0.2)
            };
        }

        return (
            <ListItem
                primaryText={finnAd.title}
                leftAvatar={
                    <Avatar
                        src={finnAd.image && finnAd.image.src}
                    />
                }
                rightIcon={<CommunicationChatBubble />}
                onTouchTap={this.onTouchTap}
                style={style}
            />
        );
    }
}

AdminFinnAd.contextTypes = {
    muiTheme: PropTypes.object.isRequired
};

AdminFinnAd.propTypes = {
    ad: PropTypes.object.isRequired,
    onClickAd: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
};

export default AdminFinnAd;
