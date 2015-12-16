var format=require('util').format;var endOfLine = require('os').EOL;
var replaceStream = require('replacestream');var fs=require('fs'),path=require("path");
var MongoClient = require('mongodb').MongoClient;var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var btoa = require('btoa')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');var upload = multer({ dest: 'uploads/' });
var passport = require('passport');
var app = express();
var readline = require('readline');
var SRVSCOPES = ['https://mail.google.com/','https://www.googleapis.com/auth/gmail.send'];
var SRVG={installed:{client_secret:'5RbfvJ5VtKsU_oOvXe46LmqO',client_id:'1090089087428-mrff9j9euvgv0bqtpaub4rn626j7kdih.apps.googleusercontent.com'}};
//-----------------------------------------------
var MXS=require('metaschema-node');
var metaschema=MXS.express;
var DIRNAME='.';
var PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 80;
var IP   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var MONGOURL='mongodb://localhost:27017/emporyou';
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var TOKEN_DIR = '.';
var TOKEN_PATH = TOKEN_DIR + '/apitoken.json';

metaschema.apply({mongoUrl:MONGOURL,dirname:DIRNAME});

app.use(cookieParser());
app.use(session({saveUninitialized:false,resave:false,secret:'logic is red',store:new MongoStore({url: MONGOURL })}));
var HOST='http://emporyou.com';
//var HOST='http://localhost:1024';
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------ LOGIN and PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
var TWITTER_CONSUMER_KEY='P4bDNt8Umk1k1YVMXBRf7EfFW';var TWITTER_CONSUMER_SECRET='Wlibc4hVhUfA21ZPMUZqJ7GuFDICTj7bQfkno3WpB5yRFneCmn';
var FACEBOOK_APP_ID='460219550850496';var FACEBOOK_APP_SECRET='92c6695c348098685ad74418946b9c8d';
var GOOGLE_CLIENT_ID='1090089087428-k638posl6k8nkgl140bj4ebecrfhmopo.apps.googleusercontent.com';var GOOGLE_CLIENT_SECRET='iejkVQ8FcjXguhQwzgcANM5T';
var GOOGLE_API_SCOPE = ['profile','email'];
var SHOPIFY_SHOP_SLUG /*e.g. my-shop-name.myshopify.com ... the `my-shop-name` part*/
var SHOPIFY_CLIENT_ID=''; 
var SHOPIFY_CLIENT_SECRET='';
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
app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:HOST+'/login.html?failed=failed'}),function(req,res){/*Successful*/var r=req.session.afterlogin||'/';res.redirect(r);});
//---------------------------------------------------------------------------------------------------- F A C E B O O K
passport.use(new FacebookStrategy({clientID:FACEBOOK_APP_ID,clientSecret:FACEBOOK_APP_SECRET,callbackURL:HOST+"/auth/facebook/callback",enableProof:false},
  function(accessToken,refreshToken,profile,done){profile.provider='facebook';User.findOrCreate({facebookId:profile.id},function(err,user){return done(err,user);});}));
app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect:HOST+'/login.html?failed=failed'}),function(req, res) {/*Successful*/var r=req.session.afterlogin||'/';res.redirect(r);});
//---------------------------------------------------------------------------------------------------- T W I T T E R
passport.use(new TwitterStrategy({consumerKey:TWITTER_CONSUMER_KEY,consumerSecret:TWITTER_CONSUMER_SECRET,callbackURL:HOST+"/auth/twitter/callback"},
  function(token,tokenSecret,profile,done){profile.provider='twitter';User.findOrCreate({twitterId:profile.id},function(err,user){return done(err,user);});}));
app.get('/auth/twitter',passport.authenticate('twitter'));
app.get('/auth/twitter/callback',passport.authenticate('twitter',{failureRedirect:HOST+'/login.html?failed=failed'}),function(req,res){/*Successful*/var r=req.session.afterlogin||'/';res.redirect(r);});
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
var emporyou={};
emporyou.logontype=function(req){var logontype='guest';if(req.isAuthenticated()){logontype='user';if(false){logontype='merchant';if(false){logontype='admin';}}}return logontype;};
emporyou.updatemerchantchache=function(handler){MERCHANTCHACHE=[];
	MongoClient.connect(MONGOURL, function(err, db) {
		db.collection('merchant').find({}).toArray(function(err,rows){db.close();if(err){if(handler)handler(err);}else{
			for(var r=0;r<rows.length;r++){MERCHANTCHACHE[rows[r]._id]=rows[r]}
		if(handler)handler(false,rows);}});
	});
};
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------ APPLICATION SERVICES
app.all('/session',function(req,res){if(!req.isAuthenticated()){
	res.set('Content-Type', 'application/json');res.end(JSON.stringify({user:'guest',username:'guest',name:'guest',displayName:'guest'}));
	}else{res.set('Content-Type', 'application/json; charset=utf-8');res.end(JSON.stringify(req.user));}});
