var format=require('util').format;var endOfLine = require('os').EOL;
var replaceStream = require('replacestream');var fs=require('fs'),path=require("path");
var MongoClient = require('mongodb').MongoClient;var ObjectID = require('mongodb').ObjectID;
var express = require('express');var app = express();
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.enable('strict routing');
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended:true}));
app.use(session({secret:'logic is red',store:new MongoStore({url: 'mongodb://localhost:27017/mongostore' })}));
app.use(passport.initialize());
app.use(passport.session());
//APP-INIT + DATABASE CONNECTION

var MERCHANTCHACHE=[];
var mime={mp3:'audio/mpeg',wav:'audio/x-wav',html:'text/html',htm:'text/html',xml:'text/xml',txt:'text/plain',js:'text/javascript'};
var HOST='http://emporyou.com';
//var HOST='http://localhost:1024';
var MONGOURL='mongodb://localhost:27017/emporyou';

var TWITTER_CONSUMER_KEY='P4bDNt8Umk1k1YVMXBRf7EfFW';var TWITTER_CONSUMER_SECRET='Wlibc4hVhUfA21ZPMUZqJ7GuFDICTj7bQfkno3WpB5yRFneCmn';
var FACEBOOK_APP_ID='460219550850496';var FACEBOOK_APP_SECRET='92c6695c348098685ad74418946b9c8d';
var GOOGLE_CLIENT_ID='1090089087428-k638posl6k8nkgl140bj4ebecrfhmopo.apps.googleusercontent.com';var GOOGLE_CLIENT_SECRET='iejkVQ8FcjXguhQwzgcANM5T';
var GOOGLE_API_SCOPE = ['profile','email'];
var SHOPIFY_SHOP_SLUG /*e.g. my-shop-name.myshopify.com ... the `my-shop-name` part*/
var SHOPIFY_CLIENT_ID=''; 
var SHOPIFY_CLIENT_SECRET='';

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------ LOGIN and PASSPORT CONFIGURATION
var User={findOrCreate:function(a,next){
		if(!a.displayName){a.displayName='utente anonimo';}
      MongoClient.connect(MONGOURL,function(err,db){if(err){db.close();next(err,null)}else{
			db.collection('user').find(a).toArray(function(err,rows){if(err){db.close();next(err,null)}else{
				if(rows.length<1){var uid=new ObjectID();a._id=uid;
					db.collection('user').insert(a,function(err){db.close();if(err){next(err,null)}else{next(false,a);
				}});}else{db.close();next(false,rows[0]);}
}});}});},findById:function(a,next){
      MongoClient.connect(MONGOURL,function(err,db){if(err){db.close();next(err,null)}else{
			db.collection('user').find({_id:a}).toArray(function(err,rows){if(err){db.close();next(err,null)}else{
				if(rows.length<1){db.close();next(err,null);}
				else{db.close();next(false,rows[0]);}
}});}});},
};

var BasicStrategy=require('passport-http').BasicStrategy;
var DigestStrategy=require('passport-http').DigestStrategy;
var ShopifyStrategy=require('passport-shopify').Strategy;
var GoogleStrategy0=require('passport-google-oauth').Strategy;
var GoogleStrategy=require('passport-google-oauth2').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;
var TwitterStrategy=require('passport-twitter').Strategy;

passport.serializeUser(function(user,cb){cb(null,user);});passport.deserializeUser(function(obj,cb){cb(null, obj);});
//---------------------------------------------------------------------------------------------------- G O O G L E
passport.use(new GoogleStrategy({clientID:GOOGLE_CLIENT_ID,clientSecret:GOOGLE_CLIENT_SECRET,callbackURL:HOST+"/auth/google/callback"},
  function(accessToken,refreshToken,profile,done){profile.googleId=profile.id;profile.id=false;User.findOrCreate(profile,function(err,user){return done(err,user);});}));
