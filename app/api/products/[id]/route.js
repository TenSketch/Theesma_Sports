import Product from '@/server/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id: identifier } = await params;
    
    // 1. Try finding by ID (Firestore ID)
    let product = await Product.findById(identifier);
    
    // 2. Fallback to finding by Slug (for public detail pages)
    if (!product) {
      product = await Product.findOne({ slug: identifier });
    }
    
    if (!product) {
      return NextResponse.json({ success: false, error: 'Asset not found in arsenal' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const product = await Product.updateById(id, body);
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await Product.deleteById(id);
    return NextResponse.json({ success: true, message: 'Asset decommissioning successful' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
