var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    user: [
      {userId: 1, userName: 'チョッパー'},
      {userId: 2, userName: 'Dr.クレハ'}
    ]
  });
});

router.get('/:id', function(req, res, next) {
  res.json({
    user: {userId: 1, userName: 'チョッパー'}
  });
});

router.post('/', function(req, res, next) {
  console.log(req.params);
  res.json({
    user: {userId: 3, userName: 'ラブーン'}
  })
});

router.put('/:id', function(req, res, next) {
  console.log(req.params);
  res.json({
    user: {userId: 1, userName: 'トニートニー・チョッパー'}
  });
});

router.delete('/:id', function(req, res, next) {
  console.log(req.params);
  res.json({
    user: {userId: 2, userName: 'Dr.クレハ'}
  });
});

module.exports = router;
