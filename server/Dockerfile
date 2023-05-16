FROM node:18.15.0
WORKDIR /usr/code
COPY package.json . 
RUN npm install 
COPY . .
EXPOSE 5001
CMD ['npm','run','start:prod']
ENV NODE_ENV=production

WORKDIR /application

COPY ['package.json','package-lock.json*','./']


COPY . .

CMD ['node','server.js']