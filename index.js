import { GoogleGenerativeAI } from '@google/generative-ai';
import { askQuestion } from './src/question.js';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = await askQuestion("Me fale sobre o destino que deseja conhecer: ");
  const categories = await askQuestion("Me fale as categorias que deseja visualizar sobre um determinado destino: ");
  const userPrompt = `Me fale sobre o destino "${prompt}". Responda apenas com as seguintes categorias: ${categories}.`;

const chatInput = {
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `
            Você é um chatbot de um site que vende pacotes de viagens.
            Ao ser perguntado sobre algum destino, como bairro, cidade, país ou continente, forneça informações turísticas úteis.

            Regras:
            - Só responda perguntas relacionadas a turismo.
            - Se for perguntado sobre futebol, diga: "Não posso responder sobre isso, meu foco são viagens."
            - Se for um time com nome de cidade (ex: Real Madrid), diga: "Não posso responder sobre isso, meu foco são viagens. Mas posso falar sobre a cidade de [nome da cidade]."
            - Sua resposta deve conter **apenas as categorias solicitadas** pelo usuário.

            Exemplos de categorias possíveis:
            - características
            - localização
            - cultura
            - pontos turísticos
            - clima
            - dicas
            - curiosidades
            - culinária

            Apresente as informações em formato de lista com marcadores.

            ${userPrompt}
        `.trim()
        }
      ]
    }
  ]
};



  const result = await model.generateContent(chatInput);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
