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

# Retry script to wait for the postgres container
COPY wait-for.sh /usr/src/app/wait-for.sh
RUN chmod +x /usr/src/app/wait-for.sh

# Wait for the postgres container to become available
CMD /usr/src/app/wait-for.sh postgres_tt:5432 -- npx knex migrate:latest --esm
CMD [ "npm", "start"]