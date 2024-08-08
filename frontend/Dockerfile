FROM node:18-alpine

WORKDIR /app

#ARGS
ARG VITE_BACKEND_API

COPY . .

# Ensure the entrypoint script is executable
RUN chmod +x ./exportenv.sh

# Export the Args to .env file
RUN ./exportenv.sh

RUN npm install

RUN npm i -g serve

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]