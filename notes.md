## Starting a New Package

1. Create a new repository

```bash
yarn init
```

{:start="2"} 2. Add langchain dependencies

```bash
yarn add langchain @langchain/openai
```

{:start="3"} 3. Add environment variables

```dotenv
OPENAI_API_KEY="FIND_YOURS_AND_ADD_IT_HERE" # https://platform.openai.com/api-keys
```

## Using a model

1. Create a new model object

```typescript
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
```

{:start="2"} 2. Create a response

```typescript
const response = await model.invoke("prompt");
```
