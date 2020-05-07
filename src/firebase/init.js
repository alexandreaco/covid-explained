import firebase from 'firebase';
import firestore from 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: '283614810687',
  appId: '1:283614810687:web:5323282c0075565ab3de8a',
  measurementId: 'G-WRNNMS3M8S',
};

// Initialize Firebase
const firbaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firbaseApp.firestore();
