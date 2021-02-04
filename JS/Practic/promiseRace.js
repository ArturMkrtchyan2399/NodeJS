function promiseRace(array) {
    return new Promise((resolve, reject) => {
        let isRejected = false;
        let isResolved = false;
        for (let i = 0; i < array.length; i++) {
            array[i].then((answer) => {
                if (!isResolved) {
                    isResolved = true;
                    resolve(answer)
                }
            }).catch((err) => {
                if (!isRejected) {
                    isRejected = true
                    reject(err)
                }

            })
        }

    })
}