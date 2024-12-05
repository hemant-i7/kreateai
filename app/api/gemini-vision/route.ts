import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// NOTE: In a production environment, use environment variables for API keys
const API_KEY = 'AIzaSyDuYPkLtuuTz7cpsGlhBtS605qIpp8v100'

export async function POST(req: Request) {
  const formData = await req.formData()
  const image = formData.get('image') as File
  const prompt = formData.get('prompt') as string

  if (!image || !prompt) {
    return NextResponse.json({ error: 'Image and prompt are required' }, { status: 400 })
  }

  const genAI = new GoogleGenerativeAI(API_KEY)

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const imageParts = [
      {
        inlineData: {
          data: Buffer.from(await image.arrayBuffer()).toString('base64'),
          mimeType: image.type,
        },
      },
    ]

    const result = await model.generateContent([prompt, ...imageParts])
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}