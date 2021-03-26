const Repos = require('../model/Repo');

const repoService = (cache) => {
    return {
        getRepos: async (req, res) => {
            const cachedRepos = await cache.getAsync('repos');
            if(cachedRepos){
                res.send({
                    data: JSON.parse(cachedRepos)
                })
            }else{
                const repos = await Repos.find();
                await cache.setAsync('repos',JSON.stringify(repos));
                res.send({
                    data:repos
                })
            }
        }
    }
}

module.exports = repoService;