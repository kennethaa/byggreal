// @flow

import React, { PureComponent } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import Chip from 'material-ui/Chip';

type Props = {
  style: Object,
  ad: Object,
  warning: string,
  muiTheme: Object,
};

class FinnAd extends PureComponent<void, Props, void> {
  render() {
    const { style, ad, warning, muiTheme } = this.props;
    const finnAd = ad && ad.finnAd;

    if (!finnAd) {
      return null;
    }

    return (
      <a
        href={finnAd.url}
        target="_blank"
        rel="noopener noreferrer"
        className="ad"
      >
        <Card style={style}>
          <CardMedia>
            <img src={finnAd.image.src} alt="Finn.no" />
          </CardMedia>
          <CardTitle
            title={
              <div>
                {(finnAd.sold || finnAd.leased) &&
                  <Chip
                    style={{ marginBottom: muiTheme.spacing.desktopGutterMini }}
                  >
                    {warning}
                  </Chip>}
                {finnAd.title}
              </div>
            }
            subtitle={finnAd.description}
          />
        </Card>
      </a>
    );
  }
}

export default muiThemeable()(FinnAd);