app.all('/admin/shutdown',function(req,res){if(!req.isAuthenticated()){res.redirect(HOST+'/login.html')}else{process.exit();}});
app.all(/^\/api\/postback\/?.*/,upload.any(),metaschema.postback);
app.all(/^\/merchant\/metaframe\/?.*/,upload.any(),function(req,res,next){
	if(!req.isAuthenticated()){req.session.afterlogin='../../merchant/postlogin.html';return res.redirect('../login.html');}
	metaschema.metaframe(req,res,next)}
);
app.all(/^\/metaframe\/?.*/,upload.any(),function(req,res,next){
	if(!req.isAuthenticated()){req.session.afterlogin='../../merchant/postlogin.html';return res.redirect('../login.html');}
	metaschema.metaframe(req,res,next)}
);
app.all(/^\/api\/get\/?.*/,upload.any(),metaschema.get);
app.all(/^\/api\/get\/?.*/,upload.any(),metaschema.get);
app.all(/^\/api\/set\/?.*/,upload.any(),metaschema.set);
app.all(/^\/api\/add\/?.*/,upload.any(),metaschema.add);
app.all(/^\/api\/newdeal\/?.*/,upload.any(),function(req,res,next){
	if(!req.isAuthenticated()){res.set('Content-Type', 'application/json; charset=utf-8');
		return res.end(JSON.stringify({unauthorized:'unauthorized'}));
	}
	MXS.fwd(req,res,next,function(req,res,next){
//jsondata.imagefile=req.files[0].filename;
	var q=req.item(MXS.CONFIG.dataParameter);var Q={};
	if(q){try{Q=JSON.parse(q);}catch(ex){Q={};return res.jend(req,res,'error','could not parse json');}}
	if(!req.files){res.jend(req,res,'error','files are mandatory');}
	if(!Q.images){Q.images=new Array();}
	for(var f=0;f<req.files.length;f++){var v;
		if(req.files[f].fieldname.indexOf('main')>-1){Q.images[Q.images.length]={url:HOST+'/uploads/'+req.files[f].filename,size:req.files[f].size};}
		else{var fn=req.files[f].fieldname.replace('varimg_','');
			for(v=0;v<Q.variants.length;v++){
				if(Q.variants[v].v_id==fn){
					Q.variants[v].image={url:HOST+'/uploads/'+req.files[f].filename,size:req.files[f].size};v=1000;
	}	}	}	}
	Q["price-base"]=parseFloat(Q["price-base"]);
	Q["qta-base"]=parseFloat(Q["qta-base"]);
	Q["valore-base"]=parseFloat(Q["valore-base"]);
	Q["discount"]=parseFloat(Q["discount"]);
	for(v=0;v<Q.variants.length;v++){
		Q.variants[v].price=parseFloat(Q.variants[v].price);
		Q.variants[v].valore=parseFloat(Q.variants[v].valore);
		Q.variants[v].quantity=parseFloat(Q.variants[v].quantity);
		delete Q.variants[v].v_id;}
	if(Q.category){
		Q.rel=[{key:ObjectID(Q.category),n:CATEGORIES[Q.category],p:XR,r:'default'}];delete Q.category;}	
	req.query[MXS.CONFIG.dataParameter]=JSON.stringify(Q);
	MXS.add(req,res,next);})});

