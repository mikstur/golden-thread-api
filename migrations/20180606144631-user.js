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

      db.createTable('user', {
        id: {
          type: 'int',
          primaryKey: true
        },
        full_name: {
          type: 'string',
          length: 40
        },
        dob: {
          type: 'date'
        },
        email: {
          type: 'string',
          length: 50
        }
      }, callback);
      
};

exports.down = function (db, callback) {
  db.dropTable('user', callback);
};

exports._meta = {
  'version': 1
};