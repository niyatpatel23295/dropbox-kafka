var mongo = require("./mongo");
var fs = require('fs-extra');
var fs_native = require('fs');
var mongoURL = "mongodb://localhost:27017/demo3";

function handle_share_request(msg, callback){
    try {
        mongo.connect(mongoURL, function(){

            var coll = mongo.collection('creds');

            coll.findOne({username: msg.shareWith}, function(err, user){
                if(err){
                    console.log(err);
                    callback({"error" : "User not found"})
                }
                else{
                    try{

                        if (user) {
                            var filename = msg.path.substr( msg.path.lastIndexOf('/') +1);
                            console.log(filename)
                            fs.createReadStream('./files' + '/' + msg.username + msg.path).pipe(fs.createWriteStream('./files' +'/' + msg.shareWith + '/' + filename));
                            coll.update({username: msg.username}, {
                                $push: {
                                    activity: {
                                        "message": "Shared File " + filename + " with " +msg.shareWith + " on "+ new Date().toUTCString()
                                    }
                                }
                            });
                            callback(null, {message: "File shared!"});
                        } else {
                            callback({"error" : "User not found"})
                        }
                    }
                    catch(e){
                        console.log(e);
                        callback({"error" : "Internal server error"})
                    }
                }
            });
        });
    }
    catch (e){
        console.log(e);
        callback(e,{});
    }
}

exports.handle_share_request = handle_share_request;