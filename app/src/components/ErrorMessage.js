import React, { PureComponent, PropTypes } from 'react';

class ErrorMessage extends PureComponent {
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

ErrorMessage.defaultProps = {
    error: 'Something bad happened'
};

ErrorMessage.propTypes = {
    error: PropTypes.string
};

export default ErrorMessage;
