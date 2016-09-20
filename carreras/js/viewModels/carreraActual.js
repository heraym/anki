define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojgauge', 'ojs/ojchart'],
        function(oj, ko, $)
        {
            function carreraActualViewModel() {
                
	       var self = this;
	       self.gaugeValue1 = ko.observable(50);
	       self.gaugeValue2 = ko.observable(50);
               self.gaugeValue3 = ko.observable(50);
	       self.gaugeValue4 = ko.observable(50);
 
               window.setInterval(checkIndicadores, 2000);

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
                  self.gaugeValue1(valores.velocidad1);
	          self.sparkValues1.push(valores.velocidad1);
                  self.gaugeValue2(valores.velocidad2);
	          self.sparkValues2.push(valores.velocidad2);
                  self.gaugeValue3(valores.velocidad3);
	          self.sparkValues3.push(valores.velocidad3);
                  self.gaugeValue4(valores.velocidad4);
	          self.sparkValues4.push(valores.velocidad4);           	}
               
               
               function checkIndicadores() {
                    self.gaugeValue1(self.gaugeValue1() - 5);
		    self.sparkValues1.push(self.gaugeValue1());
		    self.gaugeValue2(self.gaugeValue2() - 5);
		    self.sparkValues2.push(self.gaugeValue2());
		    self.gaugeValue3(self.gaugeValue3() - 5);
		    self.sparkValues3.push(self.gaugeValue3());
		    self.gaugeValue4(self.gaugeValue4() - 5);
		    self.sparkValues4.push(self.gaugeValue4());
		//    req.open("GET", 'http://localhost:4000/carreras/actual', true);
                //    req.overrideMimeType("application/json");
		//    req.send();	                                             
                    
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