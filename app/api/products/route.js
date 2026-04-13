import dbConnect from '@/lib/mongodb';
import Product from '@/server/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let query = {};
    if (category) query.category = category;
    if (featured) query.featured = true;

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
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

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const productData = {
      ...body,
      category_id: body.category_id || body.category?.toLowerCase().replace(/\s+/g, '-'),
      images: Array.isArray(body.images) ? body.images : [],
    };
    const product = await Product.create(productData);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
