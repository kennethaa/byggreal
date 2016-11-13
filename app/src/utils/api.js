const API_URL = process.env.REACT_APP_API_URL || 'https://api.byggreal.kennethaasan.no';

export default function api(feed, required = true, options) {
    return new Promise((resolve, reject) =>
        fetch(`${API_URL}/${feed}`, options)
        .then((response) => response.json())
        .then(resolve)
        .catch((err) => {
            if (required) {
                return reject(err);
            }

            return resolve();
        })
    );
}

export function getHomes() {
    return new Promise((resolve, reject) => {
        api('homes')
        .then((homes) => {
            if (homes.data.success === false) {
                return reject(homes.data.message);
            }

            return Promise.all(homes.data.homes.map((home) =>
                api(`finn/${home.finnkode}`, false)
            ))
            .then(resolve)
            .catch((error) =>
                reject((error && error.message) || error)
            );
        })
        .catch((error) =>
            reject((error && error.message) || error)
        );
    });
}

export function getLettings() {
    return new Promise((resolve, reject) => {
        api('lettings')
        .then((lettings) => {
            if (lettings.data.success === false) {
                return reject(lettings.data.message);
            }

            return Promise.all(lettings.data.lettings.map((home) =>
                api(`finn/${home.finnkode}`, false)
            ))
            .then(resolve)
            .catch((error) =>
                reject((error && error.message) || error)
            );
        })
        .catch((error) =>
            reject((error && error.message) || error)
        );
    });
}
