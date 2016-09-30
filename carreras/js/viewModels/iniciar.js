/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'data/data',  'ojs/ojknockout', 'ojs/ojselectcombobox', 'promise', 'ojs/ojButton'],
function(oj, ko, $, data)
{   
    /**
     * The view model for the header module
     */

    function IniciarViewModel() {
     var self = this;
     this.nombre = ko.observable('nombre');
     this.lugar = ko.observable('lugar');
     this.corredor1 = ko.observable();
     this.corredor2 = ko.observable();
     this.corredor3 = ko.observable();
     this.corredor4 = ko.observable();

     this.iniciar = function(data, event){
        
        var url = 'http://localhost:4000/carreras/iniciar?' + 'nombre=' + this.nombre() + 
        '&lugar=' + this.lugar() + '&corredor1=' + this.corredor1() + '&corredor2=' + this.corredor2() + 
        '&corredor3=' + this.corredor3() + '&corredor4=' + this.corredor4();
        req.open("POST", url, true);
        req.overrideMimeType("application/json");
	req.send();
        alert("Carrera Iniciada");
        return true;
     }    

     this.opciones = ko.observableArray([]); 

     this.data = ko.observableArray();
		
    		
     data.fetchData('http://localhost:4000/carreras/corredores').then(function (corredores) {
	
        for (i = 0; i < corredores.length; i++) { 
          var opcion = { value: 0, label: ""};

          opcion.label = corredores[i].apellido + " " + corredores[i].nombre;
          opcion.value = corredores[i].id;
 
          self.opciones.push(opcion);
        }  
     
        }).fail(function (error) {
                    console.log('Error in getting People data: ' + error.message);
       });
     
    }
     
// iniciar carrera
	
       function createRequest() {
          var result = null;
	  if (window.XMLHttpRequest) {
	     // FireFox, Safari, etc.
	      result = new XMLHttpRequest();
	      if (typeof result.overrideMimeType != 'undefined') {
		 result.overrideMimeType('text/xml'); // Or anything else
	       }
	    } 
           else if (window.ActiveXObject) {
	       // MSIE
	        result = new ActiveXObject("Microsoft.XMLHTTP");
	        } 
	        else {
		  // No known mechanism -- consider aborting the application
	         }
	     return result;
	    }
               
	  var req = createRequest(); // defined above
		
               // Create the callback:
		req.onreadystatechange = function() {
 		 if (req.readyState != 4) return; // Not there yet
 		 if (req.status != 200) {
 		   // Handle request failure here...
                    
 		   return;
	         }
		  // Request successful, read the response
		  //var resp = req.responseText.replace(/\\"/g, '"');
                  //resp = resp.replace(/"{/g, "{");
                  //resp = resp.replace(/}"/g, "}");
 
                  
                  //var valores = JSON.parse(resp);
                }
 

                        
            
    return IniciarViewModel;
});

