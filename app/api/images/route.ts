import { NextResponse } from 'next/server';
import { getImagesFromMongoDB } from '@/lib/moongodb';

export async function GET() {
  try {
    const images = await getImagesFromMongoDB();
    
    return NextResponse.json({ 
      status: 'ok', 
      data: images 
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch images' }, 
      { status: 500 }
    );
  }
}
