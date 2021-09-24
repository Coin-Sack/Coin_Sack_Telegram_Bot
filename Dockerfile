# Pull Node JS V14 LTS
FROM node:14

# Set Work Directory
WORKDIR /usr/src/app

# Copy app package.json & package-lock.json
COPY package*.json ./

# Install app dependencies with NPM
RUN npm install

# Copy app files
COPY replies ./
COPY updates ./
COPY .bottoken ./
COPY bot.js ./

# Start App
CMD ["npm", "run", "start"]