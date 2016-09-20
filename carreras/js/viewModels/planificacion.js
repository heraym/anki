define(['ojs/ojcore', 'knockout', 'ojs/ojtimeline'],  
  function(oj, ko)
  {
    function PlanificacionViewModel() 
    {	
     var self = this;	  
      self.series = ko.observableArray([]);
      self.series = [{"id":"e1","title":"Oracle Application Express","start": "Jan 13, 2010","description":"Jan 13, 2010"},  {"id":"e2","title":"Larry Ellison on the Sun-Oracle Close","start": "Jan 27, 2010","description":"Jan 27, 2010"}];     
     
    };    
   return PlanificacionViewModel;
  }
);