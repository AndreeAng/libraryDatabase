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

app.use(express.static('public'));      //uses static style files located in the /public folder

//body-parser module parse incoming request body and store the data in req.body json body-parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())


app.get('/index.hbs', (req, res) => {
    var queries = "SELECT * FROM library.book;SELECT * FROM library.audiobook;SELECT * FROM library.cd";
    let items = []
    let auds = []
    let cd_s = []
    con.query(queries, [3,1], function(err, result, fields){
        if (err) throw err;
        items = result[0]
        auds = result[1]
        cd_s = result[2]
        console.log(items)
        console.log(auds)
        console.log(cd_s)
        res.render('index', {
            items: items,
            auds:auds,
            cd_s:cd_s
        })
    })
});


app.get('/', (req, res) => {
    res.render('index',{
        items: []
    })
})

app.get('/customer.hbs', (req,res) => {
    res.render('customer', {
        items: []
    });
});


app.post('/', (req, res) => {
    let query = "INSERT INTO library.book(ibsn, name, status, author, genre) VALUES ?;";
    data = [
        [req.body.ibsn, req.body.name, req.body.status, req.body.author, req.body.genre]
    ]
    con.query(query, [data], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/')
    })
});


app.post('/audiobook', (req, res) => {
    let query = "INSERT INTO library.audiobook(id, name, status, length, author, narrator, genre) VALUES ?;";
    data = [
        [req.body.id, req.body.name, req.body.status, req.body.length, req.body.author, req.body.narrator, req.body.genre]
    ]
    con.query(query, [data], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/')
    })
});

app.post('/cd', (req, res) => {
    let query = "INSERT INTO library.cd(id, name, status, artist_name, year, genre) VALUES ?;";
    data = [
        [req.body.id, req.body.name, req.body.status, req.body.artist_name, req.body.year, req.body.genre]
    ]
    con.query(query, [data], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/')
    })
});


// port where app is served (port 3000)
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});
