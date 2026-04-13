import dbConnect from '@/lib/mongodb';
import Product from '@/server/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Performance search using Mongoose
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).limit(10).lean();

    const normalized = products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      category: product.category,
      category_id: product.category_id || product.category?.toLowerCase().replace(/\s+/g, '-'),
      price: product.price,
      images: Array.isArray(product.images) ? product.images : [],
      stock: product.stock,
      slug: product.slug,
      tag: product.tag,
      show_price_on_listing: product.show_price_on_listing,
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    return NextResponse.json({ success: true, data: normalized });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
