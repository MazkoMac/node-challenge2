const express = require('express');
const geocode = require('./gmaps');
const hbs = require('hbs')
const fs = require('fs')

const rate = geocode.getCurrensy().then((result) => {
    console.log(result)
    return geocode.getExchange()
});

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})


hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
})

// hbs.registerHelper('code', () => {
//     return geocode.getExchange("CAD").then()
// })

app.use((request, response, next) => {
    var time = new Date().toString();
    response.render('maintenance.hbs');

});

app.get('/', (request, response) => {
    response.render('main.hbs', {
        title: 'Main page',
        year: new Date().getFullYear(),
        welcome: 'Hello!'
    });
});

app.get('/currency', (request, response) => {
    var code = ''
    geocode.getExchange().then((result) => {
        code = result.rates
    })
    response.render('currency.hbs', {
        title: 'Currency Page',
        year: new Date().getFullYear(),
        welcome: 'Hello!',
        exchange: code
    });
});


app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        year: new Date().getFullYear(),
        welcome: 'Hello!'
    });
});


app.get('/maintenance', (request, response) => {
    response.render('maintenance.hbs', {
        title: 'Main page',
        year: new Date().getFullYear(),
        welcome: 'Hello!'
    });
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
});



app.listen(8000, () => {
    console.log('Server is up on the port 8000')
});