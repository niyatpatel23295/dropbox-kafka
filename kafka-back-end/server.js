var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
var listdir = require('./services/listdir');
var upload_file = require('./services/uploaddir');
var download_file = require('./services/downloadfile');
var share_file = require('./services/sharefile');

var consumer_login = connection.getConsumer('new_topic_2');

var producer = connection.getProducer();


consumer_login.on('message', function (message) {
    console.log('backend server js consumer_login: on ', JSON.stringify(message));
    var data = JSON.parse(message.value);
    if(message.key == 'login_api'){
        login.handle_login_request(data.data, function(err,res){
            if(err){
                console.log(err);
                producer.send({error: err}, function(err, data){
                   
                });
                return;
            }
            else{
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                
                producer.send(payloads, function(err, data){
                    
                });
                return;
            }
        });
    }
    else if(message.key == 'signup_api'){
        console.log("Some other request");
        console.log('backend server js consumer_signup: on ', JSON.stringify(message));
        var data = JSON.parse(message.value);
        signup.handle_signup_request(data.data, function(err, res){
            if(err){
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : {error: err}
                        }),
                        partition : 0
                    }
                ];
                console.log('err');
                producer.send(payloads, function(err, res){});
                return;
            }
            else{
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                console.log(payloads)
                producer.send(payloads, function(err, data){});
                return;
            }

        });
    }
    else if(message.key == 'list_directory_api'){
        listdir.handle_listdir_request(data.data, function(err, res){
            try{
                if(err){
                    
                    return;
                }
                else{
                    var payloads = [
                        { topic: data.replyTo,
                            messages:JSON.stringify({
                                correlationId:data.correlationId,
                                data : res
                            }),
                            partition : 0
                        }
                    ];
                    console.log(payloads)
                    producer.send(payloads, function(err, data){});
                    return;
                }
            }
            catch (e){
                
            }

        });
    }

    else if(message.key == 'upload_dir_api'){
        upload_file.handle_upload_request(data.data, function(err, res){
            try{
                if(err){
                    console.log(err);
                    return err;
                }
                else{
                    var payloads = [
                        { topic: data.replyTo,
                            messages:JSON.stringify({
                                correlationId:data.correlationId,
                                data : res
                            }),
                            partition : 0
                        }
                    ];

                    producer.send(payloads, function(err, data){});
                    return;
                }
            }
            catch (e){
                console.log(e)
            }

        });
    }

    else if(message.key == 'download_file_api'){
        download_file.handle_download_request(data.data, function(err, res){
            try{
                if(err){
                    console.log(err);
                    return err;
                }
                else{
                    var payloads = [
                        { topic: data.replyTo,
                            messages:JSON.stringify({
                                correlationId:data.correlationId,
                                data : res
                            }),
                            partition : 0
                        }
                    ];

                    producer.send(payloads, function(err, data){});
                    return;
                }
            }
            catch (e){
                console.log(e)
            }

        });
    }

    else if(message.key == 'share_file_api'){
        share_file.handle_share_request(data.data, function(err, res){
            try{
                if(err){
                    console.log(err);
                    return err;
                }
                else{
                    var payloads = [
                        { topic: data.replyTo,
                            messages:JSON.stringify({
                                correlationId:data.correlationId,
                                data : res
                            }),
                            partition : 0
                        }
                    ];

                    producer.send(payloads, function(err, data){});
                    return;
                }
            }
            catch (e){
                console.log(e)
            }

        });
    }
});


