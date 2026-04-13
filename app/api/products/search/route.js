import Product from '@/server/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Basic text search for Firestore (since regex is not natively supported)
    // For small catalogs, we can fetch all and filter, or use basic comparison.
    const allProducts = await Product.find({});
    const normalizedQuery = query.toLowerCase();
    
    const products = allProducts.filter(p => 
      p.name?.toLowerCase().includes(normalizedQuery) ||
      p.category?.toLowerCase().includes(normalizedQuery) ||
      p.description?.toLowerCase().includes(normalizedQuery)
    ).slice(0, 10);

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
