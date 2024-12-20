# Getting Started with Langchain and OpenAI

## Goals

By the end of this guide, you should have your package set up and ready to use langchain with OpenAI's API. This guide offers instructions to add typescript to your project. These steps are marked as optional.

## Create a new Repository

### Set up yarn

Run the following script to initialize a yarn package. Use the `-y` flag to bypass initialization questions.

```bash
yarn init
```

### Add langchain dependencies

```bash
yarn add langchain @langchain/core @langchain/openai
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
