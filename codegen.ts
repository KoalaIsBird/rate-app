import { CodegenConfig } from '@graphql-codegen/cli';

require('dotenv').config()
console.log(process.env.EXPO_PUBLIC_APOLLO_URI)

const config: CodegenConfig = {
  schema: process.env.EXPO_PUBLIC_APOLLO_URI,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  // ignoreNoDocuments: true,
};

export default config;