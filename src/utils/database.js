// @flow

import firebase from 'firebase';
import finn from './finn';

const database = firebase.database();

function getProperties(propertyType: 'homes' | 'lettings') {
  return database
    .ref(propertyType)
    .once('value')
    .then(snapshot => {
      const properties = snapshot.val();
      return Object.keys(properties).reduce((h, finnCode) => {
        const property = properties[finnCode];

        h.push(
          Object.assign({}, property, {
            finnCode: finnCode,
          })
        );

        return h;
      }, []);
    })
    .then(properties => {
      return properties.sort((a, b) => a.order - b.order);
    })
    .then(properties => {
      return Promise.all(
        properties.map(property => finn(`finn/${property.finnCode}`, false))
      ).then(finnAds =>
        properties.map((property, index) =>
          Object.assign({}, property, {
            finnAd: finnAds[index] && finnAds[index].data,
          })
        )
      );
    });
}

export function getHomes() {
  return getProperties('homes');
}

export function getLettings() {
  return getProperties('lettings');
}
