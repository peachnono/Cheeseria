# Build frontend
FROM node:16 AS frontend
WORKDIR /build/frontend
COPY ./frontend/ ./
RUN npm install
RUN npm run build

# Build backend
FROM node:16 AS backend
WORKDIR /app
COPY --from=frontend /build/frontend/build/ ./frontend/build/
WORKDIR /app/backend
COPY ./backend ./
RUN npm install
RUN npx tsc 

# Run app
EXPOSE 5000
CMD ["npm", "start"]
