var express = require("express"),
    http = require("http"),
    app = express();
    cors = require("cors");
    skull = 0;
    ground_shock = 0;
    thermo = 0;
    guardian = 0;

app.use(cors());

  
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

   
function getAutos() {         
                
datos1 = "";
var optionsAuto = {
   // host : 'www-proxy.us.oracle.com', // here only the domain name
    host : 'ankiot.opcau.com',
    port : 7101,
    path : 'http://ankiot.opcau.com:7101/iot/api/v1/messages?type=DATA&limit=5', // the rest of the url with parameters if needed
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
    datosAuto = JSON.parse(datos1); 
    var lskull = true;
    var ground_shock = true;
    var thermo = true;
    var guardian = true;
     
     for (i =0; i < datosAuto.length; i++) {
       dispId = datosAuto[i].source;
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

app.get('/autos', function(req,res) {

console.log("obtener info autos");
getAutos();

setTimeout(function() {
    res.writeHead(200, {"Content-Type": "application/json"}); 
    res.end(JSON.stringify("{" +'"' + "skull" + '"' + ":" + skull + "," + '"' + 
                              "thermo" + '"' + ":" + thermo + "," + '"' + 
                              "guardian" +  '"' + ":" + guardian + "," + '"' +
                              "ground shock" + '"' + ":" + ground_shock + "}")); 

}, 2000);

});

app.listen(3000);
console.log("Node server running on http:localhost:3000");
 