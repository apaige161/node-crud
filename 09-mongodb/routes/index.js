var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
//check if everything went right
//used in testing
var assert = require('assert');
  //db is test, not the same as a collection
var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  //render index.html
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  //set var to an array
  var resultArray = [];
  //open connection
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
      //db collection FROM the database 'test' that we are targeting is 'user-data'
    var cursor = db.collection('user-data').find();
    //loop over all items in 'user-data'
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  //create item to store data within the function
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  //grab id
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    //.updateOne( *this is how it is identified* {"_id": objectId(id)}, 
    // * mongo uses $set to set the NEW 'item' * {$set: item},
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  //connect to db
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    //delete item by id
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log(result);
      //close connection
      db.close();
    });
  });
});

//export router
module.exports = router;
