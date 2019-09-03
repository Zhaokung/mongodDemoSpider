const csvFilePath = './utill/TOP5000.csv'
const csv = require('csvtojson')
// const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
var translate = require("translate")


// Async / await usage
function getCsv() {
    return new Promise((resolve, reject) => {
        csv().fromFile(csvFilePath).then(jsonArray => {
            resolve(jsonArray)
        }).catch(err => {
            reject(err)
        })
    })
}

// async function getJSONFile() {
//     const jsonFile = './utill/zh.js'
//     const jsonData = await loadJsonFile(jsonFile);
//     return jsonData
// }

async function writeJSONFiel(json){
    const data =  await writeJsonFile('./utill/en.js', json);
    console.log('down')
}





module.exports = {
    getCsv,
    // getJSONFile
    writeJSONFiel
}