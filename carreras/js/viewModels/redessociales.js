define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtagcloud', 'ojs/ojlistview'], 
     function (oj, ko, $)
        {
            function redesSocialesViewModel() {
		this.tags = [];
                palabras = [{id:"Carreras", total:10},{id:"Oracle", total:5}, {id:"IOT", total:7}, {id:"Anki", total:1}, {id:"Bluetooth", total:4}]
	        for (var i=0; i< palabras.length; i++) {
	           var dato = palabras[i];
        	   this.tags.push({
	               id: dato['id'],
        	       label: dato['id'],
          	       value: dato['total'],
         	       shortDesc: dato['id']+': '+dato['total']+'% de personas'
        	   });
     	        }
             }

	       

       return redesSocialesViewModel;
      } 	
        
);