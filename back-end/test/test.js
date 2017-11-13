var assert = require('assert');
var request = require('request');

describe('Login and Signup test', function() {
    describe('login', function() {
        it('should not allow user to signin with wrong username and password', function() {

            request.post({url:'http://localhost:3001/login', form: {username:'niyat0101', password: 'a'}}, function(err,httpResponse,body){
                assert.equal(response.message, 'Success');
            })
        });

        it('should not allow user to signin with wrong username and password', function() {

            request.post({url:'http://localhost:3001/login', form: {username:'niyat0101', password: 'wrong'}}, function(err,httpResponse,body){
                assert.equal(response.error, 'Incorrect password')
            })
        });

	});

	describe('signup', function() {
        it('user should have unique name while signing up', function() {

            request.post({url:'http://localhost:3001/signup', form: {
            	username:'niyat0101', 
            	password: 'wrong',
            	firstname: 'niyat',
            	lastname: 'patel'}}, 
            	function(err,httpResponse,body){
                assert.equal(response.data.error.error, 'User already exists')
            })
        });

    });
});

describe('Files test', function() {
    describe('file upload', function() {
        it('should return success on file upload', function() {
			var fs = require("fs");
			var request = require("request");

			var options = { method: 'POST',
			  url: 'http://localhost:3001/uploadfile',
			  headers: 
			   { 'postman-token': '46160068-c588-3cb5-a77e-9b1e4f2e9fad',
			     'cache-control': 'no-cache',
			     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
			  formData: 
			   { username: 'niyat1',
			     path: 'niyat',
			     file: 
			      { value: 'fs.createReadStream("/Users/niyatpatel/Pictures/Pics/IMG_3882.JPG")',
			        options: 
			         { filename: '/Users/niyatpatel/Pictures/Pics/IMG_3882.JPG',
			           contentType: null } } } };

			request(options, function (error, response, body) {
			 	assert.equal(body.message, "Success");
			});

        });


        it('should not process without file', function() {
			var fs = require("fs");
			var request = require("request");

			var options = { method: 'POST',
			  url: 'http://localhost:3001/uploadfile',
			  headers: 
			   { 'postman-token': '46160068-c588-3cb5-a77e-9b1e4f2e9fad',
			     'cache-control': 'no-cache',
			     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
			  formData: 
			   { username: 'niyat1',
			     path: 'niyat',
			     file: 
			      { value: 'fs.createReadStream("/Users/niyatpatel/Pictures/Pics/IMG_3882.JPG")',
			        options: 
			         {  } } }};

			request(options, function (error, response, body) {
			 	assert.equal(body.Message, "");
			});

        });

	});


});