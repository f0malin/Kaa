var MongoClient = require('mongodb').MongoClient;
var connectStr;

exports.init = function(str) {
    connectStr = str;
};

exports.find = function(col, cond, callback) {
    MongoClient.connect(connectStr, function(err, db) {
        if (err) throw err;

        db.collection(col).find(cond).toArray(function(err, docs) {
            if (err) throw err;
            callback(docs);
            db.close();
        });
    });
};

exports.find_one = function(col, cond, callback) {
    exports.find(col, cond, function(docs) {
        callback(docs[0]);
    });
};

exports.insert = function(col, data, callback) {
    MongoClient.connect(connectStr, function(err, db) {
        if (err) throw err;

        db.collection(col).insert(data, {w: 1}, function(err, objects) {
            callback();
            db.close();
        });
    });
};

exports.now = function() {
    return new Date().getTime()/1000;
};