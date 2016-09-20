/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojgauge'],
        function (ko, oj, data)
        {
            /* 
             * Your application specific code will go here
             */
            
         
            function DashboardViewModel() {
                var self = this;
                
                self.indicadores = ko.observableArray([]);
                self.indicadores().alertas = 20;

               window.setInterval(checkIndicadores, 10000);
               function checkIndicadores() {
                  //self.indicadores().alertas = 1;
                  //document.getElementById('alertas').innerHTML = self.indicadores().alertas;

               }

                self.personProfile = ko.observableArray([]);
                self.ready = ko.observable(false);
                self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('horizontal');
                self.barSeriesValue = ko.observableArray();
                
                self.averagePerformance = ko.observable();
                self.averagePotential = ko.observable();
                
  // Chart Data
		var attrGroups = new oj.ColorAttributeGroupHandler();
                
                var categories = ["Skull", "Thermo", "Guardian", "Ground Shock"];
                var categoricalSeries = [{items: []}];
                var categoricalSeriesItems = categoricalSeries[0].items;
                    categoricalSeriesItems.push({value: 42, color: attrGroups.getValue(categories[0]), categories: [categories[0]]});
                    categoricalSeriesItems.push({value: 55, color: attrGroups.getValue(categories[1]), categories: [categories[1]]});
                    categoricalSeriesItems.push({value: 36, color: attrGroups.getValue(categories[2]), categories: [categories[2]]});
                    categoricalSeriesItems.push({value: 15, color: attrGroups.getValue(categories[3]), categories: [categories[3]]});

                //self.barSeriesValue(
                //        [{name: "Vel. Max", items: [80, 60, 50, 30]}]
                //        );
                self.barSeriesValue= ko.observableArray(categoricalSeries);
                self.barGroupsValue= ko.observableArray(categories);

                self.legendSections = ko.observableArray(["Skull", "Thermo", "Guardian", "Ground Shock"]);               

                self.router = oj.Router.rootInstance;
                var converterFactory = oj.Validation.converterFactory('number');
                self.percentConverter = converterFactory.createConverter({style: 'decimal', maximumFractionDigits: 0});

                data.fetchData('js/data/employee100.json').then(function (person) {
                    self.personProfile(person);
                    self.ready(true);
                    self.formatAverages();
                }).fail(function (error) {
                    console.log('Error: ' + error.message);
                });

                self.getPhoto = function (id) {
                    if (self.personProfile().empId < 188) {
                        var src = 'css/images/people/' + id + '.png';
                    } else {
                        src = 'css/images/people/nopic.png';
                    }
                    return src;
                };

                self.onEnterLoadPeople = function (data, event) {
                    if (event.keyCode === 13) {
                        self.router.go('people');
                    }
                    return true;
                };
                
                self.onEnterLoadProfile = function (data, event) {
                    if (event.keyCode === 13) {
                        history.pushState(null, '', 'index.html?root=person&emp=100'); 
                        oj.Router.sync();
                    }
                    return true;
                };

                self.formatAverages = function () {
                    self.averagePerformance(self.personProfile().groupAvgRating.toPrecision(2));
                    self.averagePotential(self.personProfile().groupAvgPotential.toPrecision(2));
                };

                self.dashboardItems = ko.observableArray([
                    {"name": "Item1", "title": "Mi Equipo", "target": "people", "sizeClass": "oj-masonrylayout-tile-2x1"},
                    {"name": "Item2", "title": "Mis Notificaciones", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x1"},
                    {"name": "Item3", "title": "Mis Actividades", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x1"},
                    {"name": "Item4", "title": "Actividades de mi equipo", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x2"},
                    {"name": "Item5", "title": "Resolucion Ratio", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x1"},
                    {"name": "Item6", "title": "Garantías por Proveedor", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x1"},
                    {"name": "Item7", "title": "Indicadores Promedio", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x1"},
                    {"name": "Item8", "title": "Average Performance", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x1"},
                    {"name": "Item9", "title": "Historia", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x1"},
                    {"name": "Item10", "title": "About Me", "target": "person", "sizeClass": "oj-masonrylayout-tile-1x1"}
                ]);

                
            }

            return DashboardViewModel;

        });
