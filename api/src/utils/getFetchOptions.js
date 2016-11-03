import http from 'http';

const agent = new http.Agent({
    keepAlive: true
});

export default function getFetchOptions() {
    return {
        headers: {
            'user-agent': 'byggreal'
        },
        agent,
        timeout: 6000
    };
}
