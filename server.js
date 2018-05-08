const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const app = express()
const user = '304d36bd-7e6c-4a0b-bed0-bfa18cfb89ac'
const pass = 'oW00jVhpsRTJ'
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {msg: null, error: null});
})

app.post('/', function (req, res) {
	let msg = req.body.msg
	var toneAnalyzerV3 = new ToneAnalyzerV3({
		  version: '2017-09-21',
		  username: user,
		  password: pass
		});

	var params = {
	  'tone_input': { 'text': msg },
	  'content_type': 'application/json'
	};

	toneAnalyzerV3.tone(params, function (error, response) {
	  if (error) {
	  	console.log('error:', error);
	  	res.render('index', {msg: null, error: 'Error, please try again'});
	  }
	  else {
	  	// let msg = JSON.stringify(response, null, 2);
	    // console.log(msg);
	    let msg = response;
	    console.log(msg.document_tone);
	    if (msg && msg.document_tone.tones && msg.document_tone.tones && msg.document_tone.tones[0].tone_name){
        	let msgText = msg.document_tone.tones[0].tone_name;
        	res.render('index', {msg: msgText, error: null});
     	} else {

        	res.render('index', {msg: null, error: 'Error, please try again'});
      	}
	  }
	  	
	  }
	); 0;
	// console.log(msg.document_tone.tones)

	// document.getElementById("response").innerHTML = gotit;
// res.render('index'); 
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})





// <script>
// var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
// function myFunction() {
// 	try {
// 	    var x = document.getElementById("text");    
// 	    var text = x.value;

// 	    // document.getElementById("demo").innerHTML = text;

		

// 		var toneAnalyzerV3 = new ToneAnalyzerV3({
// 		  version: '2017-09-21',
// 		  username: '{304d36bd-7e6c-4a0b-bed0-bfa18cfb89ac}',
// 		  password: '{oW00jVhpsRTJ}'
// 		});

// 		// var text = 'I love you all so much! You are my favorite people.'

// 		var params = {
// 		  'tone_input': { 'text': text },
// 		  'content_type': 'application/json'
// 		};

// 		toneAnalyzerV3.tone(params, function (error, response) {
// 		  if (error) {
// 		  	console.log('error:', error);
// 		  }
// 		  else {
// 		  	var gotit = JSON.stringify(response, null, 2)
// 		    console.log(JSON.stringify(response, null, 2));
// 		  }
		  	
// 		  }
// 		); 0;
// 		console.log('got past')

// 		document.getElementById("response").innerHTML = gotit;
// 		}
	
// 	catch(err) {
//     	console.log(err.message);
// 	}

// }

// </script>