app.get('/auth/google',passport.authenticate('google',{scope:GOOGLE_API_SCOPE}));
app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:HOST+'/login.html?failed=failed'}),function(req,res){/*Successful*/res.redirect('/home.html');});
//---------------------------------------------------------------------------------------------------- F A C E B O O K
passport.use(new FacebookStrategy({clientID:FACEBOOK_APP_ID,clientSecret:FACEBOOK_APP_SECRET,callbackURL:HOST+"/auth/facebook/callback",enableProof:false},
  function(accessToken,refreshToken,profile,done){User.findOrCreate({facebookId:profile.id},function(err,user){return done(err,user);});}));
app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect:HOST+'/login.html?failed=failed'}),function(req, res) {/*Successful*/res.redirect('/home.html');});
//---------------------------------------------------------------------------------------------------- T W I T T E R
passport.use(new TwitterStrategy({consumerKey:TWITTER_CONSUMER_KEY,consumerSecret:TWITTER_CONSUMER_SECRET,callbackURL:HOST+"/auth/twitter/callback"},
  function(token,tokenSecret,profile,done){User.findOrCreate({twitterId:profile.id},function(err,user){return done(err,user);});}));
app.get('/auth/twitter',passport.authenticate('twitter'));
app.get('/auth/twitter/callback',passport.authenticate('twitter',{failureRedirect:HOST+'/login.html?failed=failed'}),function(req,res){/*Successful*/res.redirect('/home.html');});
//-----------------------------------------------
/*passport.use(new ShopifyStrategy({clientID:SHOPIFY_CLIENT_ID,clientSecret:SHOPIFY_CLIENT_SECRET,callbackURL:HOST+"/auth/shopify/callback",shop: SHOPIFY_SHOP_SLUG},
  function(accessToken,refreshToken,profile,done){User.findOrCreate({shopifyId:profile.id},function(err,user){return done(err,user);});}));
app.get('/auth/shopify',passport.authenticate('shopify',{scope:['read_products'],shop:'storename'}));
app.get('/auth/shopify/callback',passport.authenticate('shopify',{failureRedirect:'/login'}),function(req,res){
	//Successful
	res.redirect('/')});*/
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------ ADMIN SERVICES
JSON2xml=function(o,n){return '<?xml version="1.0" encoding="UTF-8"?>\n'+o2xml(n,o)};
o2xml=function(n,o){if(Array.prototype.isPrototypeOf(o)){return a2xml(n,o);}else if(typeof(o)=='object'){return _o2xml(n,o);}else{return v2xml(n,o);}};
_o2xml=function(n,o){var xml='<'+n+'>';var pr;if(n!='hashtags'){
 for(var prop in o){pr=prop;if(!isNaN(prop)){pr='x'+pr}if(Array.prototype.isPrototypeOf(o[prop])){xml+=a2xml(pr,o[prop]);}else if(typeof(o[prop])=='object'){xml+=_o2xml(pr,o[prop]);}else{xml+=v2xml(pr,o[prop]);}}return xml+'</'+n+'>';}else{return ''}};
a2xml=function(n,a){var xml='';for(var i=0;i<a.length;i++){if(Array.prototype.isPrototypeOf(a[i])){xml+=a2xml(n,a[i]);}else if(typeof(a[i]=='object')){xml+=_o2xml(n,a[i]);}else{xml+=v2xml(n,a[i]);}}return xml;};
v2xml=function(n,v){if(typeof(v)=='function'){return ''}var cd=false;if(typeof(v)=='string'){cd=true;}if(cd){return '<'+n+'><![CDATA['+v+']]></'+n+'>';}else{return '<'+n+'>'+v+'</'+n+'>';}};
var emporyou={};
emporyou.logontype=function(req){var logontype='guest';if(req.isAuthenticated()){logontype='user';if(false){logontype='vendor';if(false){logontype='admin';}}}return logontype;};
emporyou.apicheck=function(req){if(!req.isAuthenticated()){return false}return true};
//emporyou.sec=function(){this.logontype=};
emporyou.updatemerchantchache=function(handler){MERCHANTCHACHE=[];
	MongoClient.connect('mongodb://localhost:27017/emporyou', function(err, db) {
		db.collection('merchant').find({}).toArray(function(err,rows){db.close();if(err){if(handler)handler(err);}else{
			for(var r=0;r<rows.length;r++){MERCHANTCHACHE[rows[r]._id]=rows[r]}
		if(handler)handler(false,rows);}});
	});
};
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------ ADMIN SERVICES
app.get('/SVC/get_merchant',function(req, res){var collection=db.collection('simple_limit_skip_query');res.send('Hello World!!');});
app.get('/SVC/set_merchant',function(req, res){res.send('Hello World!!');});
app.get('/SVC/del_merchant',function(req, res){res.send('Hello World!!');});
app.get('/admin/session',function(req,res){if(!req.isAuthenticated()){
res.set('Content-Type', 'application/json');res.end(JSON.stringify({user:'guest',username:'guest',name:'guest',displayName:'guest'}));
}else{
	res.set('Content-Type', 'application/json');res.end(JSON.stringify(req.user));
	}});
