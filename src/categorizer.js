import { initializaModel } from './model.js';
import { askQuestion } from './question.js';
import { promises as fs } from "fs";
import dotenv from 'dotenv';
dotenv.config();

export async function categorizer() {
  const model = await initializaModel("gemini-1.5-flash");

  const file = await askQuestion("\nMe informe o caminho e nome do arquivo (ou pressione Enter para usar 'src/av-italia.txt'): ") || 'src/av-italia.txt';

  try {
    const dados = await fs.readFile(file, 'utf8');

    const prompt = `
Analise as opiniões descritas em sequência e resuma os pontos positivos e negativos citados pelos clientes sobre esses destinos.

Depois, categorize o percentual de respostas em **satisfeito**, **insatisfeito** ou **neutro**, colocando no seguinte formato, por exemplo:

Satisfeitos: 20% - 20 respostas  
Insatisfeitos: 50% - 50 respostas  
Neutros: 30% - 30 respostas  

O total de respostas deve coincidir com o total de opiniões lidas.

Opiniões:
${dados}
    `.trim();

    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = await response.text();
    console.log(text);

  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
  }
}
