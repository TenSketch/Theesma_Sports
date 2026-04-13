import Product from '@/server/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
