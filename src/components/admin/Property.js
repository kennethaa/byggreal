// @flow

import React, { PureComponent } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import type { Property as PropertyType } from '../../utils/types';

type Props = {
  finnCode: string,
  property: PropertyType,
  notFound: boolean,
  onClickSave: (finnCode: string, home: PropertyType) => void,
  onClickDelete: (finnCode: string) => void,
  loading: boolean,
  homeNew: boolean,
  onClickCreateNew: (finnCode: string, home: PropertyType) => void,
  onRequestClose: () => void,
  name: string,
};

class Property extends PureComponent<void, Props, void> {
  order: Object;
  finnCode: Object;

  onClickSave = (event: Event) => {
    event.preventDefault();

    const { finnCode, onClickSave, homeNew, onClickCreateNew } = this.props;

    const property = {
      order: this.order.input.value,
    };

    if (homeNew) {
      const finnCode = this.finnCode.input.value;
      return onClickCreateNew(finnCode, property);
    }

    return onClickSave(finnCode, property);
  };

  onClickDelete = () => {
    const { finnCode, onClickDelete } = this.props;

    if (confirm(`Er du sikker på at du vil slette finnCode ${finnCode}`)) {
      // eslint-disable-line no-alert
      onClickDelete(finnCode);
    }
  };

  render() {
    const {
      finnCode,
      property,
      notFound,
      loading,
      homeNew,
      onRequestClose,
      name,
    } = this.props;
    const paddingLeft = '16px';
    const paddingRight = paddingLeft;

    let title = `Ny ${name}`;

    if (property) {
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
                defaultValue={finnCode}
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
                defaultValue={property && property.order}
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

export default Property;
