/////////test code to make sure it runs
// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
// const server = http.createServer((req,res) =>{
//     res.statusCode = 200;
//     res.setHeader('Content-type', 'text/plain');
//     res.end('Hello World');
// });
// server.listen(port, hostname, () => {
//     console.log('server running at http://${hostname}:${port}/')
// });

///////mysql connection
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PUT UR PASSWORD HERE I TOOK MINE OUT TO COMMIT THIS"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO library.customer (library_card_number, username, password, first_name, last_name, email, items_checked_out, address_number, address_street, address_city, address_state, address_zipcode) VALUES (1232356,'katiet', 'password', 'katie','tooher','katie2er@gmail.com', 5,1234,'happy st','milwaukee','wi',53227)";
  con.query(sql,function(err,result){
      if(err) throw err;
      console.log("Result: " + result);
  })
});