// @flow

import firebase from 'firebase';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

export function login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
    return firebase.auth().signOut();
}

export function getCurrentUser() {
    return firebase.auth().currentUser;
}

type User = {
    email: string,
    uid: string
};

export function onAuthStateChanged(callback: (user: User | null) => void) {
    return firebase.auth().onAuthStateChanged(callback);
}
