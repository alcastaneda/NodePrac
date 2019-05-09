const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Benefits Calculator' });
});

router.post('/getPrice', function(req, res, next) {
  const data = req.body;
  const peopleCount = Object.keys(req.body).length / 3;
  let price = 0;
  for ( var i =0; i < peopleCount; i++) {
    const firstName = data['firstName'+i.toString()].toLowerCase();
    const lastName = data['lastName'+i.toString()].toLowerCase();
    const employee = data['employee'+i.toString()];

    if (employee === 'true') {
      if (firstName.startsWith('a') || lastName.startsWith('a')) {
        price = price + 900;
      } else { 
        price = price + 1000;
      }
    } else {
      if (firstName.startsWith('a') || lastName.startsWith('a')) {
        price = price + 450;
      } else { 
        price = price + 500;
      }
    }
  }

  const totalPerPaycheck = (52000 - price)/26;
  res.render('result', { totalPay: totalPerPaycheck.toFixed(2), totalDeductions: price });
});

module.exports = router;
