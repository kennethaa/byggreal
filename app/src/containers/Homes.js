import React, { Component } from 'react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getHomes } from '../utils/api';
import FinnAd from '../components/FinnAd';

class Homes extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: true,
            error: false,
            homes: undefined
        };
    }

    componentDidMount() {
        getHomes()
        .then((homes) =>
            this.setState({
                loading: false,
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
        const { loading, error, homes } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error || !homes) {
            return <ErrorMessage error={error} />;
        }

        if (!homes.length) {
            return <ErrorMessage error="Det finnes ingen boliger til salgs for øyeblikket." />;
        }

        return (
            <div className="row">
                {homes.map((home, index) =>
                    <div
                        key={index}
                        className="
                            col-xs-12
                            col-lg-4
                        "
                    >
                        <div style={{ padding: '10px', height: 'calc(100% - 10px)' }}>
                            <FinnAd
                                ad={home}
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
