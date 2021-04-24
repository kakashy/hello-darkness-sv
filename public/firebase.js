import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyCC5gQrJm6FyJixFYKOCJ6LL7gdoqhE4S4",
    authDomain: "jaribio.firebaseapp.com",
    projectId: "jaribio",
    storageBucket: "jaribio.appspot.com",
    messagingSenderId: "558377266219",
    appId: "1:558377266219:web:d29d8f19fe8c3a4d604e6e"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();