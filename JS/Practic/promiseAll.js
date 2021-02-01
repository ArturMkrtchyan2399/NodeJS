function promiseAll(array) {
    return new Promise((resolve,reject) =>{
        let result = []
        let completed = 0
        for(let i = 0;i < array.length;i++){
            array[i].then((answer) => {
                result[i] = answer
                completed+=1
                if(completed === array.length){
                    resolve(result)
                }
            }).catch((err) => {
                reject(err)
            })
        }

    })
}

const promise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise 1")
    }, 1000);
})
const promise2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise 2")
    }, 1000);
})
const promise3 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise 3")
    }, 1000);
})
const promise4 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise 4")
    }, 1000);
})
promiseAll([promise1,promise2,promise3,promise4])
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })




