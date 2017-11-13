var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var fs = require('fs-extra');
var fs_native = require('fs');
var mongo = require("./mongo");

function handle_download_request(msg, callback){
    try {
        fs_native.readFile('./files/' + msg.username + '/' + msg.path, function (err, res) {
            if(err){
                console.log(err)
            }
            else{
                callback(null, res);
            }
        })
    }
    catch (e){
        console.log(e);
        callback(e,{});
    }
}

exports.handle_download_request = handle_download_request;