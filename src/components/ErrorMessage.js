// @flow

import React, { PureComponent } from 'react';

type Props = {
  error: string,
};

class ErrorMessage extends PureComponent<Props, Props, void> {
  static defaultProps = {
    error: 'Something bad happened',
  };

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          {this.props.error}
        </div>
      </div>
    );
  }
}

export default ErrorMessage;
