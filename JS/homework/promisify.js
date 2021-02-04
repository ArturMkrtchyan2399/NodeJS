function myPromisify(func){
    return (...args) => {
        return new Promise((resolve,reject) => {
            function customCallback(err,...result){
                if(err){
                    return reject(err)
                }
                return resolve(result.length === 1 ? result[0] : result)
            }
            args.push(customCallback)
            func(...args)
        })
    }
}