app.all(/^\/api\/del\/?.*/,upload.any(),metaschema.del);
app.all(/^\/api\/link\/?.*/,upload.any(),metaschema.link);
app.all(/^\/api\/unlink\/?.*/,upload.any(),metaschema.unlink);
app.all(/^\/api\/reset\/?.*/,upload.any(),metaschema.reset);
//---------------Cartoleria
app.post(/^\/syncart\/?.*/,upload.any(),function(req,res,next){
	var c='';var f=true;
	try{c=req.body.xdata;if(c){if(c!=''){f=false;req.session.cart=c;}}}
	catch(ex){f=true}
	if(f){c=req.session.cart||"<response>-</response>";}
	res.set('Content-Type', 'text/xml;');
	return res.end('<?xml version="1.0" encoding="UTF-8"?>'+c);
});
app.get(/^\/syncart\/?.*/,upload.any(),function(req,res,next){
	var c=req.session.cart||"<response>-</response>";
	res.set('Content-Type', 'text/xml;');
	return res.end('<?xml version="1.0" encoding="UTF-8"?>'+c);
});
app.get(/^\/testmail\/?.*/,upload.any(),function(req,res,next){
	fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
  authorize(JSON.parse(content), function(auth){
	var dest='hideki.yamamoto@gmail.com';
  //CORPO
  email="TEST FROM EMPORYOU";
  email='Subject: TEST\n'+email;
  email='To: '+dest+'\n'+email;
  email='Reply-To: emporyou@gmail.com'+'\n'+email;
  email='From: emporyou@gmail.com\n'+email;
  //ENCODE
  var base64EncodedEmail=new Buffer(email).toString('base64');
  var gmail = google.gmail('v1');
  gmail.users.messages.send({auth: auth,'userId':'emporyou@gmail.com','resource':{'raw':base64EncodedEmail}},function(err,resp){
	  res.set('Content-Type', 'application/json; charset=utf-8');res.end(JSON.stringify({ex:err}));	  
  });
});
});
});
rtrim=function(v){var t=v.replace(/\s+$/g,'');return t;};
function strtr(str,from,to){
  var fr = '',
    i = 0,
    j = 0,
    lenStr = 0,
    lenFrom = 0,
    tmpStrictForIn = false,
    fromTypeStr = '',
    toTypeStr = '',
    istr = '';
  var tmpFrom=[];var tmpTo=[];var ret='';var match=false;
  // Received replace_pairs?
  // Convert to normal from->to chars
  if (typeof from === 'object') {
    tmpStrictForIn = this.ini_set('phpjs.strictForIn', false); // Not thread-safe; temporarily set to true
    from = this.krsort(from);
    this.ini_set('phpjs.strictForIn', tmpStrictForIn);
    for (fr in from) {
      if (from.hasOwnProperty(fr)) {
        tmpFrom.push(fr);
        tmpTo.push(from[fr]);
    } }
    from=tmpFrom;to=tmpTo;}
  // Walk through subject and replace chars when needed
  lenStr=str.length;lenFrom=from.length;
  fromTypeStr = typeof from === 'string';
  toTypeStr = typeof to === 'string';
  for(i=0;i<lenStr;i++){match=false;
    if(fromTypeStr){istr=str.charAt(i);
      for (j = 0; j< lenFrom; j++) {
        if (istr == from.charAt(j)) {
          match = true;
          break;
    } } }
	else{for(j=0;j<lenFrom;j++){if(str.substr(i,from[j].length)==from[j]){match=true;i=(i+from[j].length)-1;break;}}}
    if(match){ret+=toTypeStr ? to.charAt(j):to[j];}
	else{ret+=str.charAt(i);}
  }  return ret;
}


