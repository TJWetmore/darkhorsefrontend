import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// import 'firebase-admin';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_databaseURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId
};
try {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
const database = firebase.database();

const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const now = firebase.firestore.Timestamp.now();
const storage = firebase.storage();
// const firebaseAdmin = firebase.admin();
export { auth, db, now, storage, database};
export default fire;