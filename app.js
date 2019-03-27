const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

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


app.use((request, response, next) => {
    var time = new Date().toString();
    var log = `${time}: ${request.method} ${request.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to log message');
        }
    })

});

app.get('/', (request, response) => {
    response.send({
        name: 'Your Name',
        school: [
            'BCIT',
            'SFU',
            'UBC'
        ]
    })
});

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        year: new Date().getFullYear(),
        welcome: 'Hello!'
    });
});

app.listen(8000, () => {
    console.log('Server is up on the port 8000')
});