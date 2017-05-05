// @flow

const API_URL =
  process.env.REACT_APP_API_URL || 'https://api.byggreal.kennethaasan.no';

export default function finn(feed: string, required: boolean = true) {
  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/${feed}`, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(resolve)
      .catch(err => {
        if (required) {
          return reject(err);
        }

        return resolve();
      })
  );
}
