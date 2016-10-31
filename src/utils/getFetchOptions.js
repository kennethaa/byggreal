let fetchOptions = {
    mode: 'cors'
};

if (!process.env.BROWSER) {
    const http = require('http');
    const agent = new http.Agent({
        keepAlive: true
    });

    fetchOptions = {
        headers: {
            'user-agent': 'byggreal'
        },
        agent,
        timeout: 6000
    };
}

export default function getFetchOptions() {
    return fetchOptions;
}
