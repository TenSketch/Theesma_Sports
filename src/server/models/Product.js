import { getAdminDb } from '@/lib/firebase-admin';

const COLLECTION = 'products';

export default {
  async find(query = {}) {
    const db = getAdminDb();
    let q = db.collection(COLLECTION);
    
    if (query.category) {
      q = q.where('category', '==', query.category);
    }
    
    if (query.featured !== undefined) {
      q = q.where('featured', '==', query.featured);
    }

    // Sort by createdAt desc by default
    const snapshot = await q.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async findOne(query) {
    const db = getAdminDb();
    let q = db.collection(COLLECTION);
    
    if (query.slug) {
      q = q.where('slug', '==', query.slug).limit(1);
    } else if (query._id) {
      const doc = await q.doc(query._id).get();
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
