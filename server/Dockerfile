FROM node:18.15.0
ENV NODE_ENV=production
WORKDIR /server
COPY package.json .
COPY package.lock.json .
RUN npm install 
COPY . .
# EXPOSE 5001
CMD ['npm','run','dev']

