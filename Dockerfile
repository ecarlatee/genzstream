FROM node:20-alpine

WORKDIR /app

# Copy application files
COPY package.json ./
COPY server.js ./
COPY catalogue.json ./
COPY index.html ./
COPY assets/ ./assets/

# Port exposure
EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "server.js"]
