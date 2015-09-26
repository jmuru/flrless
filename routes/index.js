var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/anime', function(req, res) {
	res.render('anime', { title: 'Anime Page' } )
});


module.exports = router;
