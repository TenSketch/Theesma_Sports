import Event from '@/server/models/Event';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const event = await Event.findById(id);
    
    if (!event) {
      return NextResponse.json({ success: false, error: 'Manifest not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const event = await Event.updateById(id, body);
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await Event.deleteById(id);
    return NextResponse.json({ success: true, message: 'Logistics manifest decommissioned' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
