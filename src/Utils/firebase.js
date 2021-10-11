import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBMX8IvIsF-T1lvS6pkXoJ1sBKqypICGGs",
  authDomain: "slack-clone-8d558.firebaseapp.com",
  databaseURL: "https://slack-clone-8d558-default-rtdb.firebaseio.com",
  projectId: "slack-clone-8d558",
  storageBucket: "slack-clone-8d558.appspot.com",
  messagingSenderId: "442828509831",
  appId: "1:442828509831:web:2bdd7bdcdc670949299e22",
  measurementId: "G-4H4ZGFH2CG"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };