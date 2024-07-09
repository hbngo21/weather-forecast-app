const axios = require('axios')

exports.handler = async (event) => {
    const apiPath = event.apiPath;
    let response
    if (apiPath === '/weather') {
        const lat = event.parameters[0].value
        const long = event.parameters[1].value
        response = await getWeather(lat, long, 1)
    }
    const result = {
        "messageVersion": "1.0",
        "response": {
            "actionGroup": event.actionGroup,
            "apiPath": event.apiPath,
            "httpMethod": event.httpMethod,
            "httpStatusCode": 200,
            "responseBody": {
                "application/json": {
                    "body": response
                }
            }
        },
        "sessionAttributes": {},
        "promptSessionAttributes": {}
    }
    console.log(result)
    return result;
}

async function getWeather(lat, long, days) {
    const url = `http://explorecalifornia.org/api/weather.php?lat=${lat}&lng=${long}&qty=1&unit=C`
  
    return axios.get(url).then((response) => response.data[0].forecast[days - 1])
}
