import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        project_id: process.env.NEXT_PUBLIC_FIREBASE_projectId,
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_databaseURL
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.firestore();