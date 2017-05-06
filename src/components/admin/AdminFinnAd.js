// @flow

import React, { PureComponent, PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble
  from 'material-ui/svg-icons/navigation/chevron-right';
import { fade } from 'material-ui/utils/colorManipulator';

type Props = {
  ad: Object,
  onClickAd: () => void,
  active: boolean,
};

class AdminFinnAd extends PureComponent<void, Props, void> {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  onTouchTap = () => {
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
        backgroundColor: fade(muiTheme.baseTheme.palette.textColor, 0.2),
      };
    }

    return (
      <ListItem
        primaryText={finnAd.title}
        leftAvatar={<Avatar src={finnAd.image && finnAd.image.src} />}
        rightIcon={<CommunicationChatBubble />}
        onTouchTap={this.onTouchTap}
        style={style}
      />
    );
  }
}

export default AdminFinnAd;
