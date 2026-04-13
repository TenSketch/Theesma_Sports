import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';

const COLLECTION = 'users';

export default {
  async find(query = {}) {
    const db = getAdminDb();
    let q = db.collection(COLLECTION);
    
    if (query.role) {
      q = q.where('role', '==', query.role);
    }

    const snapshot = await q.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async findOne(query) {
    const db = getAdminDb();
    const usersRef = db.collection(COLLECTION);
    let q;

    if (query.email) {
      q = usersRef.where('email', '==', query.email.toLowerCase()).limit(1);
    } else if (query._id) {
      const doc = await usersRef.doc(query._id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    const snapshot = await q.get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },

  async findById(id) {
    const db = getAdminDb();
    const doc = await db.collection(COLLECTION).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async create(data) {
    const db = getAdminDb();
    const auth = getAdminAuth();
    const { email, password, name, role = 'user' } = data;

    // 1. Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // 2. Store additional data in Firestore
    const userData = {
      name,
      email: email.toLowerCase(),
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection(COLLECTION).doc(userRecord.uid).set(userData);

    return { id: userRecord.uid, ...userData };
  },

  async upsertFromAuth(uid, authData) {
    const db = getAdminDb();
    const { email, name } = authData;
    
    const userRef = db.collection(COLLECTION).doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      // Create new profile for social login
      const userData = {
        name,
        email: email?.toLowerCase(),
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await userRef.set(userData);
      return { id: uid, ...userData };
    } else {
      // Update existing profile with latest social info if needed
      const existingData = doc.data();
      const updateData = {
        updatedAt: new Date().toISOString(),
      };
      // Optionally update name if it was missing
      if (!existingData.name && name) updateData.name = name;
      
      await userRef.update(updateData);
      return { id: uid, ...existingData, ...updateData };
    }
  },

  // Note: Password verification is handled by Firebase Auth, not a manual method anymore.
  // We'll update the login route to use adminAuth.verifyIdToken or similar if needed,
  // or client-side login.
};
