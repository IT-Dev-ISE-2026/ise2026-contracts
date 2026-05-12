# Stage 1: Build (Bundling)
FROM node:20-slim AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy pnpm configuration and package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies for bundling
RUN pnpm install --frozen-lockfile

# Copy source files
COPY src ./src

# Run bundle command (generates dist/openapi.yaml)
RUN pnpm run bundle

# Stage 2: Run (Prism Mock Server)
FROM stoplight/prism:4

# Copy only the bundled file from the builder stage to a neutral location
COPY --from=builder /app/dist/openapi.yaml /tmp/openapi.yaml

EXPOSE 4010

# Run prism mock using the absolute path to the bundled file
CMD ["mock", "-h", "0.0.0.0", "/tmp/openapi.yaml", "--errors"]
