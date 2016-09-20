define(['ojs/ojcore', 'knockout', 'utils', 'ojs/ojrouter', 'ojs/ojmodel','data/data','ojs/ojknockout', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
        function(oj, ko, utils, data)
        {
            function detalleIncidenteViewModel() {
                
  
	       var self = this;
                
               self.texto = ko.observable([]);
               self.texto().uno = "Hernan";
               var router = oj.Router.rootInstance;
               alert(router.getChildRouter());
               

               self.handleActivated = function (info) {
                    var parentRouter = info.valueAccessor().params.ojRouter.parentRouter;
                    
                    // Retrieve the childRouter instance created in main.js
                    self.empRouter = parentRouter.currentState().value;

                    self.empRouter.configure(function (stateId) {
                        var state;
                        if (stateId) {
                            var data = stateId.toString();
                            state = new oj.RouterState(data, {
                                value: data,
                                // For each state, before entering the state,
                                // make sure the data for it is loaded.
                                canEnter: function () {
                                    // The state transition will be on hold
                                    // until loadData is resolved.
                                    return self.loadData(data);
                                }
                            });
                        }
                        return state;
                    });

                    // Returns the sync promise to handleActivated. The next
                    // phase of the ojModule lifecycle (attached) will not be
                    // executed until sync is resolved.
                    return oj.Router.sync();
                };

                 
            
         }  


          return detalleIncidenteViewModel;
        }
);