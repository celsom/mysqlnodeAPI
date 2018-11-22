var http = require("http");
const cors = require('cors');
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'root', //mysql database user name
  password : '', //mysql database password
  database : 'test' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

app.use(cors());
app.options('*', cors());

//create app server
var server = app.listen(3000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

//rest api to get all customers
app.get('/customer', function (req, res) {
   connection.query('select * from customer', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//rest api to get a single customer data
// app.get('/customer/:id', function (req, res) {
//    connection.query('select * from customers where Id=?', [req.params.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });


app.get('/customer/:Id', (request, response) => {
    const Id = request.params.Id;
 
    connection.query('SELECT * FROM customer WHERE Id = ?', Id, (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});



//rest api to create a new customer record into mysql database
app.post('/customer', function (req, res) {
   var params  = req.customer;
   var body  = req;
   console.log(body);
   console.log(params);
   //   connection.query('INSERT INTO customer SET ?', params, function (error, results, fields) {
  	//   if (error) throw error;
  	//   res.end(JSON.stringify(results));
  	// });
});

//rest api to update record into mysql database
// app.put('/customer/:Id', (req, res) =>{
      
//    connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  response.send('User updated successfully.');
// 	});
// });

app.put('/customer/:Id', (request, response) => {
    const Id = request.params.Id;
 
    connection.query('UPDATE customer SET ? WHERE Id = ?', [request.body, Id], (error, result) => {
        if (error) throw error;
 
        response.send('User updated successfully.');
    });
});


//rest api to delete record from mysql database
// app.delete('/customer', function (req, res) {
//    console.log(req.body);
//    connection.query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end('Record has been deleted!');
// 	});
// });

app.delete('/customer/:Id', (request, response) => {
    const Id = request.params.Id;
 
    connection.query('DELETE FROM customer WHERE Id = ?', Id, (error, result) => {
        if (error) throw error;
 
        response.send('User deleted.');
    });
});