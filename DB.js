var mysql = require("mysql");
var uid = require("uid-safe").sync;

var _db;

exports.init = function(info) {
    _db = mysql.createConnection(info);
};

exports.find_one = function(sql, params, callback) {
    _db.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(null);
        } else {
            console.log(rows[0]);
            callback(rows[0]);
        }
    });
};

exports.find = function(sql, params, callback) {
    _db.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(null);
        } else {
            callback(rows);
        }
    });
}

exports.uid = function() {
    return uid(24);
};