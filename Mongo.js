var MongoDB = require("mongodb");
var MongoClient = MongoDB.MongoClient;
var connectStr;

var db;

exports.init = function(str, callback) {
    connectStr = str;
    MongoClient.connect(connectStr, function(err, database) {
        if (err) throw err;
        db = database;
        callback();
    });
};

exports.db = function() {
    return db;
};

exports.find = function(col, cond, callback) {
    db.collection(col).find(cond).toArray(function(err, docs) {
        if (err) throw err;
        callback(docs);
    });
};

exports.find_one = function(col, cond, callback) {
    exports.find(col, cond, function(docs) {
        callback(docs[0]);
    });
};

exports.insert = function(col, data, callback) {
    db.collection(col).insert(data, {w: 1}, function(err, objects) {
        callback(err, objects);
    });
};

exports.isDuplicate = function(err) {
    if (err && err.message.indexOf('E11000 ') !== -1) {
        return true;
    } else {
        return false;
    }
};

exports.now = function() {
    return new Date().getTime()/1000;
};

exports.oid = function(hex) {
    return new MongoDB.ObjectID(hex);
};