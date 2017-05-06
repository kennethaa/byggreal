// @flow

import React, { PureComponent } from 'react';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';

type Props = {
  title: string,
  backgroundColor?: string,
  iconClassName?: string,
  image?: string,
};

type State = {
  zDepth: number,
};

class Feature extends PureComponent<void, Props, State> {
  state = {
    zDepth: 0,
  };

  _handleMouseEnter = () => {
    this.setState({
      zDepth: 4,
    });
  };

  _handleMouseLeave = () => {
    this.setState({
      zDepth: 0,
    });
  };

  render() {
    const { zDepth } = this.state;
    const { title, iconClassName, backgroundColor, image } = this.props;

    return (
      <div className="col-xs-12 col-md-4 text-center">
        <Paper
          zDepth={zDepth}
          onMouseEnter={this._handleMouseEnter}
          onMouseLeave={this._handleMouseLeave}
          style={{
            margin: 20,
            backgroundColor,
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
              margin: 0,
            }}
          >
            {title}
          </h3>
          {iconClassName &&
            <span
              className={iconClassName}
              style={{
                fontSize: 100,
              }}
            />}
          {image && <img className="img-fluid" src={image} alt="Feature" />}
        </Paper>
      </div>
    );
  }
}

export default Feature;
