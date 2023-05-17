import { PineconeClient } from "@pinecone-database/pinecone";
const pinecone = new PineconeClient();

const topk = await pinecone.init({});
