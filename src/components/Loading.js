// @flow

import React, { PureComponent } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

type Props = {
  size: number,
};

class Loading extends PureComponent<Props, Props, void> {
  static defaultProps = {
    size: 80,
  };

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          <CircularProgress size={this.props.size} style={{ margin: '20px' }} />
        </div>
      </div>
    );
  }
}

export default Loading;
