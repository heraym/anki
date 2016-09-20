define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
        function(oj, ko, $)
        {
            function carrerasViewModel() {
                
	       var self = this;
               
               self.datasource = ko.observable();
               self.fila = ko.observable(0);
               self.id = ko.observable(0);
               self.nombre = ko.observable('');
	       self.descripcion = ko.observable('');
               self.fecha = ko.observable('');
               self.corredor1_id = ko.observable(0);
               self.corredor1_nombre = ko.observable('');
               self.corredor1_titulo = ko.observable('');
               self.corredor1_empresa = ko.observable('');
	       self.corredor1_puesto = ko.observable(0);
               self.corredor1_tiempo = ko.observable('');
               self.corredor2_id = ko.observable(0);
               self.corredor2_nombre = ko.observable('');
               self.corredor2_titulo = ko.observable('');
               self.corredor2_empresa = ko.observable('');
	       self.corredor2_puesto = ko.observable(0);
               self.corredor2_tiempo = ko.observable('');
               self.corredor3_id = ko.observable(0);
               self.corredor3_nombre = ko.observable('');
               self.corredor3_titulo = ko.observable('');
               self.corredor3_empresa = ko.observable('');
	       self.corredor3_puesto = ko.observable(0);
               self.corredor3_tiempo = ko.observable('');
               self.corredor4_id = ko.observable(0);
               self.corredor4_nombre = ko.observable('');
               self.corredor4_titulo = ko.observable('');
               self.corredor4_empresa = ko.observable('');
	       self.corredor4_puesto = ko.observable(0);
               self.corredor4_tiempo = ko.observable('');
               self.detalleVisible = ko.observable('hidden');
               
            self.carrerasdata = [{"id":1,"nombre":"Carrera hecha en Pto Madero","descripcion":"Carrera hecha en Pto Madero","fecha":"2016-01-01","corredor1":1,"corredor2":2,"corredor3":3,"corredor4":4,"primero":1,"segundo":2,"tercero":3,"cuarto":4,"tiempo":10000}];
            self.carreras = ko.observableArray(self.carrerasdata);
            self.datasource(new oj.ArrayTableDataSource(self.carreras, {idAttribute: 'id'}));           
    
         // Valores iniciales
            self.corredor1_nombre = "Juan Perez";
            self.corredor1_titulo = "Tecnico de Soporte";
            self.corredor1_empresa = "Atencion al Cliente";
            self.corredor1_puesto = 1;
            self.corredor1_tiempo = "2m30s";  
	    self.corredor2_nombre = "Carla Lopez";	
            self.corredor2_titulo = "Tecnico de Soporte";
            self.corredor2_empresa = "Atencion al Cliente";
            self.corredor2_puesto = 2;
            self.corredor2_tiempo = "3m30s";                          
  	    self.corredor3_nombre = "Jorge Lopez";	
            self.corredor3_titulo = "Tecnico de Soporte";
            self.corredor3_empresa = "Atencion al Cliente";
            self.corredor3_puesto = 3;
            self.corredor3_tiempo = "3m40s";                          
  	    self.corredor4_nombre = "Pedro Lopez";	
            self.corredor4_titulo = "Tecnico de Soporte";
            self.corredor4_empresa = "Atencion al Cliente";
            self.corredor4_puesto = 4;
            self.corredor4_tiempo = "3m50s";                          
        }
  
    vm = new carrerasViewModel;
         
 self.onchange = function (event,data)
    {
        self.detalleVisible = 'visible';
        document.getElementById('detalle').style.visibility = "visible";
         
        if (data == null) { 
         self.fila = 0;
        } else {
        var newCurrentRow = data.currentRow;
        self.fila = newCurrentRow['rowIndex'];}
                    
        var i = vm.carreras()[self.fila];
        self.id = i.id;    
        
        self.nombre = vm.carreras()[self.fila].nombre; 
        document.getElementById('nombre').innerHTML = self.nombre;
        self.fecha = vm.carreras()[self.fila].fecha; 
        document.getElementById('fecha').innerHTML = self.fecha;
        self.descripcion = vm.carreras()[self.fila].descripcion; 
        document.getElementById('descripcion').innerHTML = self.descripcion;
       
        self.corredor1_id = vm.carreras()[self.fila].corredor1;
        document.getElementById('foto1').src = self.getFoto1();
        
        self.corredor1_nombre = "Juan Perez";
        document.getElementById('nombre1').innerHTML = self.corredor1_nombre;
         
        
        self.corredor1_titulo = "Tecnico de Soporte";
        document.getElementById('titulo1').innerHTML = self.corredor1_titulo;
        self.corredor1_empresa = "Atencion al Cliente";
        document.getElementById('empresa1').innerHTML = self.corredor1_empresa;

        self.corredor1_puesto = 1;
        document.getElementById('puesto1').innerHTML = self.corredor1_puesto;

        self_corredor1_tiempo = "2m30s";           
        document.getElementById('tiempo1').innerHTML = self.corredor1_tiempo;

     };

    self.getFoto1 = function () {
    
    self.corredor1_id = 100;
    return 'css/images/people/' + self.corredor1_id + '.png'
    };

    self.getFoto2 = function () {
    
    self.corredor2_id = 101;
    return 'css/images/people/' + self.corredor2_id + '.png'
    };

    self.getFoto3 = function () {
    
    self.corredor3_id = 102;
    return 'css/images/people/' + self.corredor3_id + '.png'
    };
     
    self.getFoto4 = function () {
    
    self.corredor4_id = 103;
    return 'css/images/people/' + self.corredor4_id + '.png'
    };
     
     return carrerasViewModel;
 }
	        
);