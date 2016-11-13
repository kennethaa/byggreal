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
    constructor(props, context) {
        super(props, context);

        this.onClickAd = this.onClickAd.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickCreateNew = this.onClickCreateNew.bind(this);
        this.onClickNew = this.onClickNew.bind(this);

        this.state = {
            loading: true,
            loadingHomeActive: false,
            error: false,
            homes: undefined
        };
    }

    componentDidMount() {
        this.getHomes();
    }

    onClickAd(ad) {
        const { router } = this.props;

        router.push(`${AdminHomes.path}/${ad._id}`);
    }

    onClickSave(homeId, home) {
        this.setState({
            loadingHomeActive: true
        }, () => putHome(homeId, home)
        .then(() =>
            this.getHomes()
        )
        .catch((error) =>
            this.setState({
                loading: false,
                error: (error && error.message) || error
            })
        ));
    }

    onClickDelete(homeId) {
        deleteHome(homeId)
        .then(() => {
            this.getHomes()
            .then(() => {
                const { router } = this.props;

                router.push(AdminHomes.path);
            })
            .catch((error) =>
                this.setState({
                    loading: false,
                    error: (error && error.message) || error
                })
            );
        })
        .catch((error) =>
            this.setState({
                loading: false,
                error: (error && error.message) || error
            })
        );
    }

    onClickCreateNew(home) {
        this.setState({
            loadingHomeActive: true
        }, () => postHome(home)
        .then(() =>
            this.getHomes()
            .then(() => {
                const { router } = this.props;

                router.push(AdminHomes.path);
            })
            .catch((error) =>
                this.setState({
                    loading: false,
                    loadingHomeActive: false,
                    error: (error && error.message) || error
                })
            )
        )
        .catch((error) =>
            this.setState({
                loading: false,
                loadingHomeActive: false,
                error: (error && error.message) || error
            })
        ));
    }

    onClickNew() {
        const { router } = this.props;

        router.push(`${AdminHomes.path}/new`);
    }

    getHomes() {
        return getHomes()
        .then((homes) =>
            this.setState({
                loading: false,
                loadingHomeActive: false,
                error: false,
                homes
            })
        )
        .catch((error) =>
            this.setState({
                loading: false,
                error: (error && error.message) || error
            })
        );
    }

    render() {
        const { loading, error, homes, loadingHomeActive } = this.state;
        const { params } = this.props;

        if (loading) {
            return <Loading />;
        }

        if (error || !homes) {
            return <ErrorMessage error={error} />;
        }

        if (!homes.length) {
            return <ErrorMessage error="Det finnes ingen boliger til salgs for øyeblikket." />;
        }

        const homeActive = homes.find((home) => home._id === params.homeId);
        const homeNew = params.homeId === 'new';

        let homesClassName = 'col-xs-12';
        let homeActiveClassName;

        if (params.homeId) {
            homesClassName = 'col-xs-8';
            homeActiveClassName = 'col-xs-4';
        }

        return (
            <div className="row">
                <div className={homesClassName}>
                    <div className="row">
                        <List
                            style={{
                                width: '100%'
                            }}
                        >
                            <Subheader>
                                {'Bolig til salgs'}
                                <FloatingActionButton
                                    mini
                                    style={{ float: 'right', paddingRight: '8px', boxShadow: null }}
                                    iconStyle={{ verticalAlign: 'middle' }}
                                    title="Ny bolig"
                                    onTouchTap={this.onClickNew}
                                    disabled={homeNew}
                                >
                                    <ContentAdd />
                                </FloatingActionButton>
                            </Subheader>
                            {homes.map((home, index) =>
                                <AdminFinnAd
                                    key={index}
                                    ad={home}
                                    active={home._id === params.homeId}
                                    onClickAd={this.onClickAd}
                                />
                            )}
                        </ List>
                    </div>
                </div>
                {params.homeId && (
                    <div className={homeActiveClassName}>
                        <Home
                            key={params.homeId}
                            home={homeActive}
                            homeNew={homeNew}
                            onClickCreateNew={this.onClickCreateNew}
                            notFound={!homeNew && params.homeId && !homeActive}
                            onClickSave={this.onClickSave}
                            onClickDelete={this.onClickDelete}
                            loading={loadingHomeActive}
                        />
                    </div>
                )}
            </div>
        );
    }
}

AdminHomes.path = '/admin/bolig-til-salgs';

AdminHomes.propTypes = {
    router: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
};

export default AdminHomes;
