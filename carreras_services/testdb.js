var express = require("express"),
    http = require("http"),
    db = require("./carreras_db");
    app = express();
    

app.post('/iniciar', function(req,res) {

db.iniciarCarrera("uno","lugar", 1,2,3,4);
var output = "{ resultado: 'OK'}";
     res.writeHead(200, {"Content-Type": "application/json"}); 
    res.end(JSON.stringify(output)); 

});

app.listen(3000);
console.log("Node server running on http:localhost:3000");
 