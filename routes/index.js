var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Salary Calculator' });
});

router.get('/SalaryCalculator', function(req, res, next) {
  res.render('salarycalculator', { title: 'Kalkulator wynagrodzenia' });
});

router.get('/privacypolicy', function(req, res, next) {
  res.render('privacypolicy', { title: 'Privacy Policy' });
});

router.get('/termsandconditions', function(req, res, next) {
  res.render('termsandconditions', { title: 'Terms & Conditions' });
});

module.exports = router;