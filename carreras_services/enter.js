var express = require("express"),
    http = require("http"),
    app = express();
    hvac = { "listaHVAC": [{ id: "0-AM", latitud: -34.609060, longitud: -58.363088 , ultimo_alerta: 0, desc_alerta: "", puerta_abierta: false, location: "Oficinas Oracle",  temp: 24.5, amperage: 50, viscosidad: 0.4, vibracion: 1, estado: 1, connstatus: "", desc:"Este potente sistema de 4 toneladas ofrece una excelente capacidad de enfriamiento de la mayoria de las salas y oficinas." },
           { id: "0-UIHQ", latitud: -34.611888, longitud: -58.432629, ultimo_alerta:0, desc_alerta: "",  puerta_abierta: false, location: "Avellaneda 164, Buenos Aires", temp: 24.5, amperage: 50, viscosidad: 0.4, vibracion: 1, estado: 1, connstatus: "", desc: "Sistema de 4-vias de Samsung que integra perfectamente en cualquier ambiente. Tambien puede proporcionar hasta 48.000 BTU de la capacidad tanto de manera eficiente y en silencio."  },
           { id: "0-54BQ", latitud: -34.606850, longitud: -58.375186 , ultimo_alerta:0, desc_alerta: "", puerta_abierta: false, location: "Florida 100, Buenos Aires", temp: 24.5, amperage: 50, viscosidad: 0.4, vibracion: 1, estado: 1, connstatus: "", desc: "Utiliza refrigerante R410A, que no agota la capa de ozono. Bandeja de base compuesto resistente a la corrosion absorbe el sonido y material compuesto es mas fuerte que el acero." }]}

function formatTime(unixTimestamp) {

    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var dt = new Date(unixTimestamp);
    var day = dt.getDate();
    var monthIndex = dt.getMonth();
    var year = dt.getFullYear();

    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();

    // the above dt.get...() functions return a single digit
    // so I prepend the zero here when needed
    if (hours < 10) 
     hours = '0' + hours;

    if (minutes < 10) 
     minutes = '0' + minutes;

    if (seconds < 10) 
     seconds = '0' + seconds;

    return hours + ":" + minutes + ":" + seconds + " el " + day + " de " + meses[monthIndex] + " de " + year;
}       

   
function getHVACs() {         
                
datos1 = "";
var optionsHVAC = {
   // host : 'www-proxy.us.oracle.com', // here only the domain name
    host : 'localhost',
    port : 7101,
    path : 'http://localhost:7101/iot/api/v1/messages?type=DATA', // the rest of the url with parameters if needed
    method : 'GET', // do GET
    auth: 'iot:welcome1',
    headers: {
       Host: 'localhost'
    }
};


// do the GET request
var reqHVAC = http.request(optionsHVAC, function(resHVAC) {

    resHVAC.on('data', function(d) {
        datos1 += d;
    });

    resHVAC.on('end', function(d) {
    datosHVAC = JSON.parse(datos1); 
    
    for (i =0; i < datosHVAC.length; i++) {
       dispId = datosHVAC[i].source;
       
    
       for (j=0; j < hvac.listaHVAC.length; j++) {
          if (hvac.listaHVAC[j].id == dispId) {            
            hvac.listaHVAC[j].temp = datosHVAC[i].payload.data.outputTemp;
	    hvac.listaHVAC[j].vibracion = datosHVAC[i].payload.data.vibration;
            hvac.listaHVAC[j].viscosidad = datosHVAC[i].payload.data.oilViscosity;
	    hvac.listaHVAC[j].amperage = datosHVAC[i].payload.data.motorAmperage;
	    
	    
          }
       }  
     
    }
     
          
                
    });
    resHVAC.on('error', function(e) {
        console.info('ERROR:\n');
        console.info(e);
                 
    });

});

reqHVAC.end();

}

/********************************************************************************************/
function getAlerts() {         
                
datos2 = "";
var optionsAlert = {
   // host : 'www-proxy.us.oracle.com', // here only the domain name
    host : 'localhost',
    port : 7101,
    path : 'http://localhost:7101/iot/api/v1/messages?type=ALERT', // the rest of the url with parameters if needed
    method : 'GET', // do GET
    auth: 'iot:welcome1',
    headers: {
       Host: 'localhost'
    }
};


// do the GET request
var reqAlert = http.request(optionsAlert, function(resAlert) {

    resAlert.on('data', function(d) {
        datos2 += d;
    });

    resAlert.on('end', function(d) {
    datosAlert = JSON.parse(datos2); 
    
    for (i =0; i < datosAlert.length; i++) {
       if (datosAlert[i].eventTime < 1442973839984) { continue; }
       dispId = datosAlert[i].source;
       
       
       for (j=0; j < hvac.listaHVAC.length; j++) {
          if (hvac.listaHVAC[j].id == dispId) {
            
            if (datosAlert[i].receivedTime > hvac.listaHVAC[j].ultimo_alerta) { 
              if (datosAlert[i].payload.format == "urn:com:oracle:hvac:alert:dooropened") {
                  hvac.listaHVAC[j].puerta_abierta = datosAlert[i].payload.data.breach_door_opened; }
              else {
                  hvac.listaHVAC[j].puerta_abierta = datosAlert[i].payload.data.open;
              }
              hvac.listaHVAC[j].ultimo_alerta = datosAlert[i].receivedTime;
              if (hvac.listaHVAC[j].puerta_abierta) {
                 hvac.listaHVAC[j].estado = 0;
                 hvac.listaHVAC[j].desc_alerta = "Se abrio la puerta a las " + formatTime(hvac.listaHVAC[j].ultimo_alerta);
              } 
              else { hvac.listaHVAC[j].estado = 1; }  

            }	     
          }
       }  
     
    }
     
          
                
    });
    resAlert.on('error', function(e) {
        console.info('ERROR:\n');
        console.info(e);
                 
    });

});

reqAlert.end();

}

/***********************************************************************************************/
/*************************************************************************************/

app.get('/hvac', function(req,res) {

getHVACs();
getAlerts()
setTimeout(function() {
    res.writeHead(200, {"Content-Type": "application/json"}); 
    res.end(JSON.stringify(hvac)); 

}, 2000);

});

app.listen(3000);
console.log("Node server running on http:localhost:3000");
 