FROM ghcr.io/puppeteer/puppeteer:latest

USER root
WORKDIR /app

# प्रोजेक्ट की फाइल्स कॉपी करना
COPY package*.json ./
RUN npm install

COPY . .

# फर्जी पोर्ट ओपन रखना ताकि Render खुश रहे
EXPOSE 10000

CMD ["node", "index.js"]
