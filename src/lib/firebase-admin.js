import admin from "firebase-admin";

// Initialize Firebase Admin (Server-side)
let adminDb, adminAuth;

if (typeof window === "undefined") {
  if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (projectId && clientEmail && privateKey) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey: privateKey.replace(/\\n/g, "\n"),
          }),
        });
      } catch (error) {
        console.error("Firebase Admin initialization error:", error);
      }
    }
  }

  if (admin.apps.length) {
    adminDb = admin.firestore();
    adminAuth = admin.auth();
  }
}

// Helper to ensure Admin SDK is ready
const getAdminDb = () => {
  if (!adminDb) {
    throw new Error(
      "Firebase Admin DB not initialized. Please ensure FIREBASE_PROJECT_ID, " +
      "FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in your .env.local file."
    );
  }
  return adminDb;
};

const getAdminAuth = () => {
  if (!adminAuth) {
    throw new Error(
      "Firebase Admin Auth not initialized. Please ensure FIREBASE_PROJECT_ID, " +
      "FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in your .env.local file."
    );
  }
  return adminAuth;
};

export { adminDb, adminAuth, getAdminDb, getAdminAuth };
