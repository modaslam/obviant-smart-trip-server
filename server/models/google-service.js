'use strict';
let googleApiKey = 'AIzaSyBKZcWtZRqoo9i2uiV_2jIZT-fD9f1T5tE';

module.exports = function(Googleservice) {
/**
 * Get places using google web service
 * @param {string} searchString search string
 * @param {Function(Error, object)} callback
 */
  Googleservice.places = function(searchString, callback) {

    Googleservice.googleAutocomplete(searchString,googleApiKey,function(err,res){
      if(err) callback(err);
      callback(null,res);
    });
    // TODO

  };



/**
 * Get geocode data using google api
 * @param {string} address Address to be geocoded
 * @param {Function(Error, object)} callback
 */

  Googleservice.geocode = function(address, callback) {
    var data;
    // TODO
    Googleservice.googleGeocode(address,googleApiKey,function(err,res){
      if(err) callback(err);
      callback(null,res);
    });
  };


/**
 * Get geocode data using google api
 * @param {string} latlng latlng to be reverse geocoded
 * @param {Function(Error, object)} callback
 */

  Googleservice.reverseGeocode = function(latlng, callback) {
    var data;
    // TODO
    Googleservice.googleReverseGeocode(latlng, googleApiKey, function(err,res){
      if(err) callback(err);
      callback(null,res);
    });
  };



/**
 * Get geocode data using google api
 * @param {string} origin latlng origin
 * @param {string} destination latlng destination
 * @param {string} waypoints address of waypoints
 * @param {Function(Error, object)} callback
 */

  Googleservice.directions = function(origin, destination, waypoints, callback) {
    var data;
    // TODO
    Googleservice.googleDirections(origin, destination, waypoints, googleApiKey, function(err,res){
      if(err) callback(err);
      callback(null,res);
    });
  };

/**
 * Get geocode data for fuel stations ranked by distance using google api
 * @param {string} location latlng origin
 * @param {string} rankby Parameter to rank results
 * @param {string} type type of place, i.e, establishment, gas_station, point_of_interest
 * @param {Function(Error, object)} callback
 */

  Googleservice.nearbySearch = function(location, rankby, type, callback) {
    var data;
    // TODO
    Googleservice.googleNearbySearch(location, rankby, type, googleApiKey, function(err,res){
      if(err) callback(err);
      callback(null,res);
    });
  };
};
