# 使用官方的 node
##FROM node:10.15.3-alpine
FROM node:12.16.1-alpine3.9

# 工作目錄
WORKDIR /opt/api
COPY . .
# 安裝 node.js module
RUN npm cache clean -f
RUN npm install --production
RUN npm run heroku-postbuild

CMD ["npm","start"]

