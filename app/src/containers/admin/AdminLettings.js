import React, { Component, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { getLettings, putLetting, deleteLetting, postLetting } from '../../utils/api';
import AdminFinnAd from '../../components/admin/AdminFinnAd';
import Letting from '../../components/admin/Letting';

class AdminLettings extends Component {
    constructor(props, context) {
        super(props, context);

        this.onClickAd = this.onClickAd.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickCreateNew = this.onClickCreateNew.bind(this);
        this.onClickNew = this.onClickNew.bind(this);

        this.state = {
            loading: true,
            loadingLettingActive: false,
            error: false,
            lettings: undefined
        };
    }

    componentDidMount() {
        this.getLettings();
    }

    onClickAd(ad) {
        const { router } = this.props;

        router.push(`${AdminLettings.path}/${ad._id}`);
    }

    onClickSave(lettingId, letting) {
        this.setState({
            loadingLettingActive: true
        }, () => putLetting(lettingId, letting)
        .then(() =>
            this.getLettings()
        )
        .catch((error) =>
            this.setState({
                loading: false,
                error: (error && error.message) || error
            })
        ));
    }

    onClickDelete(lettingId) {
        deleteLetting(lettingId)
        .then(() =>
            this.getLettings()
            .then(() => {
                const { router } = this.props;

                router.push(AdminLettings.path);
            })
            .catch((error) =>
                this.setState({
                    loading: false,
                    error: (error && error.message) || error
                })
            )
        )
        .catch((error) =>
            this.setState({
                loading: false,
                error: (error && error.message) || error
            })
        );
    }

    onClickCreateNew(letting) {
        this.setState({
            loadingLettingActive: true
        }, () => postLetting(letting)
        .then(() => {
            this.getLettings()
            .then(() => {
                const { router } = this.props;

                router.push(AdminLettings.path);
            })
            .catch((error) =>
                this.setState({
                    loading: false,
                    loadingLettingActive: false,
                    error: (error && error.message) || error
                })
            );
        })
        .catch((error) =>
            this.setState({
                loading: false,
                loadingLettingActive: false,
                error: (error && error.message) || error
            })
        ));
    }

    onClickNew() {
        const { router } = this.props;

        router.push(`${AdminLettings.path}/new`);
    }

    getLettings() {
        return getLettings()
        .then((lettings) =>
            this.setState({
                loading: false,
                loadingLettingActive: false,
                error: false,
                lettings
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
        const { loading, error, lettings, loadingLettingActive } = this.state;
        const { params } = this.props;

        if (loading) {
            return <Loading />;
        }

        if (error || !lettings) {
            return <ErrorMessage error={error} />;
        }

        const lettingActive = lettings.find((letting) => letting._id === params.lettingId);
        const lettingNew = params.lettingId === 'new';

        let lettingsClassName = 'col-xs-12';
        let lettingActiveClassName;

        if (params.lettingId) {
            lettingsClassName = 'col-xs-8';
            lettingActiveClassName = 'col-xs-4';
        }

        return (
            <div className="row">
                <div className={lettingsClassName}>
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
                                    disabled={lettingNew}
                                >
                                    <ContentAdd />
                                </FloatingActionButton>
                            </Subheader>
                            {lettings.map((letting, index) =>
                                <AdminFinnAd
                                    key={index}
                                    ad={letting}
                                    active={letting._id === params.lettingId}
                                    onClickAd={this.onClickAd}
                                />
                            )}
                        </ List>
                    </div>
                </div>
                {params.lettingId && (
                    <div className={lettingActiveClassName}>
                        <Letting
                            key={params.lettingId}
                            letting={lettingActive}
                            lettingNew={lettingNew}
                            onClickCreateNew={this.onClickCreateNew}
                            notFound={!lettingNew && params.lettingId && !lettingActive}
                            onClickSave={this.onClickSave}
                            onClickDelete={this.onClickDelete}
                            loading={loadingLettingActive}
                        />
                    </div>
                )}
            </div>
        );
    }
}

AdminLettings.path = '/admin/bolig-til-leie';

AdminLettings.propTypes = {
    router: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
};

export default AdminLettings;
