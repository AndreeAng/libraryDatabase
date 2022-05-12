//code to connect to the mysql server 
var mysql = require('mysql');

//con short for connect
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PASSWORD GOES HERE",
    multipleStatements:true
}
);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connect to the database!");
});
module.exports = con;