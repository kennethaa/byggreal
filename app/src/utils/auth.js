// @flow

import firebase from 'firebase';

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
  uid: string,
};

export function onAuthStateChanged(callback: (user: User | null) => void) {
  return firebase.auth().onAuthStateChanged(callback);
}
