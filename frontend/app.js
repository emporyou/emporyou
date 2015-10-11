var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient, format=require('util').format;
var builder = require('xmlbuilder');
//APP-INIT + DATABASE CONNECTION
var Gdb=null;
var merchant=null;



DBreconnnect=function(){
	//DATABASE UTILS
	MongoClient.connect('mongodb://localhost:27017/recommerce', function(err, db) {
	Gdb=db;
	merchant=db.collection('merchant');
	// Create a collection we want to drop later
	var collection = db.collection('simple_limit_skip_query');
	// Insert a bunch of documents for the testing
	collection.insertMany([{a:1, b:1}, {a:2, b:2}, {a:3, b:3}], {w:1}, function(err, result) {
		test.equal(null, err);
    // Peform a simple find and return all the documents
		collection.find({})
			.skip(1).limit(1).project({b:1}).toArray(function(err, docs) {
        test.equal(null, err);
        test.equal(1, docs.length);
        test.equal(null, docs[0].a);
        test.equal(2, docs[0].b);
        db.close();
    });
  });
});
	
};

app.get('/', function (req, res) {
  res.send('Hello World!!');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
app.put('/user', function (req, res) { res.send('Got a PUT request at /user');});
app.delete('/user', function (req, res) {res.send('Got a DELETE request at /user');});
//--------------------------------------
//--------------------------------------
//--------------------------------------
app.get('/SVC/add_merchant', function (req, res) {
  var newmerchantnum=0;  
  //copy folder
  //shell execute meteor
  //connecttodb
  MongoClient.connect('mongodb://localhost:'+(3001+(10*newmerchantnum))+'/recommerce', function(err, db) {
	
	res.send('Hello World!!');
});});
app.get('/SVC/get_merchant', function (req, res) {
  var collection=db.collection('simple_limit_skip_query');
  
  res.send('Hello World!!');
  
});
app.get('/SVC/set_merchant', function (req, res) {
  res.send('Hello World!!');
});
app.get('/SVC/del_merchant', function (req, res) {
  res.send('Hello World!!');
});
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

app.get('/get_product', function (req, res) {
  var m_id=req.query.m_id||-1;
  var p_id=req.query.m_id||-1;
  var geo=req.query.geo||null;
  var cat=req.query.cat||-1;
  var max=req.query.max||-1;
  var min=req.query.min||-1;
  var pgmax=req.query.pgmax||-1;
  var pgnum=req.query.pgnum||-1;
});
  
app.get('/get_product14', function (req, res) {
  var m_id=req.query.m_id||-1;
  var p_id=req.query.m_id||-1;
  var geo=req.query.geo||null;
  var cat=req.query.cat||-1;
  var max=req.query.max||-1;
  var min=req.query.min||-1;
  var pgmax=req.query.pgmax||-1;
  var pgnum=req.query.pgnum||-1;
  var results={m1:null,m2:null,m3:null,m4:null,m5:null};
  var P;var p;var xml='<?xml version="1.0" encoding="UTF-8"><response>';
  MongoClient.connect('mongodb://localhost:3011/meteor', function(err, db) {
	P=db.collection('Products');
	P.find({}).toArray(function(err, docs) {
	xml+=prodstoxml(docs);
		try{
			MongoClient.connect('mongodb://localhost:3021/meteor', function(err, db) {
				P=db.collection('Products');
				P.find({}).toArray(function(err, docs) {
				xml+=prodstoxml(docs);
				res.send(xml+'</response>');
			});
			});
		}catch(ex){res.send(xml+'</response>');}
    });
  });
});
prodstoxml=function(docs){
	var xml='';
	for(var p=0;p<docs.length;p++){
		xml+='<product>';
		xml+=xnl('description',docs[p].description);
		xml+='</product>\n';
	}
	return xml;
};
xnl=function(n,d){return '<'+n+'>'+d+'</'+n+'>';};

app.use(express.static('.'));
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});