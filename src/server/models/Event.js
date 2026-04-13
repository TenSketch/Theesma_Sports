import { getAdminDb } from '@/lib/firebase-admin';

const COLLECTION = 'events';

export default {
  async find(query = {}) {
    const db = getAdminDb();
    let q = db.collection(COLLECTION);
    
    if (query.sport) {
      q = q.where('sport', '==', query.sport);
    }
    
    if (query.status) {
      q = q.where('status', '==', query.status);
    }

    // Sort by date or createdAt
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
      status: data.status || 'Scheduled',
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
  },
  
  async deleteById(id) {
    const db = getAdminDb();
    await db.collection(COLLECTION).doc(id).delete();
    return true;
  }
};
