import api from './api';

const auth = {
    login(username, password, callback) {
        api('auth/login', true, {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            })
        })
        .then((res) => {
            if (!res || !res.data || !res.data.token || !res.data.expires) {
                if (callback) callback(false);
                if (this.onChange) this.onChange(false);
                return;
            }

            localStorage.token = res.data.token;
            localStorage.expires = res.data.expires;

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
        return this.getToken() && ((Date.now() + 86400000) < localStorage.expires);
    },

    onChange() {}
};

export default auth;
