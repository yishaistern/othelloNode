/*test.js file*/
const express = require('express');
const bodyPars = require ('body-parser');
console.log("Node is working");
const listener = express();
var fs = require('fs');
listener.use(bodyPars());
listener.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

listener.post('/login' , function(request, response) {
	const body = request.body;
	fs.readFile('./db/users.json', function(err, data) {
	    let users = JSON.parse(data);
	    const withName = users.filter((value) => value.userName === body.userName);
	    if (withName && withName.length === 1 && withName[0].password === body.password) {
	    	response.send({
    			status: {
    				code: 0,
    				state: "succsess"
    			},
    			
    			data: body
    		});
	    } else {
	    	response.send({
    			status: {
    				code: -1,
    				state: "fail"
    			},
    			error : {
    				msg: "rong name or password"
    			},
    			data: {

    			}
    		});
	    }
	});
});
listener.post('/singUp' , function(request, response) {
	const body = request.body;
    fs.readFile('./db/users.json', function(err, data) {
	    let users = JSON.parse(data);
	    const withName = users.filter((value) => value.userName === body.userName);
	    console.log(withName);
    	if (withName && withName.length > 0) {
    		response.send({
    			status: {
    				code: -1,
    				state: "fail"
    			},
    			error : {
    				msg: "user already exsites"
    			},
    			data: {

    			}
    		});
    	} else {
    		users.push(body);
    		fs.writeFile('./db/users.json', JSON.stringify(users), function (err) {
  				if (err) throw err;
  				console.log('Replaced!');
			});
    		response.send({
    			status: {
    				code: 0,
    				state: "succsess"
    			},
    			
    			data: body
    		});
    	}
  	});
    
});
listener.listen(4005, function() {
    console.log('listening at 4005');
});