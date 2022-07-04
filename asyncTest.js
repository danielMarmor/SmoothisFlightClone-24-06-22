

const { get } = require('request');
const request = require('request');

var responseCounter = 0;

const get_urls = [
    'http://localhost:3000/flights',
    'http://localhost:3000/airlines'
]  
//LoadFlights(1);
LoadMultipleData(); 

function LoadMultipleData(){
   for (var i=0; i<10; i++){ 
        var upperBound = get_urls.length -1;
        var randomIndex = Math.floor(Math.random() * upperBound)  
        var url = get_urls[randomIndex];   
        LoadData(i + 1, url);
   } 
   
}

function LoadData(number, requested_url){
    const url = requested_url;
    request.get(url, {json: true, body: {}}, function(err, res, body) {
        var isResponse = !err && res.statusCode === 200;
        if (isResponse) { 
            console.log(`Call Number ${number}`);       
            var data = body;
            console.log(data) 
            responseCounter += 1
            console.log(responseCounter)       
        }
    });
}

