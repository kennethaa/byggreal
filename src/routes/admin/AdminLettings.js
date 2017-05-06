import React, { Component, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import {
  getLettings,
  putLetting,
  deleteLetting,
  postLetting,
} from '../../utils/database';
import AdminFinnAd from '../../components/admin/AdminFinnAd';
import Home from '../../components/admin/Home';

class AdminLettings extends Component {
  static path = '/admin/bolig-til-leie';

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
      loadingLettingActive: false,
      error: false,
      lettings: undefined,
      lettingNew: false,
    };
  }

  componentDidMount() {
    this.getLettings();
  }

  onClickAd(ad) {
    const { history } = this.props;

    history.push(`${AdminLettings.path}/${ad.finnCode}`);
  }

  onClickSave(finnCode, letting) {
    this.setState(
      {
        loadingLettingActive: true,
      },
      () =>
        putLetting(finnCode, letting)
          .then(() =>
            this.getLettings().then(() =>
              this.props.history.push(AdminLettings.path)
            )
          )
          .catch(error =>
            this.setState({
              loading: false,
              error: (error && error.message) || error,
            })
          )
    );
  }

  onClickDelete(finnCode) {
    deleteLetting(finnCode)
      .then(() =>
        this.getLettings().then(() =>
          this.props.history.push(AdminLettings.path)
        )
      )
      .catch(error =>
        this.setState({
          loading: false,
          error: (error && error.message) || error,
        })
      );
  }

  onClickCreateNew(letting) {
    this.setState(
      {
        loadingLettingActive: true,
      },
      () =>
        postLetting(letting)
          .then(() =>
            this.getLettings().then(() => this.setState({ lettingNew: false }))
          )
          .catch(error =>
            this.setState({
              loading: false,
              loadingLettingActive: false,
              error: (error && error.message) || error,
            })
          )
    );
  }

  onClickNew() {
    this.setState({
      lettingNew: true,
    });
  }

  onRequestClose() {
    const { match, history } = this.props;
    const { params } = match;

    if (params.finnCode) {
      return history.push(AdminLettings.path);
    }

    return this.setState({
      lettingNew: false,
    });
  }

  getLettings() {
    return getLettings()
      .then(lettings =>
        this.setState({
          loading: false,
          loadingLettingActive: false,
          error: false,
          lettings,
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

AdminLettings.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default AdminLettings;
