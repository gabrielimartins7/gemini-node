import dotenv from 'dotenv';
dotenv.config();

import { freeQuestion } from './src/freeQuestion.js';
import { askQuestion } from './src/question.js';
import { targetQuery } from './src/targetQuery.js';
import { categorizer } from './src/categorizer.js';

async function main() {
  const choice = await askQuestion(`Escolha uma das opções abaixo: \n
  1. Fazer uma pergunta livre sobre um destino: 
  2. Comparação de destinos por categorias:
  3. Fazer a análise de sentimentos baseado em arquivo texto: 
  \nOpção desejada: `);

  if (choice === '1') {
    await freeQuestion();
  } else if (choice === '2') {
    await targetQuery();
  }else if (choice === '3') {
    await categorizer();
  } else {
    console.log('Escolha inválida.');
  }
}

main();
