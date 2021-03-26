const express = require('express')
const mongoose = require('mongoose')
const Promise = require("bluebird");
const redis = Promise.promisifyAll(require("redis"));
const configs = require('./configs');

const redisClient = redis.createClient();
const redisListener = redis.createClient();
redisListener.subscribe('repos');

const repoService = require('./service/repos-service')(redisClient);

const app = express()

app.use(express.json())

app.get('/repos', repoService.getRepos);
redisListener.on('message', (channel, message) => {
  redisClient.setAsync('repos', message);
});

mongoose.connect(configs.db.url, configs.db.options)
  .then(() => {
    console.log('MongoDB is connected');
    app.listen(configs.env.PORT, () => {
      console.log(`Server is running ${configs.env.PORT}`);
    });
  })
  .catch(err => console.log(err));