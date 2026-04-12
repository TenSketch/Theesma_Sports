import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category.'],
    enum: ['Cricket', 'Football', 'Badminton', 'Gym', 'Running'],
  },
  tag: {
    type: String,
    default: 'Elite Series',
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  technicalSpecs: [
    {
      label: String,
      value: String
    }
  ],
  images: [String],
  splineUrl: String,
  stock: {
    type: Number,
    default: 10,
  },
  show_price_on_listing: {
    type: Boolean,
    default: false, // Curiosity Design Default
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
