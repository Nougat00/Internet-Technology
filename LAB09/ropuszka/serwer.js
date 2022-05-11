/*jshint globalstrict: true, devel: true, node: true, esversion: 6*/
'use strict';

let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let favicon = require('serve-favicon');
let morgan = require('morgan');
let baza = require('./db/products');

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    let categories = baza().distinct("category");
    res.render('index.ejs', {categories: categories});
});

app.get('/:cat', function (req, res) {
    let categories = baza().distinct("category");
    let products = baza({category: req.params.cat}).select("product", "price");
    let category = req.params.cat;
    res.render('index.ejs', {categories: categories, products: products, category: category});
});

app.post('/:cat', function (req, res) {
    let newPrice=req.body.price;
    let newProduct=req.body.product;
    let category = req.params.cat;
    console.log(newProduct, newPrice);
    let categories = baza().distinct("category");
    let products = baza({category: category}).select("product", "price");
    res.render('index.ejs', {categories: categories, products: products, category: category});
});


app.listen(3000, function () {
    console.log('Serwer działa na porcie 3000');
});


process.on('SIGINT',function(){
  console.log('\nshutting down');
  process.exit();
});
