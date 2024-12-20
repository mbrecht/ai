import { ChatOpenAI } from "@langchain/openai";
import "dotenv/config";

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4",
  temperature: 0.3,
  maxTokens: 1000,
});

(async () => {
  const prompt = "Tell me the name of the current US President";

  const response = await model.invoke(prompt);

  console.log(response);
})();
