import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy' });

export async function getProductRecommendations(currentProduct: any, allProducts: any[]) {
  if (!process.env.GEMINI_API_KEY) return allProducts.slice(0, 4).filter(p => p.id !== currentProduct.id);

  try {
    const prompt = `
      As an e-commerce AI expert, recommend 4 items from this list that complement the "${currentProduct.name}".
      List: ${allProducts.map(p => `${p.id}: ${p.name}`).join(', ')}
      
      Return ONLY a JSON array of strings (the IDs).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    const text = response.text || '[]';
    const ids = JSON.parse(text.match(/\[.*\]/)?.[0] || '[]');
    
    return allProducts.filter(p => ids.includes(p.id)) || allProducts.slice(0, 4);
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    return allProducts.slice(0, 4);
  }
}
