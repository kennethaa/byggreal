import React, { PureComponent, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from '../Loading';

class Letting extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.onClickSave = this.onClickSave.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    onClickSave(event) {
        event.preventDefault();

        const { letting, onClickSave, lettingNew, onClickCreateNew } = this.props;
        const order = this.order.input.value;

        if (lettingNew) {
            const finnkode = this.finnkode.input.value;
            return onClickCreateNew({
                finnkode,
                order
            });
        }

        return onClickSave(letting._id, {
            order
        });
    }

    onClickDelete() {
        const { letting, onClickDelete } = this.props;

        if (confirm(`Er du sikker på at du vil slette finnkode ${letting.finnkode}`)) { // eslint-disable-line no-alert
            onClickDelete(letting._id);
        }
    }

    render() {
        const { letting, notFound, loading, lettingNew } = this.props;
        const paddingLeft = '16px';
        const paddingRight = paddingLeft;

        let title = 'Ny utleiebolig';

        if (letting) {
            title = 'Rediger utleiebolig';
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
                                value={letting && letting.finnkode}
                                type="number"
                                required
                                min={1}
                                ref={(finnkode) => {
                                    this.finnkode = finnkode;
                                }}
                                disabled={!lettingNew}
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
                                defaultValue={letting && letting.order}
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

Letting.propTypes = {
    letting: PropTypes.object,
    notFound: PropTypes.bool,
    onClickSave: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    lettingNew: PropTypes.bool.isRequired,
    onClickCreateNew: PropTypes.func.isRequired
};

export default Letting;
