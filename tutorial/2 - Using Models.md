# Using a model

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
  modelName: "gpt-4o",
  temperature: 0.3,
  maxTokens: 1000,
  verbose: true,
});
```

### Creating a single response

```typescript
const prompt = "Tell me the name of the US President";

const response = await model.invoke("prompt");
```

Output

```bash

AIMessage {
  "id": "chatcmpl-AggLJyhX29US1jJfuK5mDDJ6RzvlZ",
  "content": "As of my last update in October 2021, the current US President is Joe Biden.",
  "additional_kwargs": {},
  "response_metadata": {
    "tokenUsage": {
      "promptTokens": 16,
      "completionTokens": 20,
      "totalTokens": 36
    },
    "finish_reason": "stop",
    "model_name": "gpt-4-0613"
  },
  "tool_calls": [],
  "invalid_tool_calls": [],
  "usage_metadata": {
    "output_tokens": 20,
    "input_tokens": 16,
    "total_tokens": 36,
    "input_token_details": {
      "audio": 0,
      "cache_read": 0
    },
    "output_token_details": {
      "audio": 0,
      "reasoning": 0
    }
  }
}
```

### Batching responses

```typescript
const prompts = [
  "What is the name on the US President",
  "Who was the President in 2018",
];

const response = await model.batch(prompts);
```

Output

```bash
[
  AIMessage {
    "id": "chatcmpl-AggTOzskhBfmIBNmboPgndZZxufq4",
    "content": "As of my last update, the President of the United States is Joe Biden.",
    "additional_kwargs": {},
    "response_metadata": {
      "tokenUsage": {
        "promptTokens": 15,
        "completionTokens": 17,
        "totalTokens": 32
      },
      "finish_reason": "stop",
      "model_name": "gpt-4o-2024-08-06",
      "usage": {
        "prompt_tokens": 15,
        "completion_tokens": 17,
        "total_tokens": 32,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "audio_tokens": 0
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "audio_tokens": 0,
          "accepted_prediction_tokens": 0,
          "rejected_prediction_tokens": 0
        }
      },
      "system_fingerprint": "fp_d28bcae782"
    },
    "tool_calls": [],
    "invalid_tool_calls": [],
    "usage_metadata": {
      "output_tokens": 17,
      "input_tokens": 15,
      "total_tokens": 32,
      "input_token_details": {
        "audio": 0,
        "cache_read": 0
      },
      "output_token_details": {
        "audio": 0,
        "reasoning": 0
      }
    }
  },
  AIMessage {
    "id": "chatcmpl-AggTOhFHCZN1tS4ZWjLagIC3UWsCA",
    "content": "In 2018, the President of the United States was Donald Trump. He served as the 45th president from January 20, 2017, to January 20, 2021.",
    "additional_kwargs": {},
    "response_metadata": {
      "tokenUsage": {
        "promptTokens": 15,
        "completionTokens": 42,
        "totalTokens": 57
      },
      "finish_reason": "stop",
      "model_name": "gpt-4o-2024-08-06",
      "usage": {
        "prompt_tokens": 15,
        "completion_tokens": 42,
        "total_tokens": 57,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "audio_tokens": 0
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "audio_tokens": 0,
          "accepted_prediction_tokens": 0,
          "rejected_prediction_tokens": 0
        }
      },
      "system_fingerprint": "fp_d28bcae782"
    },
    "tool_calls": [],
    "invalid_tool_calls": [],
    "usage_metadata": {
      "output_tokens": 42,
      "input_tokens": 15,
      "total_tokens": 57,
      "input_token_details": {
        "audio": 0,
        "cache_read": 0
      },
      "output_token_details": {
        "audio": 0,
        "reasoning": 0
      }
    }
  }
]
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
