import React, { Component, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { getHomes, putHome, deleteHome, postHome } from '../../utils/api';
import AdminFinnAd from '../../components/admin/AdminFinnAd';
import Home from '../../components/admin/Home';

class AdminHomes extends Component {
  static path = '/admin/bolig-til-salgs';

  constructor(props, context) {
    super(props, context);

    this.onClickAd = this.onClickAd.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickCreateNew = this.onClickCreateNew.bind(this);
    this.onClickNew = this.onClickNew.bind(this);
    this.onRequestClose = this.onRequestClose.bind(this);

    this.state = {
      loading: true,
      loadingHomeActive: false,
      error: false,
      homes: undefined,
      homeNew: false,
    };
  }

  componentDidMount() {
    this.getHomes();
  }

  onClickAd(ad) {
    const { history } = this.props;

    history.push(`${AdminHomes.path}/${ad._id}`);
  }

  onClickSave(homeId, home) {
    this.setState(
      {
        loadingHomeActive: true,
      },
      () =>
        putHome(homeId, home)
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
  }

  onClickDelete(homeId) {
    deleteHome(homeId)
      .then(() =>
        this.getHomes().then(() => this.props.history.push(AdminHomes.path))
      )
      .catch(error =>
        this.setState({
          loading: false,
          error: (error && error.message) || error,
        })
      );
  }

  onClickCreateNew(home) {
    this.setState(
      {
        loadingHomeActive: true,
      },
      () =>
        postHome(home)
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
  }

  onClickNew() {
    this.setState({
      homeNew: true,
    });
  }

  onRequestClose() {
    const { match, history } = this.props;
    const { params } = match;

    if (params.homeId) {
      return history.push(AdminHomes.path);
    }

    return this.setState({
      homeNew: false,
    });
  }

  getHomes() {
    return getHomes()
      .then(homes =>
        this.setState({
          loading: false,
          loadingHomeActive: false,
          error: false,
          homes,
        })
      )
      .catch(error =>
        this.setState({
          loading: false,
          error: (error && error.message) || error,
        })
      );
  }

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

    const homeActive = homes.find(home => home._id === params.homeId);

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
              {homes.map((home, index) => (
                <AdminFinnAd
                  key={index}
                  ad={home}
                  active={home._id === params.homeId}
                  onClickAd={this.onClickAd}
                />
              ))}
            </List>
          </div>
        </div>
        {(params.homeId || homeNew) &&
          <Home
            key={params.homeId || 'new'}
            home={homeActive}
            homeNew={homeNew}
            onClickCreateNew={this.onClickCreateNew}
            notFound={!homeNew && params.homeId && !homeActive}
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

AdminHomes.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default AdminHomes;
