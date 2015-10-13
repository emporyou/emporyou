var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient, format=require('util').format;
var MJ = require("mongo-fast-join"), mongoJoin = new MJ();
//APP-INIT + DATABASE CONNECTION
var endOfLine = require('os').EOL;

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------ EXAMPLES
app.get('/', function (req, res) {
    res.sendFile('/root/recommerce/frontend/index.html');
});
app.post('/', function (req, res) {res.send('Got a POST request');});
app.put('/user', function (req, res) { res.send('Got a PUT request at /user');});
app.delete('/user', function (req, res) {res.send('Got a DELETE request at /user');});
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------ ADMIN SERVICES
app.get('/SVC/add_merchant', function (req, res) {
  var newmerchantnum=0;
  //copy folder
  //shell execute meteor
  //connecttodb
  MongoClient.connect('mongodb://localhost:'+(3001+(10*newmerchantnum))+'/recommerce', function(err, db) {	
	res.send('Hello World!!');
});});
app.get('/SVC/get_merchant', function (req, res) {var collection=db.collection('simple_limit_skip_query');res.send('Hello World!!');});
app.get('/SVC/set_merchant', function (req, res) {res.send('Hello World!!');});
app.get('/SVC/del_merchant', function (req, res) {res.send('Hello World!!');});
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------ FRONT SERVICES
app.get('/shutdown', function (req, res) {
	process.exit();
});
app.get('/get_productREAL', function (req, res) {
  var m_id=req.query.m_id||-1;
  var p_id=req.query.m_id||-1;
  var geo=req.query.geo||null;
  var cat=req.query.cat||-1;
  var max=req.query.max||-1;
  var min=req.query.min||-1;
  var pgmax=req.query.pgmax||-1;
  var pgnum=req.query.pgnum||-1;
});
app.get('/get_product_image', function (req, res) {
  var m_id=req.query.m_id||-1;
  var p_id=req.query.p_id||-1;
  var v_id=req.query.v_id||-1;
  var isize=req.query.size||'medium';
  var priority=req.query.priority||0;
  var errs=[];
  if(m_id==-1){errs[errs.length]='Parameter m_id is mandatory.\n'}
  if(p_id==-1){errs[errs.length]='Parameter p_id is mandatory.\n'}
  if(errs.length>0){
	  res.set('Content-Type', 'text/plain');
	  res.send(errs);
  }else{
	var p=3001+(m_id*10);
	var q_exp='metadata.productId';var q_field=p_id;
	if(v_id>-1){q_exp='metadata.variantId';q_field=v_id;}
	MongoClient.connect('mongodb://localhost:'+p+'/meteor', function(err, db) {
		db.collection('cfs_gridfs.'+isize+'.files').find({'metadata.productId':p_id}).toArray(function(err,docs){
			if(docs.length>0){if(priority>docs.length){priority=docs.length}
				res.set('Content-Type', docs[priority].contentType);
				db.collection('cfs_gridfs.'+isize+'.chunks').find({'files_id':docs[priority]._id}).toArray(function(err,docs){
					console.log(data);
					res.send(new Buffer(docs[0].data, 'base64'))
				});
			}else{
				 errs[errs.length]='Image not found';
				 res.set('Content-Type', 'text/plain');
				 res.send(errs);
			}
		});
	});
  }
});
app.get('/get_product_imageq', function (req, res) {
  var m_id=req.query.m_id||-1;
  var p_id=req.query.p_id||-1;
  var v_id=req.query.v_id||-1;
  var isize=req.query.size||'medium';
  var priority=req.query.priority||0;
  var errs=[];
  if(m_id==-1){errs[errs.length]='Parameter m_id is mandatory.\n'}
  if(p_id==-1){errs[errs.length]='Parameter p_id is mandatory.\n'}
  if(errs.length>0){
	  res.set('Content-Type', 'text/plain');
	  res.send(errs);
  }else{
	var p=3001+(m_id*10);
	var q_exp='metadata.productId';var q_field=p_id;
	if(v_id>-1){q_exp='metadata.variantId';q_field=v_id;}
	MongoClient.connect('mongodb://localhost:'+p+'/meteor', function(err, db) {
		db.collection('cfs_gridfs.'+isize+'.files').find({'metadata.productId':p_id}).toArray(function(err,docs){
			if(docs.length>0){if(priority>docs.length){priority=docs.length}
				res.set('Content-Type', 'text/plain');
				db.collection('cfs_gridfs.'+isize+'.chunks').find({'files_id':docs[priority]._id}).toArray(function(err,xdocs){
					console.log(data);
					res.send(new Buffer(xdocs[0].data, 'base64'))
				});
			}else{
				 errs[errs.length]='Image not found';
				 res.set('Content-Type', 'text/plain');
				 res.send(errs);
			}
		});
	});
  }
});

