const axios = require('axios');
const mongoose = require('mongoose');
const Promise = require("bluebird");
const redis = Promise.promisifyAll(require("redis"));
const Repos = require('../model/Repo');
const configs = require('../configs');

const redisClient = redis.createClient();

mongoose.connect(configs.db.url, configs.db.options).then(async () => {
  await startScript(configs.repos.url);
});

async function startScript(url) {
  try{
      await Repos.deleteMany();
      const data = await requestRepos(url);
      const repos = processRepos(data);

      await saveRepos(repos);
      redisClient.publish('repos', JSON.stringify(repos));
  }catch(e){
    console.log(e)
  }
}

async function requestRepos(url) {
    try {
        const response = await axios.get(url);
        return response.data;
      } catch (e) {
        console.log(e);
    }
}

function processRepos(repos) {
    const mappedRepos = repos.items.map(repo => ({
        id:repo.id,
        name:repo.name,
        html_url:repo.html_url,
        description:repo.description,
        forks:repo.forks,
        open_issues:repo.open_issues,
        language:repo.language,
        size:repo.size,
        watchers:repo.watchers,
        default_branch:repo.default_branch
      }));

      return mappedRepos;
}

async function saveRepos(repos) {
  try{
    for(const repo of repos){
      await (new Repos(repo)).save();
    }
  }catch(e){
    console.log(e);
  }
}