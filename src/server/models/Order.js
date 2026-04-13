import { getAdminDb } from '@/lib/firebase-admin';

const COLLECTION = 'orders';

export default {
  async find(query = {}) {
    const db = getAdminDb();
    let q = db.collection(COLLECTION);

    if (query.user) {
      q = q.where('user', '==', query.user);
    }

    const snapshot = await q.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async findById(id) {
    const db = getAdminDb();
    const doc = await db.collection(COLLECTION).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async create(data) {
    const db = getAdminDb();
    const docRef = db.collection(COLLECTION).doc();
    const newData = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await docRef.set(newData);
    return { id: docRef.id, ...newData };
  },

  async updateById(id, data) {
    const db = getAdminDb();
    const docRef = db.collection(COLLECTION).doc(id);
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    await docRef.update(updateData);
    return { id, ...updateData };
  }
};
