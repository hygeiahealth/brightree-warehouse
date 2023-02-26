/*
	UIA/3
	Brightree Data Warehouse
	2018-10-09 gbk
*/

const log4js = require('log4js');
const logger = log4js.getLogger('Warehouse');

const mysql = require('mysql');

var Connection;
async function Init(Config) {
	//console.log(JSON.stringify(Config,null,4));
	Connection = mysql.createConnection(Config);
	return new Promise(function(pass) {
		Connection.connect(function(error) {
			if (error) throw error;
			logger.debug('connected as threadId ' + Connection.threadId);
			pass();
		});
	});
}

async function Query(SQL,Placeholders) {
	// logger.debug(SQL);
	// 2020-04-22; use fail() here instead of throwing
	return new Promise(function(pass,fail) {
		Connection.query(SQL,Placeholders, function(error, results, fields) {
			if(error) return fail(error);

			// logger.debug(JSON.stringify(results,null,4));

			pass(results);
		});
	});
}

module.exports = {
	Init,
	Query
};
