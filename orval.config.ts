import { defineConfig } from 'orval';

export default defineConfig({
  validation: {
    input: './dist/openapi.yaml',
    output: {
      target: './.temp/validate.ts',
      client: 'axios',
    },
  },
});
