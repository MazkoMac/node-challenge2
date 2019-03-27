const request = require('request');

var getCurrensy = () => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://restcountries.eu/rest/v2/name/Canada?fullText=true',
            json: true
        }, (error, response, body) => {
            console.log(body)
            if (error) {
                reject('Cannot connect to Google Maps');
            } else if (body.status == 'ZERO_RESULTS') {
                reject('Cannot find requested address');
            } else if (body.status == 'OK') {
                resolve({
                    code: body[0].currencies[code]
                });

            }
        });


    });
};



var code = getCurrensy.code



var getExchange = () => {
    return new Promise((resolve, reject) => {
        request({
            url: "https://api.exchangeratesapi.io/latest?symbols=CAD&base=USD",
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Cannot connect to Exchange rate App');
            } else if (body.cod !== 200) {
                reject('Cannot find Country Code');
            } else if (body.cod === 200) {
                resolve({
                    rates: body.rates[CAD]
                });
            }
        });
    });
};

console.log('https://restcountries.eu/rest/v2/name/Canada?fullText=true')
console.log("https://api.exchangeratesapi.io/latest?symbols=" + code + "&base=USD")
var rates = getExchange.rates

module.exports = {
    getCurrensy,
    getExchange
};