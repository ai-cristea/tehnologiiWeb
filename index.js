var http = require("http");

// create a server object
http.createServer(function(req, res){
    res.write("Hello world!");
    res.end();
})
    .listen(8080);