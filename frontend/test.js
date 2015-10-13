var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient, format=require('util').format;
var MJ = require("mongo-fast-join"), mongoJoin = new MJ();
var endOfLine = require('os').EOL;
//---------------------------------------------------------------------------------------------------
app.get('/', function (req, res) {
  	MongoClient.connect('mongodb://localhost:27017/meteor', function(err, db) {
	mongoJoin
		.query(
			db.collection("cfs.Media.filerecord"),
			{},
			{}
		)
		.join({
			joinCollection: db.collection('Products'),
			leftKeys: ["_id"],
			rightKeys: ["metadat.productId"],
			newKey: "image"
		}).exec(function (err, items) {
			res.set('Content-Type', 'text/plain');
			res.send(items);
			//res.send('<?xml version="1.0" encoding="UTF-8"?><response>'+o2xml('item',items)+'</response>');
		});
	});
});




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