app.get('/admin/shutdown',function(req,res){if(!req.isAuthenticated()){res.redirect(HOST+'/login.html')}else{process.exit();}});
app.all('/postback',function(req,res){
	var out='<!DOCTYPE html><head><title>postback</title></head><body>';out+='<h3>headers</h3>\n';
	for (key in req.headers){out+=key+':'+req.headers[key]+'<br/>';}out+='<h3>querystring</h3>\n';
	for (key in req.query){out+=key+':'+req.query[key]+'<br/>';}out+='<h3>form</h3>\n';
	for (key in req.body){out+=key+':'+req.body[key]+'<br/>';}out+='</body></html>';
	res.set('Content-Type', 'text/html');res.end(out);});
app.all(/^\/metaframe\/?.*/,function(req,res){
	if(emporyou.apicheck(req)){var fflag=true;
	  var fn=req.body.page;if(!fn){fn=req.query.page}
	  fn='./'+fn;
	  var st=fs.statSync(fn);
	  if(!st.isDirectory()){}
	  var ext=path.extname(fn);
	  if(mime[ext]){res.set('Content-Type',mime[ext]);}
	  var json=req.body.jsondata;if(!json){json=req.query.jsondata}
	  fs.createReadStream(fn)
		.pipe(replaceStream('%jsondata',json))
		.pipe(res);
	}else{
		res.set('Content-Type', 'text/html');
		res.end('unauthorized');
}});
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------ FRONT SERVICES
app.all('/get_deal', function (req, res) {
  var logontype=emporyou.logontype(req);
  var m_id=req.query.m_id||-1;
  var p_id=req.query.m_id||-1;
  var geo=req.query.geo||null;
  var cat=req.query.cat||-1;
  var max=req.query.max||-1;
  var min=req.query.min||-1;
  var pgmax=req.query.pgmax||-1;
  var pgnum=req.query.pgnum||-1;
  var outputfomat=(req.query.output||'json').toLowerCase();
  var jq={};
  res.jsonout={requested:req.originalUrl};
  MongoClient.connect('mongodb://localhost:27017/emporyou',function(err,db){
		db.collection('deal').find({visible:true}).toArray(function(err,rows){db.close();if(err){throw err}else{
			for(var r=0;r<rows.length;r++){rows[r].merchant=MERCHANTCHACHE[rows[r].merchant];}
			res.jsonout.deal=rows[r];
			if(outputfomat=='xml'){res.set('Content-Type', 'application/json');res.end(JSON2xml(res.jsonout,'response'));}
			if(outputfomat=='json'){res.set('Content-Type', 'application/json');res.end(res.jsonout);}
			
  }});});});
