# Specify the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the source code to the working directory
COPY . .

# Run database migrations
RUN npx knex migrate:latest --esm

# Expose the port that the application will run on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
