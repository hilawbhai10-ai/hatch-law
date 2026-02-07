## Development loger schema


timestamp: HH:mm:ss,
level : info,Warn,Error,
message : string,
request_id : UUID
service :{
    service_name : "auth",
    Error_caused?: "DB", "Redis" or any 3rd party microservice
},
Status_code : number,
method : HTPP Method or ws for websockets
"url" : string,
error_detail? : error_message,
duration : ms (millesconeds)
ip_addreass : IP    