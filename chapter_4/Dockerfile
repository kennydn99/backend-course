# Use official node.js runtime as a parent image
FROM node:22-alpine

# set working dir in container
WORKDIR /app

# Copy package.json and package.lock.json files into container
COPY package*.json .

# install dependencies
RUN npm install

# copy rest of app code
COPY . .

# Expose the port that the app runs on
EXPOSE 5000

# Define commant to run app
CMD ["node", "./src/server.js"]