app.get('/get_transactions', function (req, res) {
  var logontype=emporyou.logontype(req);
  var m_id=req.query.m_id||-1;
  var jq=req.item;
  res.jsonout='';
	if(logontype=='vendor'||logontype=='admin'){
		
	}
  MongoClient.connect('mongodb://localhost:27017/emporyou',function(err,db){
		db.collection('transaction').find({visible:true}).toArray(function(err,rows){db.close();if(err){throw err}else{
			for(var r=0;r<rows.length;r++){rows[r].merchant=MERCHANTCHACHE[rows[r].merchant];}
			res.jsonout.transaction=rows[r];
			if(outputfomat=='xml'){res.set('Content-Type', 'application/json');res.end(JSON2xml(res.jsonout,'response'));}
			if(outputfomat=='json'){res.set('Content-Type', 'application/json');res.end(res.jsonout);}
  }});});});
app.get('/add_deal',function(req,res){
  var deal=req.body.jsondata;
  deal._id=new ObjectID();
  MongoClient.connect('mongodb://localhost:27017/emporyou',function(err,db){
		db.collection('deal').insert({deal},function(err){
			res.set('Content-Type', 'application/json');res.end(deal);
		});
	});  
});
serve404=function(res){};
servenoimage=function(res){res.sendFile('/root/emporyou/frontend/img/default-product.png');};
//---------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------
app.use(function(req,res,next){if(req.originalUrl.indexOf('/admin')==0){if(!req.isAuthenticated()){res.redirect('login.html')}
		else{express.static('./')(req,res,next)}}else{express.static('./home')(req,res,next)}}
);
var PORT=80;
if(process.argv[2]){PORT=process.argv[2];};
var server=app.listen(PORT,function(){emporyou.updatemerchantchache();console.log('Example app listening ...');});

/*
var deal={
	merchant:0,
	title:'new deal',subtitle:'new deal',desc:'',url:'',
	visible:false,imageurl:'',price:0,
	variant:[{title:'new deal',subtitle:'new deal',desc:'',url:'',quantity:0,price:0,imageurl:''}]
};
var merchant={
	user:0,username:'',password:'',name:'',fattinfos:{todo:"todo"},contact:[{mail:'admin@metaschema.io'}],address:{route:'',street_number:'',zipcode:'',state:'',country:'',administrative_area_level_2:'',lat:'',lng:'',authkeys:['demoapikey']}
};
*/
var cart={
	
};
var transaction={
	
};



//setInterval(beAlive,60000);
//var alive=0;
//function beAlive(){alive++;console.log('minute passed='+alive)}

/*
{user:0,username:'merchantX',password:'merchantX',name:'merchantX',fattinfos:{todo:"todo"},contact:[{mail:'admin@metaschema.io'}],address:{route:'via dei metaschemi',street_number:'1',zipcode:'20100',location:'milano',country:'italia',administrative_area_level_2:'MI',lat:'',lng:''}]}
{merchant:0,title:'new deal',subtitle:'new deal',desc:'new deal desc',url:'',visible:false,imageurl:'',price:0,variant:[{title:'new deal',subtitle:'new deal',desc:'',url:'',quantity:0,price:0,imageurl:''}]}
*/

/*
	use emporyou
    db.createCollection('deals')
	db.createCollection('merchant')
	
	562fadaad98f070d16311903
	
	
*/



//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------- OBJECT 2 XML
// o2xml=function(n,o){if(Array.prototype.isPrototypeOf(o)){return a2xml(n,o);}else if(typeof(o)=='object'){return _o2xml(n,o);}else{return v2xml(n,o);}};
// _o2xml=function(n,o){var xml='<'+n+'>';var pr;if(n!='hashtags'){
	// for(var prop in o){pr=prop;if(!isNaN(prop)){pr='x'+pr}if(Array.prototype.isPrototypeOf(o[prop])){xml+=a2xml(pr,o[prop]);}else if(typeof(o[prop])=='object'){xml+=_o2xml(pr,o[prop]);}else{xml+=v2xml(pr,o[prop]);}}return xml+'</'+n+'>';}else{return ''}};
