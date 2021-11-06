
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import '@firebase/auth';

// firebase for api

const firebaseConfig = {
    apiKey: "AIzaSyC9yHeIrnmYm9VyA-tf746mf8McHYNblzs",
    authDomain: "netflixx-build-36d21.firebaseapp.com",
    projectId: "netflixx-build-36d21",
    storageBucket: "netflixx-build-36d21.appspot.com",
    messagingSenderId: "891533423522",
    appId: "1:891533423522:web:41345a5c576107c22e38fb"
  };

//   firebase for authentication
const firebaseapp=firebase.initializeApp(firebaseConfig);
const db=firebaseapp.firestore();
const auth=firebase.auth();

export { auth }
 
export default db;