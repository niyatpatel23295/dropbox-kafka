var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var fs = require('fs-extra');
var fs_native = require('fs');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/demo3";

function handle_upload_request(msg, callback){
    try {
        mongo.connect(mongoURL, function() {
            var coll = mongo.collection('creds');
            var path = msg.path.startsWith('/') ? msg.path.endsWith('/') ? msg.path : msg.path + '/' : msg.path.endsWith('/') ? '/' + msg.path : '/' + msg.path + '/';

            fs.mkdirsSync('./files/' + msg.username + path);
            var file_buffer = Buffer.from(msg.buffer);
            fs_native.writeFile('./files/' + msg.username + path + msg.originalname, file_buffer, function (err, response) {
                if (err) {
                    callback(err, null);
                }
                else {
                    var filename = msg.originalname
                    coll.update({username: msg.username}, {
                        $push: {
                            activity: {
                                "message": "Uploaded File " + filename + " on " + new Date().toUTCString()
                            }
                        }
                    });
                    callback(null, {"message": "success"});
                }
            });
        });
    }
    catch (e){
    	console.log(e);
        callback(e,{});
    }
}

exports.handle_upload_request = handle_upload_request;