//---------------------------------------------------------------------------------------------------
//----------------------------------------------------------------- STATIC FILES SERVER CONFIGURATION
//---------------------------------------------------------------------------------------------------
app.use(function(req,res,next){
	        if(req.originalUrl.indexOf('/admin')==0){if(!req.isAuthenticated()){req.session.afterlogin=req.originalUrl;res.redirect('../login.html')}else{express.static('./')(req,res,next)}}
		else if(req.originalUrl.indexOf('/merchant')==0){if(!req.isAuthenticated()){req.session.afterlogin=req.originalUrl;res.redirect('../login.html')}else{express.static('./')(req,res,next)}}
		else if(req.originalUrl.indexOf('/user')==0){if(!req.isAuthenticated()){req.session.afterlogin=req.originalUrl;res.redirect('../login.html')}else{express.static('./')(req,res,next)}}
		else if(req.originalUrl.indexOf('/uploads')==0){express.static('./')(req,res,next)}
		else if(req.originalUrl.indexOf('/emporyou')==0){express.static('../')(req,res,next)}
		   else{express.static('./home')(req,res,next)}}
);
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------ DEFAULT DATABASE DEF
//---------------------------------------------------------------------------------------------------
var XD=Metaschema.CONFIG.docID;var XR=Metaschema.CONFIG.rootID;var XA=Metaschema.CONFIG.adminID;var XT=Metaschema.CONFIG.tagID;
var XCAT=ObjectID('000000000000000000000050');
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000011'),XR,XD,XA,'merchant','merchants node',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000012'),XR,XD,XA,'deal','deals node',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000013'),XR,XD,XA,'cart','carts node',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000014'),XR,XD,XA,'transaction','transactions node',false,true));
metaschema.addbaserecord(new Metaschema.Doc(XCAT,XR,XT,XA,'category','categories node',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000101'),XR,XCAT,XA,'Casa','prodotti per la casa',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000102'),XR,XCAT,XA,'Tempo libero','prodotti per il tempo libero',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000103'),XR,XCAT,XA,'Moda','prodotti di moda',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000104'),XR,XCAT,XA,'Mangiare e Bere','prodotti per l\'alimentazione',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000105'),XR,XCAT,XA,'Elettronica','prodotti di elettronica',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000106'),XR,XCAT,XA,'Bellezza','prodotti per la bellezza',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000107'),XR,XCAT,XA,'Cartoleria','prodotti per la cartoleria',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000108'),XR,XCAT,XA,'Salute','prodotti per la salute',false,true));
metaschema.addbaserecord(new Metaschema.Doc(ObjectID('000000000000000000000109'),XR,XCAT,XA,'Animali','prodotti per gli animale',false,true));
//---------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------- SERVER LISTEN BOOTSTRAP
//---------------------------------------------------------------------------------------------------
var CATEGORIES={'000000000000000000000101':'Casa',
					'000000000000000000000102':'Tempo libero',
					'000000000000000000000103':'Moda',
					'000000000000000000000104':'Mangiare e Bere',
					'000000000000000000000105':'Elettronica',
					'000000000000000000000106':'Bellezza',
					'000000000000000000000107':'Cartoleria',
					'000000000000000000000108':'Salute',
					'000000000000000000000109':'Animali'};
app.all(/^(?!\/api).*$/,metaschema.urltorecord);
if(process.argv[2]){PORT=process.argv[2];};

function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SRVSCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}
/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

function startserver(){
	var server=app.listen(PORT,function(){emporyou.updatemerchantchache();console.log('Example app listening ...');});
}

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
  authorize(JSON.parse(content), startserver);
});




/*
HANDBOOK
a posted file, parsed with multer looks like this:
fieldname		Field name specified in the form	
originalname	Name of the file on the user's computer	
encoding			Encoding type of the file	
mimetype			Mime type of the file	
size				Size of the file in bytes	
destination		The folder to which the file has been saved	DiskStorage
filename			The name of the file within the destination	DiskStorage
path				The full path to the uploaded file	DiskStorage
buffer			A Buffer of the entire file	MemoryStorage
 
*/

/*
TODO EMPORYOU:
H 		Associazione MERCHANT->LOGIN in modo che geo sia associato ai prodotti
H		VARIANTE GIUSTA IN CARRELLO
H 		Ricerca per prezzo MAX e MIN funzionanti
H 		Transazione e back 
H 		Dispatch email

H+G 	Admin e merchant views ###############################################

H+G	+Autocompilamento da magento
G     [PAGINA PAGAMENTO FASULLA + PAGINE BACK]
G 		Template email per client e merchant e admin
G     aggiungere MIN MAX in home
H+G   La lista delle cose mancanti che sono già perfettamente previste.

*/

/*
DEMO

0 - OK
ELIMINARE DATABASE
http://emporyou.com - confermare vuoto in home

1
MAGENTO
http://108.61.188.200
emporyou Emporyou2015
BOTTONE MAGENTO

2
REACTION
http://emporyou.com:3010
BOTTONE EMPORYOU

-------dimostrazione codice unificato bookmarklet + metaschema->coupon.html-------

3
http://emporyou.com vista prodotti
-ricerca x categoria
-ricerca x prezzo
-ricerca x geo

6 
trans back OK
trans back KO

7
VISTE ADMIN




https://apps-apis.google.com/a/feeds/emailsettings/2.0/18montenapoleone.it/m.brambilla@18montenapoleone.it/signature
https://apps-apis.google.com/a/feeds/emailsettings/2.0/
https://www.googleapis.com/auth/gmail.readonly






*/