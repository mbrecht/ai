## Starting a New Package

### Create a new repository

Initializes a package.json file. Use the -y flag to bypass setup questions.

```bash
yarn init
```

### Add langchain dependencies

```bash
yarn add langchain @langchain/openai
```

### Set up typescript (optional)

Add typescript as a dev dependency and install type definitions for node

```bash
yarn add -D typescript @types/node
```

Initialize tsconfig.json

```bash
npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
```

### Add nodemon and startup script (optional)

Add nodemon as a dev dependency

```bash
yarn add -D nodemon
```

(Optional) add ts-node if using typescript

```bash
yarn add -D ts-node
```

Add the following script to your `package.json` file:

```json
"scripts": {
  "dev": "npx nodemon"
}
```

Create a `nodemon.json` file and add the following to it:

```bash
touch ./nodemon.json
```

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/index.ts"
}
```

### Add environment variables

Add `dotenv` to your project

```bash
yarn add dotenv
```

`dotenv` must be imported as soon as possible in your project. The following line should be the first line of code in your project:

```typescript
import "dotenv/config";
```

Create a `.env` file

```bash
touch ./.env
```

Add the following to `.env`:

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

## Prompt Templates

### Generic Example

```typescript
import { ChatPromptTemplate } from "@langchain/core";

const prompt = ChatPromptTemplate.fromTemplate(
  "You can specify a custom {input}",
);

const chain = prompt.pipe(model);

const response = await chain.invoke({
  input: "prompt data from the user",
});
```

### Chatbot Prompt Template

```typescript
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "System prompt goes here"],
  ["human", "{input}"],
]);

const chain = prompt.pipe(model);

const response = await chain.invoke({
  input: "User input from chat interface",
});
```

## Output Parsers

### StringOutputParser

The StringOutputParser will transform the response from an AI message output to a string

```typescript
import { StringOutputParser } from "@langchain/core/output_parsers";

const parser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(parser);

const response = await chain.invoke({
  input: "User input",
});
```

### ListOutputParser

```typescript
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromTemplate(
  "Create a list of 5 synonyms, separated by commas, for the following word {word}",
);

const parser = new CommaSeparatedListOutputParser();

const chain = prompt.pipe(model).pipe(parser);

const response = await chain.invoke({
  input: "User input",
});
```

### StructuredOutputParser

This parser transforms a response object to a javascript object defined by the user

```bash
yarn add zod
```

```typescript
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

const prompt = ChatPromptTemplate.fromTemplate(`
  Extract information from the following phrase.
  Formatting Instructions: {format_instructions}
  Phrase: {input}
`);

const schema = z.object({
  recipe: z.string().describe("name of recipe"),
  ingredients: z.array(z.string()).describe("ingredients"),
});

const parser = StructuredOutputParser.fromZodSchema(schema);

const chain = prompt.pipe(model).pipe(parser);

const response = await chain.invoke({
  input: "The ingredients for PB&J are peanut butter, jelly, and bread",
  format_instructions: parser.getFormatInstructions(),
});
```
