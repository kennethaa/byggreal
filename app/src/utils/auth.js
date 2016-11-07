import api from './api';

const auth = {
    login(username, password, callback) {
        if (localStorage.token) {
            if (callback) callback(true);
            if (this.onChange) this.onChange(true);
            return;
        }

        api('auth/login', true, {
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: `username=${username}&password=${password}`
        })
        .then((res) => {
            if (!res || !res.data || !res.data.token) {
                if (callback) callback(false);
                if (this.onChange) this.onChange(false);
                return;
            }

            localStorage.token = res.data.token;
            if (callback) callback(true);
            if (this.onChange) this.onChange(true);
        })
        .catch(() => {
            if (callback) callback(false);
            if (this.onChange) this.onChange(false);
        });
    },

    getToken() {
        return localStorage.token;
    },

    logout(callback) {
        delete localStorage.token;
        if (callback) callback();
        if (this.onChange) this.onChange(false);
    },

    loggedIn() {
        return !!localStorage.token;
    },

    onChange() {}
};

export default auth;
