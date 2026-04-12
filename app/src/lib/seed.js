const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const ProductSchema = new mongoose.Schema({
  name: String,
  slug: String,
  category: String,
  tag: String,
  price: Number,
  description: String,
  technicalSpecs: [{ label: String, value: String }],
  images: [String],
  splineUrl: String,
  stock: Number,
  show_price_on_listing: Boolean,
  featured: Boolean
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  {
    name: "Carbon Pro Bat",
    slug: "carbon-pro-bat",
    category: "Cricket",
    tag: "Pro Performance",
    price: 4999,
    description: "Multi-layered carbon fiber technology for explosive power and lightweight handling.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
    stock: 15,
    show_price_on_listing: false,
    featured: true
  },
  {
    name: "Aero Grip Studs",
    slug: "aero-grip-studs",
    category: "Football",
    tag: "Speed Elite",
    price: 2499,
    description: "Next-gen stud configuration for ultimate traction on any turf.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
    stock: 25,
    show_price_on_listing: false,
    featured: true
  },
  {
    name: "Voltage Racket",
    slug: "voltage-racket",
    category: "Badminton",
    tag: "Power Player",
    price: 3299,
    description: "Hyper-responsive frame design for high-tension smashes.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
    stock: 20,
    show_price_on_listing: false,
    featured: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Product.deleteMany({});
    console.log('Cleared existing products.');
    
    await Product.insertMany(products);
    console.log('Database seeded successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
