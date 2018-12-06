var express = require('express');
var stripe = require('stripe')('sk_test_xJYsnTIczDoCpOJ591lv6FkQ');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//cross origin start
var cors = require('cors');
var originsWhitelist = [
'http://localhost:4200'
];
var corsOptions = {
origin: function(origin, callback){
var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
callback(null, isWhitelisted);
},
credentials:true
}
app.use(cors(corsOptions));
//cross origin end
app.post('/payme',(req,res)=>{
    console.log('The body is ',req.body);
    var charge = stripe.charges.create({
        amount: 230000,
        currency: 'gbp',
        source: req.body.token
      },(err,charge)=>{
          if(err){
              throw err;
          }
          res.json({
              success : true,
              message : "Payment Done"
          })
      });
})

 
app.listen(3000,()=>{
    console.log('Server starts at port 3000');
});