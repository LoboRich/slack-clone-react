import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
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

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);
