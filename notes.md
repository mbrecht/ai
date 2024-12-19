## Starting a New Package

### Create a new repository

```bash
yarn init
```

### Add langchain dependencies

```bash
yarn add langchain @langchain/openai
```

### Add environment variables

```dotenv
OPENAI_API_KEY="FIND_YOURS_AND_ADD_IT_HERE" # https://platform.openai.com/api-keys
```

## Using a model

### Create a new model object

```typescript
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
```

### Creating a single response

```typescript
const response = await model.invoke("prompt");
```
