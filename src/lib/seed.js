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
    console.error('Please ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.');
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
    console.log('Firebase Admin initialized for seeding...');
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    process.exit(1);
  }
}

const db = admin.firestore();

const products = [
  {
    name: "Carbon Pro Bat",
    slug: "carbon-pro-bat",
    category: "Cricket",
    tag: "Pro Performance",
    price: 4999,
    description: "Multi-layered carbon fiber technology for explosive power and lightweight handling.",
    images: ["/img/hero-1.png"],
    stock: 15,
    show_price_on_listing: false,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Aero Grip Studs",
    slug: "aero-grip-studs",
    category: "Football",
    tag: "Speed Elite",
    price: 2499,
    description: "Next-gen stud configuration for ultimate traction on any turf.",
    images: ["/img/badminton-hero-img-1.png"],
    stock: 25,
    show_price_on_listing: false,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Voltage Racket",
    slug: "voltage-racket",
    category: "Badminton",
    tag: "Power Player",
    price: 3299,
    description: "Hyper-responsive frame design for high-tension smashes.",
    images: ["/img/badminton-hero-img-2.png"],
    stock: 20,
    show_price_on_listing: false,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const seedDB = async () => {
  try {
    const productsRef = db.collection('products');
    
    // Clear existing products
    const snapshot = await productsRef.get();
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('Cleared existing products.');
    
    // Insert new products
    for (const product of products) {
      await productsRef.add(product);
    }
    console.log('Database seeded successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
