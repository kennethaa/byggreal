// @flow

import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import {
  getLettings,
  // putLetting,
  // deleteLetting,
  // postLetting,
} from '../../utils/database';
import AdminFinnAd from '../../components/admin/AdminFinnAd';
import Home from '../../components/admin/Home';

type Props = {
  history: Object,
  match: Object,
};

type State = {
  loading: boolean,
  loadingLettingActive: boolean,
  error?: string,
  lettings?: Array<Object>,
  lettingNew: boolean,
};

class AdminLettings extends Component<void, Props, State> {
  static path = '/admin/bolig-til-leie';

  state = {
    loading: true,
    loadingLettingActive: false,
    error: undefined,
    lettings: undefined,
    lettingNew: false,
  };

  componentDidMount() {
    this.getLettings();
  }

  onClickAd = (ad: Object) => {
    const { history } = this.props;

    history.push(`${AdminLettings.path}/${ad.finnCode}`);
  };

  onClickSave = (finnCode: string, letting: Object) => {
    this.setState(
      {
        loadingLettingActive: true,
      }
      // () =>
      //   putLetting(finnCode, letting)
      //     .then(() =>
      //       this.getLettings().then(() =>
      //         this.props.history.push(AdminLettings.path)
      //       )
      //     )
      //     .catch(error =>
      //       this.setState({
      //         loading: false,
      //         error: (error && error.message) || error,
      //       })
      //     )
    );
  };

  onClickDelete = (finnCode: string) => {
    // deleteLetting(finnCode)
    //   .then(() =>
    //     this.getLettings().then(() =>
    //       this.props.history.push(AdminLettings.path)
    //     )
    //   )
    //   .catch(error =>
    //     this.setState({
    //       loading: false,
    //       error: (error && error.message) || error,
    //     })
    //   );
  };

  onClickCreateNew = (letting: Object) => {
    this.setState(
      {
        loadingLettingActive: true,
      }
      // () =>
      //   postLetting(letting)
      //     .then(() =>
      //       this.getLettings().then(() => this.setState({ lettingNew: false }))
      //     )
      //     .catch(error =>
      //       this.setState({
      //         loading: false,
      //         loadingLettingActive: false,
      //         error: (error && error.message) || error,
      //       })
      //     )
    );
  };

  onClickNew = () => {
    this.setState({
      lettingNew: true,
    });
  };

  onRequestClose = () => {
    const { match, history } = this.props;
    const { params } = match;

    if (params.finnCode) {
      return history.push(AdminLettings.path);
    }

    return this.setState({
      lettingNew: false,
    });
  };

  getLettings = () => {
    return getLettings()
      .then(lettings =>
        this.setState({
          loading: false,
          loadingLettingActive: false,
          error: undefined,
          lettings,
        })
      )
      .catch(error =>
        this.setState({
          loading: false,
          error: (error && error.message) || error,
        })
      );
  };

  render() {
    const {
      loading,
      error,
      lettings,
      loadingLettingActive,
      lettingNew,
    } = this.state;
    const { match } = this.props;
    const { params } = match;

    if (loading) {
      return <Loading />;
    }

    if (error || !lettings) {
      return <ErrorMessage error={error} />;
    }

    const lettingActive = lettings.find(
      letting => letting.finnCode === params.finnCode
    );

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <List
              style={{
                width: '100%',
              }}
            >
              <Subheader>
                {'Bolig til leie'}
                <FloatingActionButton
                  mini
                  style={{
                    float: 'right',
                    paddingRight: '8px',
                    boxShadow: null,
                  }}
                  iconStyle={{ verticalAlign: 'middle' }}
                  title="Ny bolig"
                  onTouchTap={this.onClickNew}
                  disabled={lettingNew}
                >
                  <ContentAdd />
                </FloatingActionButton>
              </Subheader>
              {lettings.map(letting => (
                <AdminFinnAd
                  key={letting.finnCode}
                  ad={letting}
                  active={letting.finnCode === params.finnCode}
                  onClickAd={this.onClickAd}
                />
              ))}
            </List>
          </div>
        </div>
        {(params.finnCode || lettingNew) &&
          <Home
            key={params.finnCode || 'new'}
            home={lettingActive}
            homeNew={lettingNew}
            onClickCreateNew={this.onClickCreateNew}
            notFound={!lettingNew && params.finnCode && !lettingActive}
            onClickSave={this.onClickSave}
            onClickDelete={this.onClickDelete}
            loading={loadingLettingActive}
            onRequestClose={this.onRequestClose}
            name="utleiebolig"
          />}
      </div>
    );
  }
}

export default AdminLettings;
