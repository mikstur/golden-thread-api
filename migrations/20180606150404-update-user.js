'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {

  db.addColumn('user', 'firstname', {
    type: 'string',
    length: 50
  }, function(err) {
    if (err) return callback(err);

    db.addColumn('user', 'lastname', {
      type: 'string',
      length: 50
    }, function(err) {
      if (err) return callback(err);

      db.removeColumn('user', 'full_name', function(err) {
        if (err) return callback(err);

        return callback();
      });
    });
  });
      
};

exports.down = function (db, callback) {
  
  db.addColumn('user', 'full_name', {
    type: 'string',
    length: 50
  }, function(err) {
    if (err) return callback(err);

    db.removeColumn('user', 'lastname', function(err) {
      if (err) return callback(err);

      db.removeColumn('user', 'firstname', function(err) {
        if (err) return callback(err);

        return callback();
      })
    });
  });

};

exports._meta = {
  'version': 1
};