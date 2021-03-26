const fs = require('fs');

module.exports = (root) => {
    return async  (req,res, next) => {
        const filePath = __dirname + root + req.url; 
        if(fs.existsSync(filePath)){
            res.sendFile(filePath);
        }else{
            next();
        }
    }
}