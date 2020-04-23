import firebase from 'firebase';
import firestore from 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBbar5aJcmYb9wYHRCIWdXXRkps51ASFUc',
  authDomain: 'covid-explained.firebaseapp.com',
  databaseURL: 'https://covid-explained.firebaseio.com',
  projectId: 'covid-explained',
  storageBucket: 'covid-explained.appspot.com',
  messagingSenderId: '283614810687',
  appId: '1:283614810687:web:5323282c0075565ab3de8a',
  measurementId: 'G-WRNNMS3M8S',
};
// Initialize Firebase
const firbaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firbaseApp.firestore();
