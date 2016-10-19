define(['ojs/ojcore', 'knockout', 'jquery', 'data/data', 'ojs/ojknockout',  'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
        function (oj, ko, $, data)
          { 
             
            function carrerasViewModel() {
                
	       var self = this;
               self.carreras = ko.observableArray([{id:1, nombre: "hernan"},{id:2, nombre: "hernan"}]);
               self.data = ko.observableArray();
                
               data.fetchData('http://localhost:4000/carreras').then(function (lista) {
                  
               self.carreras(lista);
                 
                }).fail(function (error) {
                    console.log('Error in getting People data: ' + error.message);
               });
		

	       self.dataSource = new oj.ArrayTableDataSource(self.carreras, {idAttribute: "id"});

      
            }          
            
     return carrerasViewModel;
         
   }	
        
);        