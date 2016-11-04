const API_URL = process.env.API_URL || 'http://localhost:8080';

export default function api(feed) {
    return new Promise((resolve, reject) =>
        fetch(`${API_URL}/api/${feed}`)
        .then((response) => response.json())
        .then(resolve)
        .catch(reject)
    );
}
