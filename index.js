const express = require('express');
var hbs = require('express-handlebars');    //loads handlebars module
const bodyParser = require("body-parser");

const con = require('./models/taskModel');

const app = express();

//sets the app to use handlebars engine
app.set('view engine', 'hbs');


// //handlebars html templates stored in views/layouts folder
app.engine('hbs', hbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.use(express.static('public'));

//body-parser module parse incoming request body and store the data in req.body
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

app.get('/', (req, res) => {
    //serves the body of the page to the container
    res.render('index', {
        items: []
    });
});

app.post('/', (req, res) => {
    console.log(req.body)
    res.redirect('/')
});

// port where app is served (port 3000)
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});