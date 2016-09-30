var express = require("express"),
    http = require("http"),
    app = express(),
    db = require("./carreras_db"),
    cors = require("cors");


carreras = [];
carreraActual = { nombre: "", lugar: "", corredor1: 0, corredor2: 0, corredor3: 0, corredor4:0, fecha:null};
    
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json());


// Lista de Corredores
app.get('/carreras/corredores', function(req,res) { 
 db.obtenerCorredores(function(corredores) {
        res.writeHead(200, {"Content-Type": "application/json"}); 
        res.end(JSON.stringify(corredores));  
 });
            
});

// Nuevo Corredor
app.post('/carreras/corredores/nuevo', function(req,res) { 
 console.log('nuevo corredor');
 db.nuevoCorredor(req.query.apellido, req.query.nombre, req.query.puesto, req.query.empresa, req.query.email, req.query.telefono, req.query.twitter);
 var output = "{ resultado: 'OK'}";
 res.writeHead(200, {"Content-Type": "application/json"}); 
 res.end(JSON.stringify(output));  
});

app.post('/carreras/actual', function(req,res) {
  velocidad1 = req.body.velocidad1;
  velocidad2 = req.body.velocidad2;
  velocidad3 = req.body.velocidad3;
  velocidad4 = req.body.velocidad4;
res.end();
});

app.get('/carreras', function(req,res) {
        
      db.obtenerCarreras(function(carreras) {
         console.log(carreras); });
           

      res.writeHead(200, {"Content-Type": "application/json"}); 
      res.end(JSON.stringify("OK"));      
      
    });

app.post('/carreras/iniciar', function(req,res) {

carreraActual.nombre = req.query.nombre;
carreraActual.lugar = req.query.lugar;
carreraActual.corredor1 = req.query.corredor1;
carreraActual.corredor2 = req.query.corredor2;
carreraActual.corredor3 = req.query.corredor3;
carreraActual.corredor4 = req.query.corredor4;
carreraActual.fecha = Date.now(); // fecha en milisegundos

db.iniciarCarrera(req.query.nombre, req.query.lugar, req.query.corredor1, req.query.corredor2, req.query.corredor3, req.query.corredor4);
var output = "{ resultado: 'OK'}";
     res.writeHead(200, {"Content-Type": "application/json"}); 
    res.end(JSON.stringify(output)); 

});



app.listen(4000);
console.log("Node server running on http:localhost:4000");
 