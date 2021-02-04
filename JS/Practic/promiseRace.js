function promiseAll(array) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < array.length; i++) {
            array[i].then((answer) => {
                resolve(answer)

            }).catch((err) => {
                reject(err)
            })
        }

    })
}