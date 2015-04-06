var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    user: [
      {id: 1, name: 'チョッパー'},
      {id: 2, name: 'Dr.クレハ'}
    ]
  });
});

router.get('/:id', function(req, res, next) {
  res.json({
    user: {id: 1, name: 'チョッパー'}
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.json({
    user: {id: 3, name: 'ラブーン'}
  })
});

router.put('/:id', function(req, res, next) {
  res.json({
    user: {id: 1, name: 'トニートニー・チョッパー'}
  });
});

router.delete('/:id', function(req, res, next) {
  res.json({
    user: {id: 2, name: 'Dr.クレハ'}
  });
});

module.exports = router;