app.get('/get_product_imagex', function (req, res) {
  var m_id=req.query.m_id||-1;
  var p_id=req.query.p_id||-1;
  var priority=req.query.priority||0;
  var errs=[];
  if(m_id==-1){errs[errs.length]='Parameter m_id is mandatory.\n'}
  if(p_id==-1){errs[errs.length]='Parameter p_id is mandatory.\n'}
  if(errs.length>0){
	  res.set('Content-Type', 'text/plain');
	  res.send(errs);
  }else{
	var p=3001+(m_id*10);
	MongoClient.connect('mongodb://localhost:'+p+'/meteor', function(err, db) {
		mongoJoin
		.query(
			db.collection("Products"),
			{}, //query statement
			{}, //fields
			{limit: 10000}
		)
		.join({
			joinCollection: db.collection('cfs.Media.filerecord'),
			leftKeys: ["metadata.productId"],
			rightKeys: ["_id"],
			newKey: "image"
		}).exec(function (err, items) {
			console.log(items);
			res.send(items);
		});	
	});
  }
});



app.get('/get_product', function (req, res) {
  var m_id=req.query.m_id||-1;
  var p_id=req.query.m_id||-1;
  var geo=req.query.geo||null;
  var cat=req.query.cat||-1;
  var max=req.query.max||-1;
  var min=req.query.min||-1;
  var pgmax=req.query.pgmax||-1;
  var pgnum=req.query.pgnum||-1;
  res.myxml='<?xml version="1.0" encoding="UTF-8"?><response>';
  res.set('Content-Type', 'text/xml');
  doit(1,function(){doit(2,function(){doit(3,function(){doit(4,function(){doit(5,function(){res.send(res.myxml+'</response>');},res);},res);},res);},res);},res); 
});
doit=function(m_id,onend,res){var p=3001+(m_id*10);
	MongoClient.connect('mongodb://localhost:'+p+'/meteor', function(err, db) {
		db.collection('Products').find({}).toArray(function(err,docs){
			res.myxml+="<merchant_products><name>Merchant "+m_id+"</name><id>"+m_id+"</id><lat>2</lat><lon>2</lon><city>Milano</city>";
			res.myxml+=o2xml('product',docs)+'</merchant_products>';
			db.close();try{onend();}catch(ex){res.send(res.myxml+'</response>');}
});});};
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------- OBJECT 2 XML
o2xml=function(n,o){if(Array.prototype.isPrototypeOf(o)){return a2xml(n,o);}else if(typeof(o)=='object'){return _o2xml(n,o);}else{return v2xml(n,o);}};
_o2xml=function(n,o){var xml='<'+n+'>';var pr;if(n!='hashtags'){
	for(var prop in o){pr=prop;if(!isNaN(prop)){pr='x'+pr}if(Array.prototype.isPrototypeOf(o[prop])){xml+=a2xml(pr,o[prop]);}else if(typeof(o[prop])=='object'){xml+=_o2xml(pr,o[prop]);}else{xml+=v2xml(pr,o[prop]);}}return xml+'</'+n+'>';}else{return ''}};
a2xml=function(n,a){var xml='';for(var i=0;i<a.length;i++){if(Array.prototype.isPrototypeOf(a[i])){xml+=a2xml(n,a[i]);}else if(typeof(a[i]=='object')){xml+=_o2xml(n,a[i]);}else{xml+=v2xml(n,a[i]);}}return xml;};
v2xml=function(n,v){if(typeof(v)=='function'){return ''}var cd=false;if(typeof(v)=='string'){cd=true;}if(cd){return '<'+n+'><![CDATA['+v+']]></'+n+'>';}else{return '<'+n+'>'+v+'</'+n+'>';}};
//---------------------------------------------------------------------------------------------------
app.use(express.static('./frontend'));
var server = app.listen(80,function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});