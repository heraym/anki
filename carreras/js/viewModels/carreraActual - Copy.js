define(['ojs/ojcore', 'knockout', 'jquery', 'data/data', 'ojs/ojgauge', 'ojs/ojchart'],
        function(oj, ko, $, data)
        {
            function carreraActualViewModel() {
                
	       var self = this;
	       self.gaugeValue1 = ko.observable(50);
	       self.gaugeValue2 = ko.observable(50);
               self.gaugeValue3 = ko.observable(50);
	       self.gaugeValue4 = ko.observable(50);
   
               self.corredor1_desc = ko.observable("Juan Perez");
               self.corredor2_desc = ko.observable("Juan Perez");
               self.corredor3_desc = ko.observable("Juan Perez");
               self.corredor4_desc = ko.observable("Juan Perez");
               self.skull_laptime = ko.observable(0);
               self.ground_shock_laptime = ko.observable(0);
               self.thermo_laptime = ko.observable(0);
	       self.guardian_laptime = ko.observable(0);
	       self.skull_best_laptime = ko.observable(0);
    	       self.ground_shock_best_laptime = ko.observable(0);
    	       self.thermo_best_laptime = ko.observable(0);
    	       self.guardian_best_laptime = ko.observable(0);
               self.carrera_actual = ko.observable();

               self.corredores = ko.observableArray([]);
               self.data = ko.observableArray();
        	
                data.fetchData('http://localhost:4000/carreras/corredores').then(function (people) {
                  self.corredores(people);
                }).fail(function (error) {
                    console.log('Error in getting People data: ' + error.message);
                });
                data.fetchData('http://localhost:4000/carreras/actual').then(function (actual) {
                  self.carrera_actual = actual;
                  document.getElementById('corredor1').innerHTML = self.carrera_actual.corredor1;
                  document.getElementById('corredor2').innerHTML = self.carrera_actual.corredor2;
                  document.getElementById('corredor3').innerHTML = self.carrera_actual.corredor3;
                  document.getElementById('corredor4').innerHTML = self.carrera_actual.corredor4;
                    
                }).fail(function (error) {
                    console.log('Error in getting Actual data: ' + error.message);
                });


               window.setInterval(checkIndicadores, 3000);

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
		  var resp = req.responseText.replace(/\\"/g, '"');
                  resp = resp.replace(/"{/g, "{");
                  resp = resp.replace(/}"/g, "}");
 
                  //alert(resp);                 
                  var valores = JSON.parse(resp);
                  self.gaugeValue1(valores.skull);
                  
	          self.sparkValues1.push(valores.skull);
                  self.gaugeValue2(valores.ground_shock);
	          self.sparkValues2.push(valores.ground_shock);
                  self.gaugeValue3(valores.guardian);
	          self.sparkValues3.push(valores.guardian);
                  self.gaugeValue4(valores.thermo);
	          self.sparkValues4.push(valores.thermo);           	
		  
                  self.skull_laptime(valores.skull_laptime);
                  document.getElementById("skull_laptime").innerHTML = "Tiempo de Vuelta: " + valores.skull_laptime;
                  self.ground_shock_laptime(valores.ground_shock_laptime);
                  document.getElementById("ground_shock_laptime").innerHTML = "Tiempo de Vuelta: " + valores.ground_shock_laptime;
                  self.thermo_laptime(valores.thermo_laptime);
	          //document.getElementById("thermo_laptime").innerHTML = "Tiempo de Vuelta: " + valores.thermo_laptime;
                  self.guardian_laptime(valores.guardian_laptime);
	          //document.getElementById("guardian_laptime").innerHTML = "Tiempo de Vuelta: " + valores.guardian_laptime;
                  self.skull_best_laptime(valores.skull_best_laptime);
    	          //document.getElementById("skull_best_laptime").innerHTML = "Mejor Tiempo de Vuelta: " + valores.skull_best_laptime;
                  self.ground_shock_best_laptime(valores.ground_shock_best_laptime);
    	          //document.getElementById("ground_shock_best_laptime").innerHTML = "Mejor Tiempo de Vuelta: " + valores.ground_shock_best_laptime;
                  self.thermo_best_laptime(valores.thermo_best_laptime);
    	          //document.getElementById("thermo_best_laptime").innerHTML = "Mejor Tiempo de Vuelta: " + valores.thermo_best_laptime;
                  self.guardian_best_laptime(valores.guardian_best_laptime);
                  //document.getElementById("guardian_best_laptime").innerHTML = "Mejor Tiempo de Vuelta: " + valores.guardian_best_laptime;
                  
                    
                
 			}
               
               function checkIndicadores() {
                  //  self.gaugeValue1(self.gaugeValue1() - 5);
		  //  self.sparkValues1.push(self.gaugeValue1());
		  //  self.gaugeValue2(self.gaugeValue2() - 5);
		  //  self.sparkValues2.push(self.gaugeValue2());
		  //  self.gaugeValue3(self.gaugeValue3() - 5);
		  //  self.sparkValues3.push(self.gaugeValue3());
		  //  self.gaugeValue4(self.gaugeValue4() - 5);
		  //  self.sparkValues4.push(self.gaugeValue4());
		    req.open("GET", 'http://localhost:4000/autos', true);
                    req.overrideMimeType("application/json");
		    req.send();	                                             
                    
               }

	      self.updateTitle = function(e, data) {
			if(data.option == "value") {
				$("#gauge1").attr('title', "Value: " +          
                                     Math.round(data['value'])+"<br>Max: 100");
				$("#gauge1").ojDialGauge('refresh');
			}
		}

              var colorHandler = new oj.ColorAttributeGroupHandler();
              self.lineWithAreaColor = colorHandler.getValue('lineWithAreaColor');
              /* chart data */
         
            self.sparkValues1 = ko.observableArray([0]);
            self.sparkValues2 = ko.observableArray([0]);
            self.sparkValues3 = ko.observableArray([0]);
            self.sparkValues4 = ko.observableArray([0]);


            }
  
    
     return carreraActualViewModel;
    
    } 
	
        
);