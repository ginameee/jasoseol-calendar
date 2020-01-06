const { Pool } = require('pg');
const dbConfig = require('../config/dbConfig');
const dbPool = new Pool(dbConfig);

module.exports.dbPool = dbPool;

