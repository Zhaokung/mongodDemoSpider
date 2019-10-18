const csvFilePath = './utill/003.csv'
const csv = require('csvtojson')
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const API = require('./api.js')
var translate = require("translate")


// 写文件
async function writeJSONFiel(fileurl, json) {
    const file = fileurl || './utill/en.js'
    const data = await writeJsonFile(file, json);
    console.log('down')
}
// 读json 文件
async function getJSONFile(jsonFile) {
    const File = jsonFile || './utill/zh.js'
    const jsonData = await loadJsonFile(File);
    return jsonData
}
// 读取csv
function getCsv() {
    return new Promise((resolve, reject) => {
        csv().fromFile(csvFilePath).then(jsonArray => {
            resolve(jsonArray)
        }).catch(err => {
            reject(err)
        })
    })
}

//  校验 YouTube 网址
function regxForUrl(url) {
    const regex = new RegExp(/http(s)?:\/\/(www|m).youtube.com\/((channel|c|user)\/)+([a-zA-Z0-9-_.]+)\/?(.*)/, 'g');
    return regex.exec(url);
}

// 向目标添加内容
async function requestAddDict(json) {
    console.log('===================================================')
    json.forEach((e) => {
        API.addDicts(e).then((res) => {
        }).catch(() => {
        })
    })
}

async function saveKeyword(json) {
    await writeJSONFiel('./utill/keywords.js', json)
}

// 阅读json 文件并存库
function readJSONreq(fileurl) {
    const file = fileurl || './utill/keywords.js'
    getJSONFile(file).then(res => {
        // console.log(res)
        requestAddDict(res)
    })
}


const sendArry = []
const keywords = []
async function getCsvTranDict() {
    const Csvres = await getCsv()
    Csvres.forEach(element => {
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
    return true
}

function manyInster() {
    getCsvTranDict().then((res) => {
        // requestAddDict(sendArry)
        // saveKeyword(keywords)
        // readJSONreq('./utill/keywords.js')
    })
}

manyInster()

module.exports = {
    getCsv,
    // getJSONFile
    writeJSONFiel
}