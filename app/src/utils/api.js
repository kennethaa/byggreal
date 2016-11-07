const API_URL = process.env.API_URL || 'https://api.byggreal.kennethaasan.no';

export default function api(feed, required = true, options) {
    return new Promise((resolve, reject) =>
        fetch(`${API_URL}/api/${feed}`, options)
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
