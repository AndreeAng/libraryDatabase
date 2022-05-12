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
    let query = "SELECT * FROM library.book";
    let query_audiobook = "SELECT * FROM library.audiobook";
    let items = []
    let auds = []
    con.query(query, (err, result) => {
        if (err) throw err;
        items = result
        console.log(items)
        res.render('index', {
            items: items
        })
    })
    // con.query(query_audiobook, (err, result) => {
    //     if (err) throw err;
    //     auds = result
    //     console.log(auds)
    //     res.render('index', {
    //         auds: auds
    //     })
    // })
});

// app.get('/index.hbs', (req, res) => {
//     let query = "SELECT * FROM library.audiobook";
//     let auds = []
//     con.query(query, (err, result) => {
//         if (err) throw err;
//         auds = result
//         console.log(auds)
//         res.render('index', {
//             auds: auds
//         })
//     })
// });

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


// app.get('/', (req, res) => {
//     //serves the body of the page to the container
//     let query = "SELECT * FROM library.book";
//     let items = [];
//     con.query(query, (err, result) => {
//         if (err) throw err;
//         items = result
//         console.log(items)
//         res.redirect('/customer')
//     })
// });

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


// port where app is served (port 3000)
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});
