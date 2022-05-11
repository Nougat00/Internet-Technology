/*jshint globalstrict: true, devel: true, node: true, esversion: 6*/
"use strict";

let express = require("express");
let app = express();
let path = require("path");
let bodyParser = require("body-parser");
let favicon = require("serve-favicon");
let morgan = require("morgan");
let baza = require("./db/products");
let fs = require("fs");
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  let categories = baza().distinct("category").sort();
  res.render("index.ejs", { categories: categories });
});

app.get("/:cat", function (req, res) {
  let categories = baza().distinct("category").sort();
  let products = baza({ category: req.params.cat }).select("product", "price");
  let category = req.params.cat;
  res.render("index.ejs", {
    categories: categories,
    products: products,
    category: category,
  });
});

app.post("/:cat", function (req, res) {
  let newPrice = req.body.price;
  let newProduct = req.body.product;
  let login = req.body.login;
  let password = req.body.haslo;
  let category = req.params.cat;

  if (login === "admin" && password === "nimda") {
    console.log(newProduct, newPrice);
    baza.insert(
      { product: newProduct, price: newPrice, category: category },
      false
    );
  } else {
    console.log("Niepoprawne dane logowania");
  }
  let categories = baza().distinct("category").sort();
  let products = baza({ category: category }).select("product", "price");
  res.render("index.ejs", {
    categories: categories,
    products: products,
    category: category,
  });
});

app.listen(3000, function () {
  console.log("Serwer działa na porcie 3000");
});

function makeJSON(db) {
  return (
    `var TAFFY = require('taffydb').taffy;
    var products = TAFFY(` +
    JSON.stringify(db, ["product", "price", "category"]) +
    `);
    module.exports = products;`
  );
}

process.on("SIGINT", function () {
  console.log("\nshutting down");
  fs.writeFileSync("db/products.js", makeJSON(baza().get()));
  process.exit();
});