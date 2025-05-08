import { GoogleGenerativeAI } from '@google/generative-ai';
import { askQuestion } from './src/question.js';
import dotenv from 'dotenv';

dotenv.config(); 

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = await askQuestion("Me fale do destino que deseja conhecer: ");

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
