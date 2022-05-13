const express = require('express');
var hbs = require('express-handlebars');    //loads handlebars module
const bodyParser = require("body-parser");

const con = require('./models/taskModel');

const app = express();

//sets the app to use handlebars engine
app.set('view engine', 'hbs');


// //handlebars html templates stored in views/layouts folder
app.engine('hbs', hbs.engine({
    helpers: {
        isCompleted: function (status) {
            if (status == "available") {
                return true
            } else {
                return false
            }
        },
    },
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
    var queries = "SELECT * FROM library.book;SELECT * FROM library.audiobook;SELECT * FROM library.cd;SELECT * FROM library.customer";
    let items = []
    let auds = []
    let cd_s = []
    let customers = []
    con.query(queries, [4,1], function(err, result, fields){
        if (err) throw err;
        items     = result[0]
        auds      = result[1]
        cd_s      = result[2]
        customers = result[3]
        // console.log(items)
        // console.log(auds)
        // console.log(cd_s)
        // console.log(customers)
        res.render('index', {
            items: items,
            auds:auds,
            cd_s:cd_s,
            customers:customers
        })
    })
});

app.get('/customer.hbs', (req, res) => {
    var queries = "SELECT * FROM library.book;SELECT * FROM library.audiobook;SELECT * FROM library.cd;SELECT * FROM library.items_checkout_history";
    let items = []
    let auds = []
    let cd_s = []
    let checkout_items = []
    con.query(queries, [4,1], function(err, result, fields){
        if (err) throw err;
        items          = result[0]
        auds           = result[1]
        cd_s           = result[2]
        checkout_items = result[3]
        // console.log(items)
        // console.log(auds)
        // console.log(cd_s)
        // console.log(customers)
        res.render('customer', {
            items:items,
            auds:auds,
            cd_s:cd_s,
            checkout_items:checkout_items
        })
    })
});



//code to checkout an item from clicking the Check Out buttons in the customer view
app.get('/checkout/:id/:item_type', (req, res) => {
    console.log(req.params.id);
    console.log("check outfunc running");
    var custid = parseInt(Math.random() * 200);
    let checkout_items = []
    let query = "INSERT INTO library.items_checkout_history VALUES ('" + req.params.id + "', " + custid.toString() +", 05-13-2022 , '" + req.params.item_type + "');UPDATE library." + req.params.item_type + " SET status='unavailable' WHERE id=" + req.params.id + ";SELECT * FROM library.items_checkout_history";
    con.query(query,[3,1], function(err, result, fields){
        if (err) throw err;
        res.redirect('/customer.hbs')
        // res.render('customer', {
        //     checkout_items:checkout_items,
        // })
    })
});

app.get('/checkin/:id/:item_type', (req, res) => {
    console.log(req.params.id);
    console.log("checkin func running");
    //var custid = Date.prototype.getHours() * (Math.random() * 10);
    let query = "DELETE FROM library.items_checkout_history WHERE id=" + req.params.id+";UPDATE library." + req.params.item_type + " SET status='available' WHERE id=" + req.params.id;
    con.query(query, (err, result) =>{
        if (err) throw err;
        res.redirect('/customer.hbs')
    })
});

//for books
app.get('/:status/:id', (req, res) => {
    console.log("is it in here?")
    let query = "UPDATE library.book SET status='" + req.params.status + "' WHERE id=" + req.params.id
    con.query(query, (err, result) => {
        if (err) throw err;
        //console.log(result)
        res.redirect('/index.hbs')
    })
});

//for audiobooks
// app.get('/:status/:id', (req, res) => {
//     console.log(req.params)
//     let query = "UPDATE library.audiobook SET status='" + req.params.status + "' WHERE id=" + req.params.id
//     con.query(query, (err, result) => {
//         if (err) throw err;
//         console.log(result)
//         console.log('here?')
//         res.redirect('/index.hbs')
//     })
// });

app.get('/test/:library_card_number', (req, res) => {
    console.log(req.params)
    let query = "DELETE FROM library.customer WHERE library_card_number=" + req.params.library_card_number;
    con.query(query, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/index.hbs')
    })
});

//this is the default landing page -- idk how to change this to be index.hbs
app.get('/', (req, res) => {
    res.redirect('/index.hbs')
})


app.post('/', (req, res) => {
    let query = "INSERT INTO library.book(id, name, status, author, genre, item_type) VALUES ?;";
    data = [
        [req.body.id, req.body.name, req.body.status, req.body.author, req.body.genre, req.body.item_type]
    ]
    con.query(query, [data], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/index.hbs')
    })
});


app.post('/audiobook', (req, res) => {
    let query = "INSERT INTO library.audiobook(id, name, status, length, author, narrator, genre, item_type) VALUES ?;";
    data = [
        [req.body.id, req.body.name, req.body.status, req.body.length, req.body.author, req.body.narrator, req.body.genre, req.body.item_type]
    ]
    con.query(query, [data], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/index.hbs')
    })
});

app.post('/cd', (req, res) => {
    let query = "INSERT INTO library.cd(id, name, status, artist_name, year, genre, item_type) VALUES ?;";
    data = [
        [req.body.id, req.body.name, req.body.status, req.body.artist_name, req.body.year, req.body.genre, req.body.item_type]
    ]
    con.query(query, [data], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/index.hbs')
    })
});

app.post('/customer', (req, res) => {
    let query = "INSERT INTO library.customer(library_card_number, username, password, first_name, last_name, email, items_checked_out, address_number, address_street, address_city, address_state, address_zipcode) VALUES ?;";
    data = [
        [req.body.library_card_number, req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.items_checked_out, req.body.address_number, req.body.address_street ,req.body.address_city ,req.body.address_state, req.body.address_zipcode]
    ]
    con.query(query, [data], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/index.hbs')
    })
});


// port where app is served (port 3000)
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});