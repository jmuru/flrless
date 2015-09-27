"use strict";


function _ajax(type, url, cb) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function(res) { // xmlHttp 2
    	if(this.status == 200){ // xmlHttp 2
    		var data = JSON.parse(res.target.response); // xmhHttp2
        	cb(res, data); 
        }
    };
    xmlhttp.open(type, url);
    xmlhttp.send();
}

_ajax("GET", "/api", function(res, data) {
	var _json = JSON.parse(data);
	console.log(_json)
});