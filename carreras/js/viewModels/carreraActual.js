define(['ojs/ojcore', 'knockout', 'jquery', 'data/data', 'ojs/ojgauge', 'ojs/ojchart'],
        function(oj, ko, $, data)
        {
            function carreraActualViewModel() {
                
	       var self = this;

               var attrGroups = new oj.ColorAttributeGroupHandler();
                
                var categories = ["Max", "Prom", "Min"];
		self.barGroupsValue= ko.observableArray(categories);
                var categoricalSeries1 = [{items: []}];
                var categoricalSeriesItems1 = categoricalSeries1[0].items;
                    categoricalSeriesItems1.push({value: 0, color: attrGroups.getValue(categories[0]), categories: [categories[0]]});
                    categoricalSeriesItems1.push({value: 0, color: attrGroups.getValue(categories[1]), categories: [categories[1]]});
                    categoricalSeriesItems1.push({value: 0, color: attrGroups.getValue(categories[2]), categories: [categories[2]]});
                  
                
                self.barSeriesValue1= ko.observableArray(categoricalSeries1);
                
 		var categoricalSeries2 = [{items: []}];
                var categoricalSeriesItems2 = categoricalSeries2[0].items;
                    categoricalSeriesItems2.push({value: 0, color: attrGroups.getValue(categories[0]), categories: [categories[0]]});
                    categoricalSeriesItems2.push({value: 0, color: attrGroups.getValue(categories[1]), categories: [categories[1]]});
                    categoricalSeriesItems2.push({value: 0, color: attrGroups.getValue(categories[2]), categories: [categories[2]]});
                  
                
                self.barSeriesValue2= ko.observableArray(categoricalSeries2);
               
		var categoricalSeries3 = [{items: []}];
                var categoricalSeriesItems3 = categoricalSeries3[0].items;
                    categoricalSeriesItems3.push({value: 0, color: attrGroups.getValue(categories[0]), categories: [categories[0]]});
                    categoricalSeriesItems3.push({value: 0, color: attrGroups.getValue(categories[1]), categories: [categories[1]]});
                    categoricalSeriesItems3.push({value: 0, color: attrGroups.getValue(categories[2]), categories: [categories[2]]});
                  
                
                self.barSeriesValue3= ko.observableArray(categoricalSeries3);

		var categoricalSeries4 = [{items: []}];
                var categoricalSeriesItems4 = categoricalSeries4[0].items;
                    categoricalSeriesItems4.push({value: 0, color: attrGroups.getValue(categories[0]), categories: [categories[0]]});
                    categoricalSeriesItems4.push({value: 0, color: attrGroups.getValue(categories[1]), categories: [categories[1]]});
                    categoricalSeriesItems4.push({value: 0, color: attrGroups.getValue(categories[2]), categories: [categories[2]]});
                  
                
                self.barSeriesValue4= ko.observableArray(categoricalSeries4);
               
               
               
               self.gaugeValue1 = ko.observable(50);
	       self.gaugeValue2 = ko.observable(50);
               self.gaugeValue3 = ko.observable(50);
	       self.gaugeValue4 = ko.observable(50);

               self.lalerta = false;
   
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
/*
                data.fetchData('http://localhost:4000/carreras/actual').then(function (actual) {
                  self.carrera_actual = actual;
                  document.getElementById('corredor1').innerHTML = self.carrera_actual.corredor1;
                  document.getElementById('corredor2').innerHTML = self.carrera_actual.corredor2;
                  document.getElementById('corredor3').innerHTML = self.carrera_actual.corredor3;
                  document.getElementById('corredor4').innerHTML = self.carrera_actual.corredor4;
                  if (self.carrera_actual.corredor1 == 0) {
			 document.getElementById("gauge-container1").hidden = true;
			 document.getElementById("sparkChart-container1").hidden = true;  
                  } else {  		   
                         document.getElementById("gauge-container1").hidden = false;
			 document.getElementById("sparkChart-container1").hidden = false;  
                  }
		 if (self.carrera_actual.corredor2 == 0) {
			 document.getElementById("gauge-container2").hidden = true;
			 document.getElementById("sparkChart-container2").hidden = true;  
                  } else {  		   
                         document.getElementById("gauge-container2").hidden = false;
			 document.getElementById("sparkChart-container2").hidden = false;  
                  }
                 if (self.carrera_actual.corredor3 == 0) {
			 document.getElementById("gauge-container3").hidden = true;
			 document.getElementById("sparkChart-container3").hidden = true;  
                  } else {  		   
                         document.getElementById("gauge-container3").hidden = false;
			 document.getElementById("sparkChart-container3").hidden = false;  
                  }    
		 if (self.carrera_actual.corredor4 == 0) {
			 document.getElementById("gauge-container4").hidden = true;
			 document.getElementById("sparkChart-container4").hidden = true;  
                  } else {  		   
                         document.getElementById("gauge-container4").hidden = false;
			 document.getElementById("sparkChart-container4").hidden = false;  
                  }  
                }).fail(function (error) {
                    console.log('Error in getting Actual data: ' + error.message);
                });

*/
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
 
                                
                  var valores = JSON.parse(resp);
                  self.gaugeValue1(valores.skull_speed);
                  
	          self.sparkValues1.push(valores.skull_speed);
                  self.gaugeValue2(valores.ground_shock_speed);
	          self.sparkValues2.push(valores.ground_shock_speed);
                  self.gaugeValue3(valores.guardian_speed);
	          self.sparkValues3.push(valores.guardian_speed);
                  self.gaugeValue4(valores.thermo_speed);
	          self.sparkValues4.push(valores.thermo_speed);  
                
 // Calculo de Promedios
	
                  var attrGroups = new oj.ColorAttributeGroupHandler();
                  var categories = ["Max", "Prom", "Min"];
                  var categoricalSeries1 = [{items: []}];
                  var categoricalSeriesItems1 = categoricalSeries1[0].items;
                  max = 0;
                  min = 0; 
                  prom = 0;
                   
                  var lista1 = self.sparkValues1();
                   
                  for (i = 0; i < lista1.length; i++) {
                      
                      if (max < lista1[i]) { max = lista1[i]; }
                      if (lista1[i] > 0) { if (min > lista1[i]) { min = lista1[i]; } }
                      if (min == 0) { min = lista1[i]; }
                      prom = prom + lista1[i];      
                  }
                  prom = prom / lista1.length;
                  
                    categoricalSeriesItems1.push({value: max, color: attrGroups.getValue(categories[0]), categories: [categories[0]]});
                    categoricalSeriesItems1.push({value: prom, color: attrGroups.getValue(categories[1]), categories: [categories[1]]});
                    categoricalSeriesItems1.push({value: min, color: attrGroups.getValue(categories[2]), categories: [categories[2]]});
               
                  self.barSeriesValue1(categoricalSeries1);

		  var categoricalSeries2 = [{items: []}];
                  var categoricalSeriesItems2 = categoricalSeries2[0].items;
                  max = 0;
                  min = 0; 
                  prom = 0;
                   
                  var lista1 = self.sparkValues2();
                   
                  for (i = 0; i < lista1.length; i++) {
                      
                      if (max < lista1[i]) { max = lista1[i]; }
                      if (lista1[i] > 0) { if (min > lista1[i]) { min = lista1[i]; } }
                      if (min == 0) { min = lista1[i]; }
                      prom = prom + lista1[i];      
                  }
                  prom = prom / lista1.length;
                  
                    categoricalSeriesItems2.push({value: max, color: attrGroups.getValue(categories[0]), categories: [categories[0]]});
                    categoricalSeriesItems2.push({value: prom, color: attrGroups.getValue(categories[1]), categories: [categories[1]]});
                    categoricalSeriesItems2.push({value: min, color: attrGroups.getValue(categories[2]), categories: [categories[2]]});
               
                  self.barSeriesValue2(categoricalSeries2);

		 var categoricalSeries3 = [{items: []}];
                  var categoricalSeriesItems3 = categoricalSeries3[0].items;
                  max = 0;
                  min = 0; 
                  prom = 0;
                   
                  var lista1 = self.sparkValues3();
                   
                  for (i = 0; i < lista1.length; i++) {
                      
                      if (max < lista1[i]) { max = lista1[i]; }
                      if (lista1[i] > 0) { if (min > lista1[i]) { min = lista1[i]; } }
                      if (min == 0) { min = lista1[i]; }
                      prom = prom + lista1[i];      
                  }
                  prom = prom / lista1.length;
                  
                    categoricalSeriesItems3.push({value: max, color: attrGroups.getValue(categories[0]), categories: [categories[0]]});
                    categoricalSeriesItems3.push({value: prom, color: attrGroups.getValue(categories[1]), categories: [categories[1]]});
                    categoricalSeriesItems3.push({value: min, color: attrGroups.getValue(categories[2]), categories: [categories[2]]});
               
                  self.barSeriesValue3(categoricalSeries3);
                    
 		  var categoricalSeries4 = [{items: []}];
                  var categoricalSeriesItems4 = categoricalSeries4[0].items;
                  max = 0;
                  min = 0; 
                  prom = 0;
                   
                  var lista1 = self.sparkValues4();
                   
                  for (i = 0; i < lista1.length; i++) {
                      
                      if (max < lista1[i]) { max = lista1[i]; }
                      if (lista1[i] > 0) { if (min > lista1[i]) { min = lista1[i]; } }
                      if (min == 0) { min = lista1[i]; }
                      prom = prom + lista1[i];      
                  }
                  prom = prom / lista1.length;
                  
                    categoricalSeriesItems4.push({value: max, color: attrGroups.getValue(categories[0]), categories: [categories[0]]});
                    categoricalSeriesItems4.push({value: prom, color: attrGroups.getValue(categories[1]), categories: [categories[1]]});
                    categoricalSeriesItems4.push({value: min, color: attrGroups.getValue(categories[2]), categories: [categories[2]]});
               
                  self.barSeriesValue4(categoricalSeries4);

                  self.skull_laptime(valores.skull_laptime);
                  document.getElementById("skull_laptime").innerHTML = "Vuelta: " + valores.skull_laptime;
                  self.ground_shock_laptime(valores.ground_shock_laptime);
                  document.getElementById("ground_shock_laptime").innerHTML = "Vuelta: " + valores.ground_shock_laptime;
                  self.thermo_laptime(valores.thermo_laptime);
	          document.getElementById("thermo_laptime").innerHTML = "Vuelta: " + valores.thermo_laptime;
                  self.guardian_laptime(valores.guardian_laptime);
	          document.getElementById("guardian_laptime").innerHTML = "Vuelta: " + valores.guardian_laptime;
                  self.skull_best_laptime(valores.skull_best_laptime);
    	          document.getElementById("skull_best_laptime").innerHTML = "Mejor Vuelta: " + valores.skull_best_laptime;
                  self.ground_shock_best_laptime(valores.ground_shock_best_laptime);
    	          document.getElementById("ground_shock_best_laptime").innerHTML = "Mejor Vuelta: " + valores.ground_shock_best_laptime;
                  self.thermo_best_laptime(valores.thermo_best_laptime);
    	          document.getElementById("thermo_best_laptime").innerHTML = "Mejor Vuelta: " + valores.thermo_best_laptime;
                  self.guardian_best_laptime(valores.guardian_best_laptime);
                  document.getElementById("guardian_best_laptime").innerHTML = "Mejor Vuelta: " + valores.guardian_best_laptime;
                     
                   if (valores.alerta != "") {
                      
                       if (! self.lalerta) {
                          alert(valores.alerta);
                         }
                        self.lalerta = true;  
                       }
                
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
                  
		    req.open("GET", 'http://rpi:9999/carrera', true);
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