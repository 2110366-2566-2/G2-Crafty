# ---- Base Node ----
FROM node:16-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install pnpm
# RUN npm install -g pnpm

WORKDIR /usr/src/app

# ---- Dependencies ----
FROM base AS dependencies
# Copy the pnpm-lock file to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install all node packages, including 'devDependencies' for the build process
# RUN pnpm fetch --prod false
# RUN pnpm install -r --offline

# FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile


# Copy Prisma files
COPY prisma ./prisma/

# Install the Prisma Client
RUN npx prisma generate

# ---- Build ----
FROM dependencies AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
# Build the application
RUN pnpm run build

# ---- Release ----
FROM base AS release
# Install production node packages only
# COPY package.json pnpm-lock.yaml ./
# RUN pnpm fetch --prod true
# RUN pnpm install -r --offline
COPY --from=dependencies /usr/src/app/node_modules /usr/src/app/node_modules

# Copy built assets from the 'build' stage
COPY --from=build /usr/src/app/dist ./dist
# Copy generated Prisma client from the 'dependencies' stage
# COPY --from=dependencies /usr/src/app/node_modules/.prisma ./.prisma
# COPY --from=dependencies /usr/src/app/node_modules/@prisma ./@prisma

# Copy any other required files you may need
COPY .env ./

EXPOSE 5000

# Set the default command for the container
CMD ["node", "dist/src/main"]