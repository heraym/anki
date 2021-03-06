var express = require("express"),
    http = require("http"),
    app = express(),
    db = require("./carreras_db"),
    cors = require("cors");
    skull = 0;
    ground_shock = 0;
    thermo = 0;
    guardian = 0;
    skull_laptime = 0;
    ground_shock_laptime = 0;
    thermo_laptime = 0;
    guardian_laptime = 0;
    skull_best_laptime = 0;
    ground_shock_best_laptime = 0;
    thermo_best_laptime = 0;
    guardian_best_laptime = 0;
     

var fileUpload = require('express-fileupload');


carreras = [];
carreraActual = { nombre: "", lugar: "", corredor1: 0, corredor2: 0, corredor3: 0, corredor4:0, fecha:null};
    
app.use(cors());
app.use(fileUpload());
app.use(express.static('upload'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());


/***********************************************************************************************/
// Lista de Corredores
/*************************************************************************************/


app.get('/carreras/corredores', function(req,res) { 
 db.obtenerCorredores(function(corredores) {
        res.writeHead(200, {"Content-Type": "application/json"}); 
        res.end(JSON.stringify(corredores));  
 });
            
});

app.get('/carreras/corredores/cantidad', function(req,res) { 
 db.cantidadCorredores(function(nro) {
        res.writeHead(200, {"Content-Type": "application/json"});          
        res.end(JSON.stringify(nro));  
 });
            
});

app.get('/carreras/empresas/cantidad', function(req,res) { 
 db.cantidadEmpresas(function(nro) {
        res.writeHead(200, {"Content-Type": "application/json"});          
        res.end(JSON.stringify(nro));  
 });
            
});

app.get('/carreras/corredores/mejor', function(req,res) { 
        db.mejorCorredor(function(corredor) {
        res.writeHead(200, {"Content-Type": "application/json"});          
        res.end(JSON.stringify(corredor));  
 });
            
});

/***********************************************************************************************/
// Nuevo Corredor
/*************************************************************************************/

app.post('/carreras/corredores/nuevo', function(req,res) { 
 console.log('nuevo corredor');
 
 var sampleFile;
 
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
 
    archivo = req.body.apellido + "_" + req.body.nombre + ".png";
    sampleFile = req.files.sampleFile;
    sampleFile.mv('/apps/nodejs/carreras/css/images/people/' + archivo, function(err) {
     /*   if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        } */
    });
// db.nuevoCorredor(req.query.apellido, req.query.nombre, req.query.puesto, req.query.empresa, req.query.email, req.query.telefono, req.query.twitter);
  db.nuevoCorredor(req.body.apellido, req.body.nombre, req.body.puesto, req.body.empresa, req.body.email, req.body.telefono, req.body.twitter);
 var output = "<html><body><h1>Corredor cargado! </h1></body></html>";
 res.writeHead(200, {"Content-Type": "text/html"}); 
 res.end(JSON.stringify(output));  
});


/***********************************************************************************************/
// Lista de Carreras
/*************************************************************************************/

app.get('/carreras', function(req,res) {
        
      db.obtenerCarreras(function(carreras) {           
      res.writeHead(200, {"Content-Type": "application/json"}); 
      res.end(JSON.stringify(carreras));      
	});      
    });

app.get('/carreras/cantidad', function(req,res) { 
 db.cantidadCarreras(function(nro) {
        res.writeHead(200, {"Content-Type": "application/json"});          
        res.end(JSON.stringify(nro));  
 });
            
});


/***********************************************************************************************/
// Iniciar Carrera
/*************************************************************************************/

app.post('/carreras/iniciar', function(req,res) {

carreraActual.nombre = req.query.nombre;
carreraActual.lugar = req.query.lugar;
carreraActual.corredor1 = req.query.corredor1;
carreraActual.corredor2 = req.query.corredor2;
carreraActual.corredor3 = req.query.corredor3;
carreraActual.corredor4 = req.query.corredor4;
carreraActual.fecha = Date.now(); // fecha en milisegundos

//since = carreraActual.fecha;

db.iniciarCarrera(req.query.nombre, req.query.lugar, req.query.corredor1, req.query.corredor2, req.query.corredor3, req.query.corredor4);
var output = "{ resultado: 'OK'}";
     res.writeHead(200, {"Content-Type": "application/json"}); 
    res.end(JSON.stringify(output)); 

});

/***********************************************************************************************/
// Carrera Actual
/*************************************************************************************/
app.get('/carreras/actual', function(req,res) {

     res.writeHead(200, {"Content-Type": "application/json"}); 
    res.end(JSON.stringify(carreraActual)); 

});


/***********************************************************************************************/
// Function para consultar las velocidades en IOT
/*************************************************************************************/

function getAutos() {         
                
datos1 = "";
var optionsAuto = {
   // host : 'www-proxy.us.oracle.com', // here only the domain name
    host : 'raspberrypi.local',
    port : 9999,
    path : 'http://raspberrypi.local:9999/carrera', // the rest of the url with parameters if needed
    method : 'GET', // do GET
    //auth: 'iot:welcome1',
    headers: {
       Host: 'raspberrypi.local'
    }
};


// do the GET request
var reqAuto = http.request(optionsAuto, function(resAuto) {

    resAuto.on('data', function(d) {
        datos1 += d;
    });

    resAuto.on('end', function(d) {
    var datosAuto = "";
    try { datosAuto = JSON.parse(datos1); } catch (err) { console.log(err);}
    if (datosAuto == undefined) {
       console.log(datos1);
       return;} 

       skull = datosAuto.skull_speed;
       ground_shock = datosAuto.ground_shock_speed;
       guardian = datosAuto.guardian_speed;
       thermo = datosAuto.thermo_speed;
       
       skull_laptime = datosAuto.skull_laptime;
       if (skull_laptime < skull_best_laptime) {
                skull_best_laptime = skull_laptime;
        }
    });
    resAuto.on('error', function(e) {
        console.info('ERROR:\n');
        console.info(e);
                 
    });

});

reqAuto.end();

}


/***********************************************************************************************/
/*************************************************************************************/


/***********************************************************************************************/
// Velocidades y datos de los autos en carrera
/*************************************************************************************/

app.get('/autos', function(req,res) {

getAutos();

setTimeout(function() {
    res.writeHead(200, {"Content-Type": "application/json"}); 
    res.end(JSON.stringify("{" +'"' + "skull" + '"' + ":" + skull + "," + '"' + 
                              "thermo" + '"' + ":" + thermo + "," + '"' + 
                              "guardian" +  '"' + ":" + guardian + "," + '"' +
                              "ground_shock" + '"' + ":" + ground_shock + "," + '"' +
			      "skull_laptime" + '"' + ":" + skull_laptime + "," + '"' +
                              "thermo_laptime" + '"' + ":" + thermo_laptime + "," + '"' +
 			      "guardian_laptime" + '"' + ":" + guardian_laptime + "," + '"' +
 			      "ground_shock_laptime" + '"' + ":" + ground_shock_laptime + "," + '"' +
                              "skull_best_laptime" + '"' + ":" + skull_best_laptime + "," + '"' +
                              "thermo_best_laptime" + '"' + ":" + thermo_best_laptime + "," + '"' +
 			      "guardian_best_laptime" + '"' + ":" + guardian_best_laptime + "," + '"' +
 			      "ground_shock_best_laptime" + '"' + ":" + ground_shock_best_laptime  + "}")); 

}, 2000);

});



app.listen(4000);
console.log("Node server running on http:localhost:4000");
 