import React, { PureComponent, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Home extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.onClickSave = this.onClickSave.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    onClickSave(event) {
        event.preventDefault();

        const { home, onClickSave, homeNew, onClickCreateNew } = this.props;
        const order = this.order.input.value;

        if (homeNew) {
            const finnkode = this.finnkode.input.value;
            return onClickCreateNew({
                finnkode,
                order
            });
        }

        return onClickSave(home._id, {
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
        const { home, notFound, loading, homeNew, onRequestClose, name } = this.props;
        const paddingLeft = '16px';
        const paddingRight = paddingLeft;

        let title = `Ny ${name}`;

        if (home) {
            title = `Rediger ${name}`;
        } else if (notFound) {
            title = 'Ikke funnet';
        }

        return (
            <Dialog
                title={title}
                modal={false}
                open
                onRequestClose={onRequestClose}
                actions={[
                    <FlatButton
                        label="Slett"
                        secondary
                        onTouchTap={this.onClickDelete}
                        disabled={loading || homeNew}
                    />,
                    <FlatButton
                        label="Lagre"
                        primary
                        onTouchTap={this.onClickSave}
                        disabled={loading}
                        keyboardFocused
                    />
                ]}
            >
                <div className="row">
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
                                defaultValue={home && home.finnkode}
                                type="number"
                                required
                                min={1}
                                ref={(finnkode) => {
                                    this.finnkode = finnkode;
                                }}
                                disabled={!homeNew}
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
                </div>
            </Dialog>
        );
    }
}

Home.propTypes = {
    home: PropTypes.object,
    notFound: PropTypes.bool,
    onClickSave: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    homeNew: PropTypes.bool.isRequired,
    onClickCreateNew: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default Home;
