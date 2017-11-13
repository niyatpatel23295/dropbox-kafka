var mongo = require("./mongo");
var fs = require('fs-extra');
var fs_native = require('fs');

function handle_listdir_request(msg, callback){
        try {

            var path = msg.path == undefined ? '/'         :       msg.path.startsWith('/') ? msg.path.endsWith('/') ? msg.path : msg.path + '/'   :   msg.path.endsWith('/') ? '/' + msg.path : '/' + msg.path + '/';
            
            var filesList = fs.readdirSync('./files/' + msg.username + path );
            
            var files = [];
            var folders = [];
            var result = {};
            console.log("filesList", filesList);
            filesList.forEach(function(item, index){
                if(fs_native.statSync('./files/' + msg.username + path + item).isFile()) files.push({"file": item, "path": path + item });
                else folders.push(item);
            });
            result.files = files;
            result.folders = folders;
            callback(null, result);
        }
        catch (e){
            console.log(e);
            callback(e,{});
        }
}

exports.handle_listdir_request = handle_listdir_request;