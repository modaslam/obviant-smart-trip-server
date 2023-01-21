module.exports = function (ImageModel, methodName, fieldName, uriField) {
  let pathUri = uriField || 'upload';
  let field = fieldName || 'imageUrl';
  let remoteMethodName = methodName || 'uploadImage';
  let imageField = {};

  ImageModel[remoteMethodName] = function (req, res, fileId, callback) {
    const CONTAINERS_URL = `images/${ImageModel.name}`;
    var FileContainer = ImageModel.app.models.FileStorage;

    FileContainer.getContainer(ImageModel.name, (err, container) => {
      //   if (err) return callback(err);
      if (!err && container) {
        FileContainer.getFile(ImageModel.name, fileId, (err, file) => {
          if (!err && file) {
            FileContainer.removeFile(container, file, (err, file) => {
              if (err) callback(err);
              FileContainer.upload(
                container,
                req,
                res, {
                  container: container.name,
                  getFilename: function (fileInfo, req, res) {
                    var origFilename = fileInfo.name;
                    // optimisticly get the extension
                    var parts = origFilename.split("."),
                      extension = parts[parts.length - 1];

                    // Using a local timestamp + user id in the filename (you might want to change this)
                    var newFilename =
                    fileId + Date.now() + '.' + extension;
                    return newFilename;
                  }
                },
                (err, fileObj) => {
                  if (err) return callback(err);
                  ImageModel.findOne({
                      where: {
                        id: fileId
                      }
                    },
                    (err, imageModel) => {
                      if (err) return callback(err);
                      if (!imageModel)
                        return callback({
                          message: " ImageModel not found"
                        });

                      imageField[field] = CONTAINERS_URL +
                        "/" +
                        fileObj.files.file[0].name;
                      imageModel.updateAttributes(imageField,
                        (err, imageModel) => {
                          if (err) return callback(err);
                          callback(null, {
                            file: fileObj,
                            imageModel
                          });
                        }
                      );
                    }
                  );
                }
              );
            });
          } else {
            FileContainer.upload(
              container,
              req,
              res, {
                container: container.name,
                getFilename: function (fileInfo, req, res) {
                  var origFilename = fileInfo.name;
                  // optimistically get the extension
                  var parts = origFilename.split("."),
                    extension = parts[parts.length - 1];

                  // Using a local timestamp + user id in the filename (you might want to change this)
                  var newFilename =
                  fileId + Date.now() + '.' + extension;
                  return newFilename;
                }
              },
              (err, fileObj) => {
                if (err) return callback(err);
                ImageModel.findOne({
                    where: {
                      id: fileId
                    }
                  },
                  (err, imageModel) => {
                    if (err) return callback(err);
                    if (!imageModel)
                      return callback({
                        message: " ImageModel not found"
                      });

                    imageField[field] = CONTAINERS_URL +
                      "/" +
                      fileObj.files.file[0].name;
                    imageModel.updateAttributes(imageField,
                      (err, imageModel) => {
                        if (err) return callback(err);
                        imageField
                        callback(null, {
                          file: fileObj,
                          imageModel
                        });
                      }
                    );
                  }
                );
              }
            );
          }
        });
      } else {
        FileContainer.createContainer({
          name: ImageModel.name
        }, (err, container) => {
          FileContainer.upload(
            container,
            req,
            res, {
              container: container.name,
              getFilename: function (fileInfo, req, res) {
                var origFilename = fileInfo.name;
                // optimisticly get the extension
                var parts = origFilename.split("."),
                  extension = parts[parts.length - 1];

                // Using a local timestamp + user id in the filename (you might want to change this)
                var newFilename =
                fileId + Date.now() + '.' + extension;
                return newFilename;
              }
            },
            (err, fileObj) => {
              if (err) return callback(err);
              ImageModel.findOne({
                  where: {
                    id: fileId
                  }
                },
                (err, imageModel) => {
                  if (err) return callback(err);
                  if (!imageModel)
                    return callback({
                      message: " Product not found"
                    });

                  imageField[field] = CONTAINERS_URL +
                    "/" +
                    fileObj.files.file[0].name;
                  imageModel.updateAttributes(imageField,
                    (err, imageModel) => {
                      if (err) return callback(err);
                      callback(null, {
                        file: fileObj,
                        imageModel
                      });
                    }
                  );
                }
              );
            }
          );
        });
      }
    });
  };

  ImageModel.remoteMethod(remoteMethodName, {
    http: {
      path: `/${pathUri}/:fileId`,
      verb: "post"
    },
    accepts: [{
        arg: "req",
        type: "object",
        http: {
          source: "req"
        }
      },
      {
        arg: "res",
        type: "object",
        http: {
          source: "res"
        }
      },
      {
        arg: "fileId",
        type: "string"
      }
    ],
    returns: {
      arg: "status",
      type: "string"
    }
  });
};
