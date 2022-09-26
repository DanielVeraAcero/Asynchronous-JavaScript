const cows =17;

const countCows = new Promise(function(resolve, reject){
    if (cows > 10){
        resolve(`We have ${cows} cows on the far,`)
    } else {
        reject('There is no cowa on the farm')
    }
})

countCows.then((result) =>{
    console.log(result);
}).catch((error)=> {
    console.log(error)
}).finally(()=> console.log ('Finally'));
