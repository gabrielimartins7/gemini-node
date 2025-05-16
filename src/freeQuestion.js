import { initializaModel } from './model.js';
import { askQuestion } from './question.js';
import dotenv from 'dotenv';
dotenv.config();

export async function freeQuestion() {
  const model = await initializaModel("gemini-1.5-flash");

  const prompt = await askQuestion("Me faça uma pergunta sobre um determinado destino: ");

  const parts = [
    { text: "Você é o chatbot de um site que vende pacotes de viagem." },
    { text: `input: ${prompt}` },
    { text: "output:" }
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }]
  });

  const response = await result.response;
  const text = await response.text();
  console.log(text);
}