// a2xml=function(n,a){var xml='';for(var i=0;i<a.length;i++){if(Array.prototype.isPrototypeOf(a[i])){xml+=a2xml(n,a[i]);}else if(typeof(a[i]=='object')){xml+=_o2xml(n,a[i]);}else{xml+=v2xml(n,a[i]);}}return xml;};
// v2xml=function(n,v){if(typeof(v)=='function'){return ''}var cd=false;if(typeof(v)=='string'){cd=true;}if(cd){return '<'+n+'><![CDATA['+v+']]></'+n+'>';}else{return '<'+n+'>'+v+'</'+n+'>';}};



//obsolete
// app.get('/get_product', function (req, res) {
  // var m_id=req.query.m_id||-1;
  // var p_id=req.query.p_id||-1;
  // var geo=req.query.geo||null;
  // var cat=req.query.cat||-1;
  // var max=req.query.max||-1;
  // var min=req.query.min||-1;
  // var pgmax=req.query.pgmax||-1;
  // var pgnum=req.query.pgnum||-1;
  // var city=req.query.city||-1;
  // res.myxml='<?xml version="1.0" encoding="UTF-8"?><response>';
  // res.set('Content-Type', 'text/xml');
  // var q={};
  // console.log(p_id);
  // if(p_id!=-1){q={_id:p_id}}
	// if(city!=-1){
		
	// }	
  // if(m_id!=-1){
	  // doit(m_id,function(){res.send(res.myxml+'</response>');},res,q);
  // }else{
  // doit(1,function(){res.send(res.myxml+'</response>');},res,q);
// }});
// var mmss=[{n:'La Bottega del Fumetto'},{n:'Panificio Beretta'},{n:'Shoppy'},{n:'Estetica Biraghi s.r.l'},{n:'Ferramenta da Luigi'}];
// doit=function(m_id,onend,res,q){var p=3001+(m_id*10);
	// MongoClient.connect('mongodb://localhost:'+p+'/meteor', function(err, db) {
		// db.collection('Products').find(q).toArray(function(err,docs){
			// var x="<merchant><name>Merchant "+mmss[m_id-1].n+"</name><id>"+m_id+"</id><lat>2</lat><lon>2</lon><city>Milano</city></merchant></product>";
			// res.myxml+=o2xml('product',docs).replace(/<\/product>/g,x);
			// db.close();try{onend();}catch(ex){res.send(res.myxml+'</response>');}
// });});};


// app.get('/get_product_image', function (req, res) {
  // var m_id=req.query.m_id||-1;
  // var p_id=req.query.p_id||-1;
  // var v_id=req.query.v_id||-1;
  // var isize=req.query.size||'medium';
  // var priority=req.query.priority||0;
  // var errs=[];
  // if(m_id==-1){errs[errs.length]='Parameter m_id is mandatory.\n'}
  // if(p_id==-1){errs[errs.length]='Parameter p_id is mandatory.\n'}
  // if(errs.length>0){res.set('Content-Type', 'text/plain');res.send(errs);}
  // else{var p=3001+(m_id*10);
	// var q_exp='metadata.productId';var q_field=p_id;
	// //if(v_id!=-1){q_exp='metadata.variantId';q_field=v_id;}
	// MongoClient.connect('mongodb://localhost:'+p+'/meteor', function(err, db) {
		// var projection={};
		// projection['copies.'+isize+'.key']=1;		
		// db.collection('cfs.Media.filerecord').find({'metadata.productId':q_field}).toArray(function(err,d1){
		  // if(d1.length>0){console.log(d1[0].copies[isize].key);
			  // db.collection('cfs_gridfs.'+isize+'.files').find({'_id':ObjectID(d1[0].copies[isize].key)}).toArray(function(err,d2){
				// if(d2.length>0){
					// res.set('Content-Type', d2[0].contentType);
					// db.collection('cfs_gridfs.'+isize+'.chunks').find({'files_id':d2[0]._id}).toArray(function(err,d3){
						// if(d3.length>0){
							// res.set('Content-Type', d2[0].contentType);
							// res.send(new Buffer(d3[0].data.buffer, 'binary'))
						// }else{servenoimage(res);}		
					// });
				// }else{servenoimage(res);}
			// });
		  // }else{servenoimage(res);}		  
// });});}});