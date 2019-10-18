const csvFilePath = './utill/003.csv'
const csv = require('csvtojson')
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const API = require('./api.js')
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

async function getJSONFile(jsonFile) {
    const File = jsonFile || './utill/zh.js'
    const jsonData = await loadJsonFile(File);
    return jsonData
}

async function writeJSONFiel(fileurl, json) {
    const file = fileurl || './utill/en.js'
    const data = await writeJsonFile(file, json);
    console.log('down')
}

function regxForUrl(url) {
    const regex = new RegExp(/http(s)?:\/\/(www|m).youtube.com\/((channel|c|user)\/)+([a-zA-Z0-9-_.]+)\/?(.*)/, 'g');
    return regex.exec(url);
}

const sendArry = []
const keywords = []
function manyInster() {
    getCsv().then((res) => {
        res.forEach(element => {
            const temp = {
                channelUrl: element['channel'],
                tags: `StreetAddress,${element['Street Address']},PhoneNO.,${element['Phone NO.']},Country,${element['Country']} city,${element['City']}`,
                level: 2,
                platform: 'youtube',
                email: element['Customer Email'],
                fansSum: element['SKU(标明数量)']
            }
            let channelUrl = regxForUrl(temp.channelUrl)
            if (channelUrl) {
                sendArry.push(temp)
            } else {
                keywords.push(temp)
            }
        });
        console.log(sendArry)
        console.log('===================================================')
        console.log(keywords.length)
        // requestAddDict(sendArry)
        
    })
}

async function requestAddDict(json) {
    console.log('===================================================')
    json.forEach( (e)=>{
        API.addDicts(e).then((res)=>{
        }).catch(()=>{
            
        })
    })
}

// getJSONFile('./utill/keywords.js').then(res =>{
//     requestAddDict(res)

// })

async function saveKeyword(json) {
    await writeJSONFiel('./utill/keywords.js', json)
}


manyInster()

module.exports = {
    getCsv,
    // getJSONFile
    writeJSONFiel
}