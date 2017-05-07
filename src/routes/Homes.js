// @flow

import React, { Component } from 'react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getHomes } from '../utils/database';
import FinnAd from '../components/FinnAd';
import type { Property } from '../utils/types';

type State = {
  loading: boolean,
  error?: string,
  homes?: Array<Property>,
};

class Homes extends Component<void, {}, State> {
  static path = '/bolig-til-salgs';

  state = {
    loading: true,
    error: undefined,
    homes: undefined,
  };

  componentDidMount() {
    getHomes()
      .then(homes =>
        this.setState({
          loading: false,
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
  }

  render() {
    const { loading, error, homes } = this.state;

    if (loading) {
      return <Loading />;
    }

    console.log(homes);

    if (error || !homes) {
      return <ErrorMessage error={error} />;
    }

    if (!homes.length) {
      return (
        <ErrorMessage error="Det finnes ingen boliger til salgs for øyeblikket." />
      );
    }

    return (
      <div className="row">
        {homes.map((home, index) => {
          if (!home || !home.finnAd || home.finnAd.success === false) {
            return null;
          }

          return (
            <div key={index} className="col-xs-12 col-lg-4">
              <div style={{ padding: '10px', height: 'calc(100% - 10px)' }}>
                <FinnAd
                  ad={home}
                  style={{
                    height: 'calc(100% - 10px)',
                  }}
                  warning="Solgt"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Homes;
