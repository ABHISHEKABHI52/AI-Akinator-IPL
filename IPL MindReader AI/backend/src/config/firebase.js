import admin from 'firebase-admin';

let appInstance = null;

function decodePrivateKey(value) {
  if (!value) {
    return undefined;
  }
  return value.replace(/\\n/g, '\n');
}

export function getFirebaseApp() {
  if (appInstance) {
    return appInstance;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = decodePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  // If Firebase credentials not provided, return null (graceful degradation)
  // To enable Firestore persistence, add FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY to .env.local
  // Get these from Firebase Console → Project Settings → Service Accounts → Generate Private Key
  if (!projectId || !clientEmail || !privateKey) {
    console.warn('⚠️ Firebase Admin SDK credentials not configured. Firestore persistence disabled. Add FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY to backend/.env.local');
    return null;
  }

  if (admin.apps.length > 0) {
    appInstance = admin.apps[0];
    return appInstance;
  }

  appInstance = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined
  });

  return appInstance;
}

export function getFirestoreDb() {
  const app = getFirebaseApp();
  if (!app) {
    return null;
  }
  return admin.firestore(app);
}
