// @flow

import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble
  from 'material-ui/svg-icons/navigation/chevron-right';
import { fade } from 'material-ui/utils/colorManipulator';
import muiThemeable from 'material-ui/styles/muiThemeable';

type Props = {
  ad: Object,
  onClickAd: (ad: Object) => void,
  active: boolean,
  muiTheme: Object,
};

class AdminFinnAd extends PureComponent<void, Props, void> {
  onTouchTap = () => {
    const { onClickAd, ad } = this.props;

    onClickAd(ad);
  };

  render() {
    const { active, muiTheme } = this.props;
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

export default muiThemeable()(AdminFinnAd);
