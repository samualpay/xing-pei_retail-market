# xing-pei_retail-market

## DEMO Website
- [website](https://xing-pei-retail-market.herokuapp.com/)
- [swagger](https://xing-pei-retail-market.herokuapp.com/api/api-docs)

## Run at local
### Using NPM
1. install mongo
2. setting mongo port 27017
3. create user "root:root" AuthDB:"admin"
4. run command
```
npm install
npm run heroku-postbuild
npm start
```

### Using Docker-Compose
1. run command
```
docker-compose up -d
```

### Open Local website
1. open link [http://localhost:5000](http://localhost:5000)

### Note
1. This project using port 5000 for website and port 27017 for mongodb