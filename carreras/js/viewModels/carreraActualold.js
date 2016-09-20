define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojgauge'],
        function(oj, ko, $)
        {
            function carreraActualViewModel() {
                
	       var self = this;
	       self.gaugeValue = ko.observable(0);
                
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
                  self.gaugeValue(valores.velocidad1);
           	}
               
               
               function checkIndicadores() {
                    self.gaugeValue(self.gaugeValue() - 5);
		//    req.open("GET", 'http://localhost:4000/carreras/actual', true);
                //    req.overrideMimeType("application/json");
		//    req.send();	                                              
               }

	      self.updateTitle = function(e, data) {
			if(data.option == "value") {
				$("#gauge1").attr('title', "Value: " +          
                                     Math.round(data['value'])+"<br>Max: 100");
				$("#gauge1").ojDialGauge('refresh');
                          console.log("option changing is: " + data['option']);
                              
			}
		}

              self.gaugeValue(30);        
  
            }
  
    
     return carreraActualViewModel;
    
    } 
	
        
);