'use strict';

module.exports = function(Progress) {
  Progress.frequentItemset = function(data, callback) {
    const fi = require('frequent-itemset');

	// data.list is the array of itemsets, 
	// data.support is the support count
	// 0.75 the relative support -> no. of transactions where item exists/total transactions,
	// i.e, absolute support by total transactions
	// maximum for relative support is 1 and minimum 0
	let ans = fi(
	  data.list,
	  data.support,
	  true
	);
	
/*{"list":  [
    ["4", "5", "3"],
    ["1", "2", "3"],
    ["4", "6", "3"],
    ["4", "5", "3", "1", "2"]
  ], "support": 0.5}*/
	
    callback(null, ans);
  }

  Progress.remoteMethod('frequentItemset', {
    accepts: [
      {arg: 'data', type: 'object', required: true, http: { source: 'body' }},
    ],
    http: {path: '/frequentItemset', verb: 'post'},
    returns: { arg: 'data', type: 'any'}
  });
};
