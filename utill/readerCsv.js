const csvFilePath = './utill/TOP5000.csv'
const csv = require('csvtojson')
// Async / await usage
function getCsv() {
    return new Promise((resolve,reject) =>{
        csv().fromFile(csvFilePath).then(jsonArray =>{
            resolve(jsonArray)
        }).catch(err=>{
            reject(err)
        })
    })
}

module.exports = {
    getCsv
}