const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from .env.local
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Missing Firebase Admin credentials in .env.local');
    process.exit(1);
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    process.exit(1);
  }
}

const db = admin.firestore();
const auth = admin.auth();

const setupAdmin = async () => {
  const email = 'admin@gmail.com';
  const password = 'admin123'; // Minimum 6 characters required by Firebase
  const name = 'System Administrator';

  try {
    console.log(`Setting up admin account: ${email}...`);

    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      console.log('User already exists in Firebase Auth.');
      
      // Update password just in case
      await auth.updateUser(userRecord.uid, { password });
      console.log('Password updated to: admin123');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        userRecord = await auth.createUser({
          email,
          password,
          displayName: name,
        });
        console.log('User created in Firebase Auth.');
      } else {
        throw error;
      }
    }

    // Upsert into Firestore 'users' collection
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email: email.toLowerCase(),
      role: 'admin',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(), // In a real update we might preserve this, but for setup it's fine
    }, { merge: true });

    console.log('\x1b[32m%s\x1b[0m', '✅ Admin provisioned successfully in Firestore with role: admin');
    console.log('Credentials:');
    console.log(`- Email: ${email}`);
    console.log(`- Password: ${password}`);
    
    process.exit();
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error provisioning admin:', error);
    process.exit(1);
  }
};

setupAdmin();
