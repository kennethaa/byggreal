import getFetchOptions from '../utils/getFetchOptions';

export default function finn(id) {
    return new Promise((resolve, reject) => {
        const url = `http://m.finn.no/${id}`;

        fetch(url, Object.assign({}, getFetchOptions()))
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.text();
            }

            throw new Error(`Finn fails with ${response.status} ${response.statusText} at ${url}`);
        })
        .then(resolve)
        .catch(reject);
    });
}
