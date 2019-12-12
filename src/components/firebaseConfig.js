import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBxA2Xpp4BrhiUxcUPB0GDjlhpw68HnrN8",
  authDomain: "sams-yomi.firebaseapp.com",
  databaseURL: "https://sams-yomi.firebaseio.com",
  projectId: "sams-yomi",
  storageBucket: "sams-yomi.appspot.com",
  messagingSenderId: "390414194495",
  appId: "1:390414194495:web:4af3813bb8ac93e32d258a",
  measurementId: "G-GG3PJ60206"
  };
  // Initialize Firebase
  export const firebaseApp = firebase.initializeApp(firebaseConfig);