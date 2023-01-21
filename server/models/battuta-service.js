'use strict';
let battutaApiKey = 'dc098566e0cb99ff8bb02ac0f311ff06';

module.exports = function(BattutaService) {

  /**
  * Get list of countries using battuta api
  * @param {Function(Error, object)} callback
  */

  BattutaService.countries = function(callback) {
    var data;
    // TODO
    BattutaService.battutaCountries(battutaApiKey, function(err,res){
      if(err) callback(err);
	  else
      callback(null, res);
    });
  };

  /**
  * Get list of regions using battuta api
  * @param {string} countryCode Country code of regions
  * @param {Function(Error, object)} callback
  */

  BattutaService.regions = function(countryCode, callback) {
    var data;
    // TODO
    BattutaService.battutaRegions(countryCode, battutaApiKey, function(err,res){
      if(err) callback(err);
      callback(null, res);
    });
  };

    
  BattutaService.location = function(type, countryCode, region, callback) {
    const request = require('request');
    let key = 'dc098566e0cb99ff8bb02ac0f311ff06';
    let url = 'http://battuta.medunes.net/api/';
    switch(type) {
      case 'country':
        url += 'country/all?key=' + key;
        break;
      case 'region':
        url += 'region/' + countryCode + '/all?key=' + key;
        break;
      case 'city':
        url += 'city/' + countryCode + '/search?region=' + region + '&key=' + key;
        break;
    }

    request(url, (err, res) => {
      if(err) {
        callback(err);
      }
      else {
        callback(null, JSON.parse(res.body));
      }
    });
  }

  BattutaService.remoteMethod('location', {
    accepts: [
      {arg: 'type', type: 'string', required: true},
      {arg: 'countryCode', type: 'string', required: false},
      {arg: 'region', type: 'string', required: false},
    ],
    http: {path: '/:type/:countryCode/:region/location'},
    returns: { arg: 'data', type: 'object'}
  });

};
