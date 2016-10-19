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
    since = 1475526650112; // arranca en inicio de carrera


carreras = [];
carreraActual = { nombre: "", lugar: "", corredor1: 0, corredor2: 0, corredor3: 0, corredor4:0, fecha:null};
    
app.use(cors());

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


/***********************************************************************************************/
// Nuevo Corredor
/*************************************************************************************/

app.post('/carreras/corredores/nuevo', function(req,res) { 
 console.log('nuevo corredor');
 db.nuevoCorredor(req.query.apellido, req.query.nombre, req.query.puesto, req.query.empresa, req.query.email, req.query.telefono, req.query.twitter);
 var output = "{ resultado: 'OK'}";
 res.writeHead(200, {"Content-Type": "application/json"}); 
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
    host : 'localhost',
    port : 7101,
    path : 'http://localhost:7101/iot/api/v1/messages?type=DATA&limit=10&since=' + since, // the rest of the url with parameters if needed
    method : 'GET', // do GET
    auth: 'iot:welcome1',
    headers: {
       Host: 'ankiot.opcau.com'
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

    var lskull = true;
    var lground_shock = true;
    var lthermo = true;
    var lguardian = true;
     
     for (i =0; i < datosAuto.length; i++) {
       dispId = datosAuto[i].source;
       
      // console.log(datosAuto[i].payload.format + "---" + datosAuto[i].payload.data.carName);
       //speed
       if (datosAuto[i].payload.format == "urn:oracle:iot:device:data:anki:car:speed") {
	   if (datosAuto[i].payload.data.carName=="Skull")
                {  if (lskull) {
                  skull = datosAuto[i].payload.data.speed;
                  lskull = false;}
                }   
	    if (datosAuto[i].payload.data.carName=="Ground Shock")
                {  if (lskull) {
                  ground_shock = datosAuto[i].payload.data.speed;
                  lground_shock = false;}
                }   
	    if (datosAuto[i].payload.data.carName=="Thermo")
                {  if (lthermo) {
                  thermo = datosAuto[i].payload.data.speed;
                  lthermo = false;}
                }   
            if (datosAuto[i].payload.data.carName=="Guardian")
                {  if (lguardian) {
                  guardian = datosAuto[i].payload.data.speed;
                  lguardian = false;}
                }   
       }  
     // lap
    if (datosAuto[i].payload.format == "urn:oracle:iot:device:data:anki:car:lap") {
	  console.log("lap:" + datosAuto[i].payload.data.lapTime); 
          if (datosAuto[i].payload.data.carName=="Skull") {   
               skull_laptime = datosAuto[i].payload.data.lapTime;
               if (skull_laptime < skull_best_laptime) {
                skull_best_laptime = skull_laptime;
               }
            }   
	   if (datosAuto[i].payload.data.carName=="Ground Shock") { 
               ground_shock_laptime = datosAuto[i].payload.data.lapTime;
	       if (ground_shock_laptime < ground_shock_best_laptime) {
                ground_shock_best_laptime = ground_shock_laptime;
               }
            }
           if (datosAuto[i].payload.data.carName=="Thermo") {
               thermo_laptime = datosAuto[i].payload.data.lapTime;
	       if (thermo_laptime < thermo_best_laptime) {
                thermo_best_laptime = thermo_laptime;
               }
            }   
           if (datosAuto[i].payload.data.carName=="Guardian") {
               guardian = datosAuto[i].payload.data.lapTime; 
               if (guardian_laptime < guardian_best_laptime) {
                guardian_best_laptime = guardian_laptime;
               }
            }   
       }       
     // since
       if (datosAuto[i].receivedTime > since) {
           since =  datosAuto[i].receivedTime + 1;
       }
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

console.log("obtener info autos");
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
 