var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    port     : 5432,
    user     : 'jroel',
    database : 'eugenefanclub'
  }
});

/* GET users listing. */
router.get('/signup', function(req, res, next) {
	var errors = [];
	var data = {};
  res.render('signup', {
  	title: 'Sign Up!',
  	data: data,
  	errors: errors
  });
});



router.post('/signup', function(req, res, next) {
	//get our post fields
	console.log("in signup post")
  	var username = req.body.username;
  	var email = req.body.email;
  	var phone = req.body.phone;
  	var first_name = req.body.first_name;
  	var last_name = req.body.last_name;
  	var password = req.body.password;
  	var passwordcheck = req.body.passwordcheck;


  	//==============================================
  	//VALIDATION====================================
  	//==============================================
  	//setup var for containing various errorMsgs
  	var errorMsg = [];
  	//Validate password length
  	if (password.length < 8 || passwordcheck.length < 8)
  	{
  		errorMsg.push('Password Length needs to be 8 or greater.');
  	}

  	//Validate email
	if(email.indexOf('@') < 0){
		errorMsg.push('Not a valid email.');
	}
 
	//Validate phone number
	if(/a-zA-Z/.test(phone))
	{
		console.log('phone number invalid.')
		errorMsg.push('Phone needs to be numbers only.')
	}
	if(phone.length > 10)
	{
		errorMsg.push('Phone number needs to be 10 digits or less.')
	}

	//Validate names
	if(!username && username === '')
	{
		errorMsg.push('Need a user name.');
	}
	if(!first_name && first_name === '')
	{
		errorMsg.push('Need a first name.');
	}
	if(!last_name && last_name === '')
	{
		errorMsg.push('Need a last name.');
	}



  	var chkd = hashPassword(pass, user, checkPassword);
  	console.log("Errors: ", errorMsg);
  	if (errorMsg.length)
  	{
  		console.log('Errors found going back to signup');
	  		res.render('signup', { 
	  			title: "Sign Up to Eugene's Fan Site", 
	  			data: req.body, 
	  			errors: errorMsg 
	  		});
	} else {
		//SUCCESS: so insert into database
		knex('users').insert({
				username: username,
			  	first_name: first_name,
			  	last_name: last_name,
			  	phone: phone,
			  	email: email,
			  	password: password
		}).then(function(countInserted){
			console.log("Entry put into table: ", countInserted)
			res.redirect('/auth/signin');
		}).catch(function(err){
			console.log("users/signup ERROR: ", err);

		});

		
	}
});



router.get('/update', function(req,res,next){
	//var user = req.body.username;
	user = 'xoEugenexoxo';


		knex('users').select().where({username: user}).then(
			function(userData){	

			var data = userData[0];
			
			console.log("Data from DB: ", data);
			
			var errors= [];
			res.render('signup', {
		  		title: 'Update your info!',
		  		data: data,
		  		errors: errors
			});
		});
	//End knex
});





module.exports = router;


