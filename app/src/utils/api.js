// @flow

import firebase from 'firebase';
import finn from './finn';

export function getHomes() {
  return new Promise((resolve, reject) => {
    return firebase('homes')
      .then(homes => {
        if (homes.data.success === false) {
          return reject(homes.data.message);
        }

        return Promise.all(
          homes.data.homes.map(home => finn(`finn/${home.finnkode}`, false))
        )
          .then(finnAds =>
            resolve(
              homes.data.homes.map((home, index) =>
                Object.assign({}, home, {
                  finnAd: finnAds[index] && finnAds[index].data,
                })
              )
            )
          )
          .catch(error => reject((error && error.message) || error));
      })
      .catch(error => reject((error && error.message) || error));
  });
}

// export function getLettings() {
//     return new Promise((resolve, reject) =>
//         api('lettings')
//         .then((lettings) => {
//             if (lettings.data.success === false) {
//                 return reject(lettings.data.message);
//             }
//
//             return Promise.all(lettings.data.lettings.map((home) =>
//                 finn(`finn/${home.finnkode}`, false)
//             ))
//             .then((finnAds) =>
//                 resolve(lettings.data.lettings.map((letting, index) =>
//                     Object.assign({}, letting, {
//                         finnAd: finnAds[index] && finnAds[index].data
//                     })
//                 ))
//             )
//             .catch((error) =>
//                 reject((error && error.message) || error)
//             );
//         })
//         .catch((error) =>
//             reject((error && error.message) || error)
//         )
//     );
// }

// export function putHome(homeId, home) {
//     return new Promise((resolve, reject) =>
//         api(`homes/${homeId}`, true, {
//             method: 'put',
//             body: JSON.stringify(Object.assign({}, home, {
//                 token: localStorage.token
//             }))
//         })
//         .then((homeNew) => {
//             if (homeNew.data.success === false) {
//                 return reject(homeNew.data.message);
//             }
//
//             return resolve(homeNew);
//         })
//         .catch(reject)
//     );
// }

// export function putLetting(lettingId, letting) {
//     return new Promise((resolve, reject) =>
//         api(`lettings/${lettingId}`, true, {
//             method: 'put',
//             body: JSON.stringify(Object.assign({}, letting, {
//                 token: localStorage.token
//             }))
//         })
//         .then((lettingNew) => {
//             if (lettingNew.data.success === false) {
//                 return reject(lettingNew.data.message);
//             }
//
//             return resolve(lettingNew);
//         })
//         .catch(reject)
//     );
// }

// export function deleteHome(homeId) {
//     return new Promise((resolve, reject) =>
//         api(`homes/${homeId}`, true, {
//             method: 'delete',
//             body: JSON.stringify({ token: localStorage.token })
//         })
//         .then((response) => {
//             if (response.data.success === false) {
//                 return reject(response.data.message);
//             }
//
//             return resolve();
//         })
//         .catch(reject)
//     );
// }

// export function deleteLetting(lettingId) {
//     return new Promise((resolve, reject) =>
//         api(`lettings/${lettingId}`, true, {
//             method: 'delete',
//             body: JSON.stringify({ token: localStorage.token })
//         })
//         .then((response) => {
//             if (response.data.success === false) {
//                 return reject(response.data.message);
//             }
//
//             return resolve();
//         })
//         .catch(reject)
//     );
// }

// export function postHome(home) {
//     return new Promise((resolve, reject) =>
//         api('homes', true, {
//             method: 'post',
//             body: JSON.stringify(Object.assign({}, home, {
//                 token: localStorage.token
//             }))
//         })
//         .then((homeNew) => {
//             if (homeNew.data.success === false) {
//                 return reject(homeNew.data.message);
//             }
//
//             return resolve(homeNew);
//         })
//         .catch(reject)
//     );
// }

// export function postLetting(letting) {
//     return new Promise((resolve, reject) =>
//         api('lettings', true, {
//             method: 'post',
//             body: JSON.stringify(Object.assign({}, letting, {
//                 token: localStorage.token
//             }))
//         })
//         .then((lettingNew) => {
//             if (lettingNew.data.success === false) {
//                 return reject(lettingNew.data.message);
//             }
//
//             return resolve(lettingNew);
//         })
//         .catch(reject)
//     );
// }
