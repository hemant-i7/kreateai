import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// NOTE: In a production environment, use environment variables for API keys
const API_KEY = 'AIzaSyDuYPkLtuuTz7cpsGlhBtS605qIpp8v100'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  const genAI = new GoogleGenerativeAI(API_KEY)

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}