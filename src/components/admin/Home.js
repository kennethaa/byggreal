// @flow

import React, { PureComponent } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

type Props = {
  home: Object,
  notFound: boolean,
  onClickSave: () => void,
  onClickDelete: () => void,
  loading: boolean,
  homeNew: boolean,
  onClickCreateNew: () => void,
  onRequestClose: () => void,
  name: string,
};

class Home extends PureComponent<void, Props, void> {
  order: Object;
  finnCode: Object;

  onClickSave = (event: Event) => {
    event.preventDefault();

    const { home, onClickSave, homeNew, onClickCreateNew } = this.props;
    const order = this.order.input.value;

    if (homeNew) {
      const finnCode = this.finnCode.input.value;
      return onClickCreateNew({
        finnCode,
        order,
      });
    }

    return onClickSave(home._id, {
      order,
    });
  };

  onClickDelete = () => {
    const { home, onClickDelete } = this.props;

    if (confirm(`Er du sikker på at du vil slette finnCode ${home.finnCode}`)) {
      // eslint-disable-line no-alert
      onClickDelete(home._id);
    }
  };

  render() {
    const {
      home,
      notFound,
      loading,
      homeNew,
      onRequestClose,
      name,
    } = this.props;
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
          />,
        ]}
      >
        <div className="row">
          <div className="col-xs-12">
            <div
              style={{
                paddingLeft,
                paddingRight,
              }}
            >
              <TextField
                fullWidth
                floatingLabelText="Finnkode"
                defaultValue={home && home.finnCode}
                type="number"
                required
                min={1}
                ref={finnCode => {
                  this.finnCode = finnCode;
                }}
                disabled={!homeNew}
              />
            </div>
          </div>
          <div className="col-xs-12">
            <div
              style={{
                paddingLeft,
                paddingRight,
              }}
            >
              <TextField
                fullWidth
                floatingLabelText="Rekkefølge"
                defaultValue={home && home.order}
                type="number"
                min={1}
                ref={order => {
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

export default Home;
