const csvFilePath = './utill/浩方2.csv'
const csv = require('csvtojson')
// const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
var translate = require("translate")


// Async / await usage
function getCsv() {
    return new Promise((resolve, reject) => {
        csv().fromFile(csvFilePath).then(jsonArray => {
            // console.log(jsonArray)
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



getCsv().then((res)=>{
    const sendArry = []
    res.forEach(element => {
        const temp = {
            channelUrl : element['链接'],
            tags: `${element['视频类别'].split(/\s|,|、/).toString()},负责的产品,${element['负责产品'].split(/\s|,|、/).toString()}`
        }
        if(temp.channelUrl){
            sendArry.push(temp)
        }
    });
    console.log(sendArry)
})

module.exports = {
    getCsv,
    // getJSONFile
    writeJSONFiel
}