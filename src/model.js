import { GoogleGenerativeAI } from '@google/generative-ai';

export async function initializaModel(modelName) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const generativeModel = genAI.getGenerativeModel({ model: modelName });
    return generativeModel;
}