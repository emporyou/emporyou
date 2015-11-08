#!/bin/env node
var express=require('express');var metaschema=require('metaschema-node').express;var mongodb = require('mongodb'); 

var DIRNAME='./static';
var PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var IP   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var mongoURL=process.env.MONGO_URL;if(mongoURL){mongoURL=process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@'+mongoURL;}
else{mongoURL=process.env.OPENSHIFT_MONGODB_DB_URL}if(!mongoURL){mongoURL='mongodb://localhost:27017/metaschema';}
metaschema.apply({ip:IP,port:PORT,mongoUrl:mongoURL,dirname:DIRNAME,urltorecord:{redirect:'/index.html?',parameter:'_id'}});

var app = express();
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
app.use(session({saveUninitialized:false,resave:false,secret:'logic is red',store:new MongoStore({url: mongoURL })}));
app.use(passport.initialize());
app.use(passport.session());

var HOST=process.env.OPENSHIFT_APP_DNS;if(!HOST){HOST='localhost'}HOST='http://'+HOST+':'+PORT;
var TWITTER_CONSUMER_KEY='P4bDNt8Umk1k1YVMXBRf7EfFW';var TWITTER_CONSUMER_SECRET='Wlibc4hVhUfA21ZPMUZqJ7GuFDICTj7bQfkno3WpB5yRFneCmn';
var FACEBOOK_APP_ID='460219550850496';var FACEBOOK_APP_SECRET='92c6695c348098685ad74418946b9c8d';
var GOOGLE_CLIENT_ID='1090089087428-k638posl6k8nkgl140bj4ebecrfhmopo.apps.googleusercontent.com';var GOOGLE_CLIENT_SECRET='iejkVQ8FcjXguhQwzgcANM5T';
var GOOGLE_API_SCOPE = ['profile','email'];
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------ LOGIN and PASSPORT CONFIGURATION
var User={findOrCreate:function(a,next){
		if(!a.displayName){a.displayName='utente anonimo';}
      MongoClient.connect(MONGOURL,function(err,db){if(err){db.close();next(err,null)}else{
			db.collection('profile').find(a).toArray(function(err,rows){if(err){db.close();next(err,null)}else{
				if(rows.length<1){var uid=new ObjectID();a._id=uid;
					db.collection('profile').insert(a,function(err){db.close();if(err){next(err,null)}else{next(false,a);
				}});}else{db.close();next(false,rows[0]);}
}});}});},findById:function(a,next){
      MongoClient.connect(MONGOURL,function(err,db){if(err){db.close();next(err,null)}else{
			db.collection('profile').find({_id:a}).toArray(function(err,rows){if(err){db.close();next(err,null)}else{
				if(rows.length<1){db.close();next(err,null);}
				else{db.close();next(false,rows[0]);}
}});}});}
};

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

app.all(/^\/session\/?.*/,function(req,res,next){res.writeHead(200,{'Content-Type':'text/xml'});res.end(Metaschema.JSON2xmldoc(req.session,'response'));});
app.all(/^\/?api\/get\/?.*/,upload.any(),metaschema.get);
app.all(/^\/?api\/set\/?.*/,upload.any(),metaschema.set);
app.all(/^\/?api\/add\/?.*/,upload.any(),metaschema.add);
app.all(/^\/?api\/del\/?.*/,upload.any(),metaschema.del);
app.all(/^\/?api\/link\/?.*/,upload.any(),metaschema.link);
app.all(/^\/?api\/unlink\/?.*/,upload.any(),metaschema.unlink);
app.all(/^\/?api\/metaframe\/?.*/,upload.any(),metaschema.metaframe);
app.all(/^\/?api\/reset\/?.*/,upload.any(),metaschema.reset);
app.all(/^(?!\/api).*$/,metaschema.servestatic);
app.all(/^(?!\/api).*$/,metaschema.urltorecord);
app.all(/.*/,function(req,res,next){res.writeHead(200,{'Content-Type':'text/plain'});res.end('no module matched the request');});

app.listen(PORT, IP,function () {  
	console.log('Listening on '+IP+':'+PORT+' - MONGO:'+mongoURL);
});