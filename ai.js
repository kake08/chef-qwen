

import OpenAI from 'openai';
// require('dotenv').config();
const apiKey = import.meta.env.VITE_chef_gpt;

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe 
they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe.
 The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
  Format your response in markdown to make it easier to render to a web page`





  
const openai = new OpenAI({
  baseURL: "https://api.openai.com/v1",
  apiKey: `${apiKey}`,
  dangerouslyAllowBrowser: true,
});

export async function getRecipeFromQwenAI(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
            {
                "role": "user",
                "content": `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
            },
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            }
            ],
            max_tokens: 1024,
        });
        return completion.choices[0].message.content;

    } catch(err) {
        console.error(err.message)
    }

}
