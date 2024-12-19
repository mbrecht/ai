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

**Properties**

| property     | description                                                               |
| ------------ | ------------------------------------------------------------------------- |
| openAIApiKey | Your API key from <https://platform.openai.com/api-keys>.                 |
| modelName    | The name of the model you want to use.                                    |
| temperature  | The "creativity" setting. 1.0 is fully creative and 0.0 is fully factual. |
| maxTokens    | The maximum amount of tokens used per response                            |
| verbose      | Boolean option used for debugging                                         |

```typescript
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4",
  temperature: 0.3,
  maxTokens: 1000,
  verbose: true,
});
```

### Creating a single response

```typescript
const response = await model.invoke("prompt");
```

### Batching responses

```typescript
const response = await model.batch(["prompt", "another prompt"]);
```

### Using streams

```typescript
const response = await model.stream("prompt");
```
