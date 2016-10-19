define(['ojs/ojcore', 'knockout', 'ojs/ojtimeline'],  
  function(oj, ko)
  {
    function PlanificacionViewModel() 
    {	
     var self = this;	  
      self.series = ko.observableArray([]);
      self.series = [{"id":"e1","title":"Digital Transformation Summit","start": "Oct 18, 2016","description":"Oct 18, 2016"},  {"id":"e2","title":"Visita al Centro de Innovacion","start": "Oct 23, 2016","description":"Oct 23, 2016"}];     
     
    };    
   return PlanificacionViewModel;
  }
);