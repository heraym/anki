var express = require("express"),
    http = require("http"),
    app = express();

   
function incidente() {         

    soap = "<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body>" +
        "<ns1:start xmlns:ns1='http://xmlns.oracle.com/bpmn/bpmnCloudProcess/Resolver_Incidente/ResolverIncidente'" +
        " xmlns:ns2='http://xmlns.oracle.com/bpm/bpmobject/BusinessData/Hvac'><ns2:Hvac><ns2:id>StringValue</ns2:id>" +
        "<ns2:location>StringValue</ns2:location><ns2:descripcion>StringValue</ns2:descripcion>" +
        "<ns2:alerta>StringValue</ns2:alerta></ns2:Hvac></ns1:start></soap:Body></soap:Envelope>";
                
datos1 = "";
var optionsHVAC = {
   // host : 'www-proxy.us.oracle.com', // here only the domain name
    host : 'localhost',
    port : 7003,
    path : 'http://localhost:7003/soa-infra/services/testing/Resolver_Incidente!1.0*soa_303183bc-a426-43c6-bf42-fb224aa0c935/ResolverIncidente.service', // the rest of the url with parameters if needed
    method : 'POST', // do GET
    //auth: 'iot:welcome1',
    headers: {
         'Host': 'localhost',
        'Cookie': 'cookie',
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(soap)
    }
};


// do the GET request
var reqHVAC = http.request(optionsHVAC, function(resHVAC) {

    resHVAC.on('data', function(d) {
        datos1 += d;
    });

    resHVAC.on('end', function(d) {
    datosHVAC = datos1; 
    
     
    console.info(datosHVAC);
     
          
                
    });
    resHVAC.on('error', function(e) {
        console.info('ERROR:\n');
        console.info(e);
                 
    });

});
reqHVAC.write(soap);
reqHVAC.end();

}


/***********************************************************************************************/
/*************************************************************************************/

app.get('/incidente', function(req,res) {

incidente();
setTimeout(function() {
    res.writeHead(200, {"Content-Type": "application/json"}); 
    res.end("OK"); 

}, 2000);

});

app.listen(3000);
console.log("Node server running on http:localhost:3000");
 