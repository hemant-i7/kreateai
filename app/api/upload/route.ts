import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToMongoDB } from '@/lib/moongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl } = body;
    
    if (!imageUrl) {
      return NextResponse.json(
        { status: 'error', message: 'No image URL provided' }, 
        { status: 400 }
      );
    }
    
    const result = await uploadImageToMongoDB(imageUrl);
    
    if (result) {
      return NextResponse.json(
        { status: 'ok', message: 'Image uploaded successfully' }, 
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: 'error', message: 'Failed to upload image' }, 
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Server error' }, 
      { status: 500 }
    );
  }
}
