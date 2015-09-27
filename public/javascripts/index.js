function _ajax(type, url, cb) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function (res) {
        cb(res, res.target.response);
    };
    xmlhttp.open(type, url);
    xmlhttp.send();
}

_ajax("GET", "/api", function (res, data) {
    console.log(JSON.parse(data));
});
