const API_URL = process.env.API_URL || 'https://api.byggreal.kennethaasan.no';

export default function api(feed) {
    return new Promise((resolve, reject) =>
        fetch(`${API_URL}/api/${feed}`)
        .then((response) => response.json())
        .then(resolve)
        .catch(reject)
    );
}
