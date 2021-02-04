function promiseRace(array) {
    return new Promise((resolve, reject) => {
        let isResolved = false;
        for (let i = 0; i < array.length; i++) {
            array[i].then((answer) => {
                if (!isResolved) {
                    isResolved = true;
                    resolve(answer)
                }
            }).catch((err) => {
                if (!isResolved) {
                    isResolved = true;
                    reject(err)
                }
            })
        }

    })
}