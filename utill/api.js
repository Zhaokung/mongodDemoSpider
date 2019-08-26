var request = require("request");
var url = 'https://www.baidu.com'
var options = {
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    qs:
    {
        part: 'id,snippet',
        key: 'AIzaSyCVipmBlDn3AGGYxh4E2aqLvGQk0YhDahI',
        type: 'channel',
        q: '',
        maxResults: '50'
    },
    headers:
    {
        Connection: 'keep-alive',
        Referer: 'commentpicker.com'
    }
};
function getApi() {

    console.log(11)
    request(options, function (error, response, body) {
        console.log(11)
        if (error) {
            console.log(error)
        };
        console.log(body);
    });
}

module.exports = {
    getApi
}