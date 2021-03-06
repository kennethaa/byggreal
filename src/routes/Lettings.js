// @flow

import React, { Component } from 'react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getLettings } from '../utils/database';
import FinnAd from '../components/FinnAd';
import type { Property } from '../utils/types';

type State = {
  loading: boolean,
  error?: string,
  lettings?: Array<Property>,
};

class Lettings extends Component<void, {}, State> {
  static path = '/bolig-til-leie';

  state = {
    loading: true,
    error: undefined,
    lettings: undefined,
  };

  componentDidMount() {
    getLettings()
      .then(lettings =>
        this.setState({
          loading: false,
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
      return (
        <ErrorMessage error="Det finnes ingen boliger til leie for øyeblikket." />
      );
    }

    return (
      <div className="row">
        {lettings.map((letting, index) => {
          if (!letting || !letting.finnAd || letting.finnAd.success === false) {
            return null;
          }

          return (
            <div key={index} className="col-xs-12 col-lg-4">
              <div style={{ padding: '10px', height: 'calc(100% - 10px)' }}>
                <FinnAd
                  ad={letting}
                  style={{
                    height: 'calc(100% - 10px)',
                  }}
                  warning="Utleid"
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
