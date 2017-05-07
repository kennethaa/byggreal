// @flow

import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import {
  getHomes,
  putHome,
  deleteHome,
  postHome
} from '../../utils/database';
import '../../utils/database';
import AdminFinnAd from '../../components/admin/AdminFinnAd';
import Property from '../../components/admin/Property';
import type { Property as PropertyType } from '../../utils/types';

type Props = {
  history: Object,
  match: Object,
};

type State = {
  loading: boolean,
  loadingHomeActive: boolean,
  error?: string,
  homes?: Array<PropertyType>,
  homeNew: boolean,
};

class AdminHomes extends Component<void, Props, State> {
  static path = '/admin/bolig-til-salgs';

  state = {
    loading: true,
    loadingHomeActive: false,
    error: undefined,
    homes: undefined,
    homeNew: false,
  };

  componentDidMount() {
    this.getHomes();
  }

  onClickAd = (ad: Object) => {
    const { history } = this.props;

    history.push(`${AdminHomes.path}/${ad.finnCode}`);
  };

  onClickSave = (finnCode: string, home: PropertyType) => {
    this.setState(
      {
        loadingHomeActive: true,
      },
      () =>
      putHome(finnCode, home)
        .then(() =>
          this.getHomes().then(() => this.props.history.push(AdminHomes.path))
        )
        .catch(error =>
          this.setState({
            loading: false,
            error: (error && error.message) || error,
          })
      )
    );
  };

  onClickDelete = (finnCode: string) => {
    deleteHome(finnCode)
      .then(() =>
        this.getHomes().then(() => this.props.history.push(AdminHomes.path))
      )
      .catch(error =>
        this.setState({
          loading: false,
          error: (error && error.message) || error,
        })
      );
  };

  onClickCreateNew = (finnCode: string, home: PropertyType) => {
    this.setState(
      {
        loadingHomeActive: true,
      },
      () =>
        postHome(finnCode, home)
          .then(() =>
            this.getHomes().then(() => this.setState({ homeNew: false }))
          )
          .catch(error =>
            this.setState({
              loading: false,
              loadingHomeActive: false,
              error: (error && error.message) || error,
            })
          )
    );
  };

  onClickNew = () => {
    this.setState({
      homeNew: true,
    });
  };

  onRequestClose = () => {
    const { match, history } = this.props;
    const { params } = match;

    if (params.finnCode) {
      return history.push(AdminHomes.path);
    }

    return this.setState({
      homeNew: false,
    });
  };

  getHomes = () => {
    return getHomes()
      .then(homes =>
        this.setState({
          loading: false,
          loadingHomeActive: false,
          error: undefined,
          homes,
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
    const { loading, error, homes, loadingHomeActive, homeNew } = this.state;
    const { match } = this.props;
    const { params } = match;

    if (loading) {
      return <Loading />;
    }

    if (error || !homes) {
      return <ErrorMessage error={error} />;
    }

    const homeActive = homes.find(home => home.finnCode === params.finnCode);

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
                {'Bolig til salgs'}
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
                  disabled={homeNew}
                >
                  <ContentAdd />
                </FloatingActionButton>
              </Subheader>
              {homes.map(home => (
                <AdminFinnAd
                  key={home.finnCode}
                  ad={home}
                  active={home.finnCode === params.finnCode}
                  onClickAd={this.onClickAd}
                />
              ))}
            </List>
          </div>
        </div>
        {(params.finnCode || homeNew) &&
          <Property
            key={params.finnCode || 'new'}
            finnCode={params.finnCode}
            property={homeActive && homeActive.property}
            homeNew={homeNew}
            onClickCreateNew={this.onClickCreateNew}
            notFound={!homeNew && params.finnCode && !homeActive}
            onClickSave={this.onClickSave}
            onClickDelete={this.onClickDelete}
            loading={loadingHomeActive}
            onRequestClose={this.onRequestClose}
            name="bolig"
          />}
      </div>
    );
  }
}

export default AdminHomes;
