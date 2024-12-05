import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME || 'imageUploadDB';

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === 'development') {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function uploadImageToMongoDB(imageUrl: string) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const imagesCollection = db.collection('images');
    
    const result = await imagesCollection.insertOne({ 
      imageUrl, 
      uploadedAt: new Date() 
    });
    
    return result;
  } catch (error) {
    console.error('MongoDB upload error:', error);
    return null;
  }
}

export async function getImagesFromMongoDB() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const imagesCollection = db.collection('images');
    
    const images = await imagesCollection.find({}).toArray();
    return images;
  } catch (error) {
    console.error('MongoDB fetch error:', error);
    return [];
  }
}
