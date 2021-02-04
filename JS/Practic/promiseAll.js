function promiseAll(array) {
    return new Promise((resolve,reject) =>{
        let result = []
        let completed = 0
        let isRejected = false
        for(let i = 0;i < array.length;i++){
            array[i].then((answer) => {
                if(!isRejected){
                    result[i] = answer
                    completed+=1
                }

                if(completed === array.length){
                    resolve(result)
                }
            }).catch((err) => {
                isRejected = true;
                reject(err)
            })
        }

    })
}

const promise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise 1")
    }, 10000);
})
const promise2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        reject("Promise 2")
    }, 1000);
})
const promise3 = new Promise((resolve,reject) => {
    setTimeout(() => {
        reject("Promise 3")
    }, 100);
})
const promise4 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise 4")
    }, 100);
})
promiseAll([promise1,promise2,promise3,promise4])
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })




