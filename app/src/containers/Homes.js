import React, { Component } from 'react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import api from '../utils/api';
import FinnAd from '../components/FinnAd';

class Homes extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: true,
            error: false,
            finnAds: undefined
        };
    }

    componentDidMount() {
        api('homes')
        .then((homes) => {
            if (homes.data.success === false) {
                return this.setState({
                    loading: false,
                    error: homes.data.message
                });
            }

            return Promise.all(homes.data.homes.map((home) =>
                api(`finn/${home.finnkode}`)
            ))
            .then((finnAds) =>
                this.setState({
                    loading: false,
                    error: false,
                    finnAds
                })
            )
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

    render() {
        const { loading, error, finnAds } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error || !finnAds) {
            return <ErrorMessage error={error} />;
        }

        if (!finnAds.length) {
            return <ErrorMessage error="Det finnes ingen boliger til salgs for øyeblikket." />;
        }

        return (
            <div className="row">
                {finnAds.map((finnAd, index) =>
                    <div
                        key={index}
                        className="
                            col-xs-12
                            col-lg-4
                        "
                    >
                        <div style={{ padding: '10px', height: 'calc(100% - 10px)' }}>
                            <FinnAd
                                finnAd={finnAd}
                                style={{
                                    height: 'calc(100% - 10px)'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Homes;
