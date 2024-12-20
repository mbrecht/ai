import { ChatOpenAI } from "@langchain/openai";
import "dotenv/config";

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o",
  temperature: 0.3,
  maxTokens: 1000,
});

(async () => {
  const prompts = [
    "What is the name on the US President",
    "Who was the President in 2018",
  ];

  const response = await model.batch(prompts);

  console.log(response);
})();
