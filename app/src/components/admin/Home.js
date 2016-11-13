import React, { PureComponent, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from '../Loading';

class Home extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.onClickSave = this.onClickSave.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    onClickSave(event) {
        event.preventDefault();

        const { home, onClickSave } = this.props;
        const order = this.order.input.value;

        onClickSave(home._id, {
            order
        });
    }

    onClickDelete() {
        const { home, onClickDelete } = this.props;

        if (confirm(`Er du sikker på at du vil slette finnkode ${home.finnkode}`)) { // eslint-disable-line no-alert
            onClickDelete(home._id);
        }
    }

    render() {
        const { home, notFound, loading } = this.props;
        const paddingLeft = '16px';
        const paddingRight = paddingLeft;

        let title = 'Ny bolig';

        if (home) {
            title = 'Rediger bolig';
        } else if (notFound) {
            title = 'Ikke funnet';
        }

        return (
            <form onSubmit={this.onClickSave}>
                <div className="row">
                    <div className="col-xs-12">
                        <Subheader>
                            {title}
                        </Subheader>
                    </div>
                    <div className="col-xs-12">
                        <div
                            style={{
                                paddingLeft,
                                paddingRight
                            }}
                        >
                            <TextField
                                fullWidth
                                floatingLabelText="Finnkode"
                                value={home && home.finnkode}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div
                            style={{
                                paddingLeft,
                                paddingRight
                            }}
                        >
                            <TextField
                                fullWidth
                                floatingLabelText="Rekkefølge"
                                defaultValue={home && home.order}
                                type="number"
                                min={1}
                                ref={(order) => {
                                    this.order = order;
                                }}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div
                            style={{
                                paddingLeft,
                                paddingRight
                            }}
                        >
                            <div className="row">
                                <div className="col-xs-6">
                                    <div style={{ paddingRight: '8px' }}>
                                        <RaisedButton
                                            fullWidth
                                            label="Lagre"
                                            primary
                                            onTouchTap={this.onClickSave}
                                            disabled={loading}
                                            type="submit"
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-6">
                                    <div style={{ paddingLeft: '8px' }}>
                                        <RaisedButton
                                            fullWidth
                                            label="Slett"
                                            secondary
                                            onTouchTap={this.onClickDelete}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loading && (
                        <div className="col-xs-12">
                            <Loading />
                        </div>
                    )}
                </div>
            </form>
        );
    }
}

Home.propTypes = {
    home: PropTypes.object,
    notFound: PropTypes.bool,
    onClickSave: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Home;
