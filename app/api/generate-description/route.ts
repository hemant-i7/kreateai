import { VertexAI } from '@google-cloud/vertexai';
import { GoogleAuth } from 'google-auth-library';

if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
  throw new Error('Missing required environment variable: GOOGLE_CLOUD_PROJECT_ID');
}

// Create a GoogleAuth instance
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

// Create a VertexAI instance with the credentials
const vertexAi = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID,
  location: 'us-central1',
});

const visionModel = vertexAi.preview.getGenerativeModel({
  model: 'gemini-pro-vision',
});

const textModel = vertexAi.preview.getGenerativeModel({
  model: 'gemini-pro',
});

async function extractImageInsights(imageUrl: string): Promise<string> {
  const contents = [
    { role: 'user', parts: [{ text: 'Analyze this image and provide: 1) Objects detected, 2) Scene description, 3) Prominent colors, 4) Mood or tone' }] },
    { role: 'user', parts: [{ inlineData: { mimeType: 'image/jpeg', data: Buffer.from(imageUrl).toString('base64') } }] },
  ];

  const result = await visionModel.generateContent({
    contents,
    generationConfig: {
      maxOutputTokens: 1024,
    },
  });

  const response = result.response;
  if (!response.candidates || response.candidates.length === 0) {
    throw new Error('No content generated from the vision model');
  }

  const generatedContent = response.candidates[0].content;
  if (!generatedContent || !generatedContent.parts || generatedContent.parts.length === 0) {
    throw new Error('Generated content is empty or invalid');
  }

  const textPart = generatedContent.parts.find((part: any) => 'text' in part);
  if (!textPart || !textPart.text) {
    throw new Error('No text content found in the generated response');
  }

  return textPart.text;
}

async function generateCaptionAndHashtags(insights: string): Promise<{ caption: string; hashtags: string[] }> {
  const contents = [
    { role: 'user', parts: [{ text: `Based on these image insights: ${insights}
    
    Generate:
    1. A creative and engaging Instagram caption (max 200 characters)
    2. 5 relevant hashtags
    
    Format the response as JSON with keys "caption" and "hashtags".` }] },
  ];

  const result = await textModel.generateContent({
    contents,
    generationConfig: {
      maxOutputTokens: 1024,
    },
  });

  const response = result.response;
  if (!response.candidates || response.candidates.length === 0) {
    throw new Error('No content generated from the text model');
  }

  const generatedContent = response.candidates[0].content;
  if (!generatedContent || !generatedContent.parts || generatedContent.parts.length === 0) {
    throw new Error('Generated content is empty or invalid');
  }

  const textPart = generatedContent.parts.find((part: any) => 'text' in part);
  if (!textPart || !textPart.text) {
    throw new Error('No text content found in the generated response');
  }

  try {
    const parsedResponse = JSON.parse(textPart.text);
    if (typeof parsedResponse.caption !== 'string' || !Array.isArray(parsedResponse.hashtags)) {
      throw new Error('Invalid response format');
    }
    return parsedResponse;
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    throw new Error('Failed to parse the generated content');
  }
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const insights = await extractImageInsights(url);
    const { caption, hashtags } = await generateCaptionAndHashtags(insights);

    return new Response(JSON.stringify({ caption, hashtags, insights }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

