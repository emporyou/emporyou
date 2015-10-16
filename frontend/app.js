var express = require('express');
var app = express();
var format=require('util').format;
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
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
  if(errs.length>0){res.set('Content-Type', 'text/plain');res.send(errs);}
  else{var p=3001+(m_id*10);
	var q_exp='metadata.productId';var q_field=p_id;
	//if(v_id!=-1){q_exp='metadata.variantId';q_field=v_id;}
	MongoClient.connect('mongodb://localhost:'+p+'/meteor', function(err, db) {
		var projection={};
		projection['copies.'+isize+'.key']=1;		
		db.collection('cfs.Media.filerecord').find({'metadata.productId':q_field}).toArray(function(err,d1){
		  if(d1.length>0){console.log(d1[0].copies[isize].key);
			  db.collection('cfs_gridfs.'+isize+'.files').find({'_id':ObjectID(d1[0].copies[isize].key)}).toArray(function(err,d2){
				if(d2.length>0){
					res.set('Content-Type', d2[0].contentType);
					db.collection('cfs_gridfs.'+isize+'.chunks').find({'files_id':d2[0]._id}).toArray(function(err,d3){
						if(d3.length>0){
							res.set('Content-Type', d2[0].contentType);
							res.send(new Buffer(d3[0].data.buffer, 'binary'))
						}else{servenoimage(res);}		
					});
				}else{servenoimage(res);}
			});
		  }else{servenoimage(res);}		  
		});		
	});
  }
});

app.get('/get_product', function (req, res) {
  var m_id=req.query.m_id||-1;
  var p_id=req.query.p_id||-1;
  var geo=req.query.geo||null;
  var cat=req.query.cat||-1;
  var max=req.query.max||-1;
  var min=req.query.min||-1;
  var pgmax=req.query.pgmax||-1;
  var pgnum=req.query.pgnum||-1;
  var city=req.query.city||-1;
  res.myxml='<?xml version="1.0" encoding="UTF-8"?><response>';
  res.set('Content-Type', 'text/xml');
  var q={};
  console.log(p_id);
  if(p_id!=-1){q={_id:p_id}}
	if(city!=-1){
		
	}	
  if(m_id!=-1){
	  doit(m_id,function(){res.send(res.myxml+'</response>');},res,q);
  }else{
  doit(1,function(){doit(2,function(){doit(3,function(){doit(4,function(){doit(5,function(){res.send(res.myxml+'</response>');},res,q);},res,q);},res,q);},res,q);},res,q); 
}});
var mmss=[{n:'La Bottega del Fumetto'},{n:'Panificio Beretta'},{n:'Shoppy'},{n:'Estetica Biraghi s.r.l'},{n:'Ferramenta da Luigi'}];
doit=function(m_id,onend,res,q){var p=3001+(m_id*10);
	MongoClient.connect('mongodb://localhost:'+p+'/meteor', function(err, db) {
		db.collection('Products').find(q).toArray(function(err,docs){
			var x="<merchant><name>Merchant "+mmss[m_id-1].n+"</name><id>"+m_id+"</id><lat>2</lat><lon>2</lon><city>Milano</city></merchant></product>";
			res.myxml+=o2xml('product',docs).replace(/<\/product>/g,x);
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
serve404=function(res){
	
};
servenoimage=function(res){
	res.sendFile('/root/recommerce/frontend/img/default-product.png');
};
//---------------------------------------------------------------------------------------------------
app.use(express.static('./frontend'));
var server = app.listen(80,function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
setInterval(beAlive,10000);
function beAlive(){console.log('111ijrirjir')}