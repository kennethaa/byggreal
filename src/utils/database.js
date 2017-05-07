// @flow

import firebase from 'firebase';
import finn from './finn';
import type { Property } from './types';

const database = firebase.database();

function getProperties(ref: 'homes' | 'lettings') {
  return database
    .ref(ref)
    .once('value')
    .then(snapshot => {
      const properties = snapshot.val();
      return Object.keys(properties).reduce((h, finnCode) => {
        const property = properties[finnCode];

        h.push({
          finnCode,
          property,
        });

        return h;
      }, []);
    })
    .then(properties => {
      return properties.sort((a, b) => a.property.order - b.property.order);
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

export function postHome(finnCode: string, home: Property) {
  return database.ref(`homes/${finnCode}`).set(home);
}

export function postLetting(finnCode: string, letting: Property) {
  return database.ref(`lettings/${finnCode}`).set(letting);
}

export function putHome(finnCode: string, home: Property) {
  return database.ref(`homes/${finnCode}`).update(home);
}

export function putLetting(finnCode: string, letting: Property) {
  return database.ref(`lettings/${finnCode}`).update(letting);
}

export function deleteHome(finnCode: string) {
  return database.ref(`homes/${finnCode}`).remove();
}

export function deleteLetting(finnCode: string) {
  return database.ref(`lettings/${finnCode}`).remove();
}
