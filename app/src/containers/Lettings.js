import React, { Component } from 'react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getLettings } from '../utils/api';
import FinnAd from '../components/FinnAd';

class Lettings extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: true,
            error: false,
            lettings: undefined
        };
    }

    componentDidMount() {
        getLettings()
        .then((lettings) =>
            this.setState({
                loading: false,
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
        const { loading, error, lettings } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error || !lettings) {
            return <ErrorMessage error={error} />;
        }

        if (!lettings.length) {
            return <ErrorMessage error="Det finnes ingen boliger til leie for øyeblikket." />;
        }

        return (
            <div className="row">
                {lettings.map((letting, index) => {
                    if (!letting || !letting.finnAd || letting.finnAd.success === false) {
                        return null;
                    }

                    return (
                        <div
                            key={index}
                            className="
                                col-xs-12
                                col-lg-4
                            "
                        >
                            <div style={{ padding: '10px', height: 'calc(100% - 10px)' }}>
                                <FinnAd
                                    ad={letting}
                                    style={{
                                        height: 'calc(100% - 10px)'
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Lettings;
