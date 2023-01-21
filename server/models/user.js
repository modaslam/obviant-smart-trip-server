'use strict';

module.exports = function(User) {
	/* Webservices */
	require('../webservices/shared/upload-image')(User, 'uploadThumbnail', 'thumbImageUrl', 'thumbnail');
};
