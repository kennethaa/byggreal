import React, { PureComponent, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class Loading extends PureComponent {
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

Loading.defaultProps = {
    size: 80
};

Loading.propTypes = {
    size: PropTypes.number.isRequired
};

export default Loading;
