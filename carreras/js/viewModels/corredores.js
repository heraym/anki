/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['jquery', 'ojs/ojcore', 'knockout', 'utils', 'data/data', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojpagingcontrol', 'ojs/ojpagingcontrol-model'],
        function ($, oj, ko, utils, data)
        {
            function PeopleViewModel() {
                var self = this;
                var defaultLayout = utils.readCookie('peopleLayout');
                if (defaultLayout) {
                    self.peopleLayoutType = ko.observable(defaultLayout);
                } else {
                    self.peopleLayoutType = ko.observable('peopleCardLayout');
                }
                self.allPeople = ko.observableArray([]);
                self.ready = ko.observable(false);
                self.data = ko.observableArray();
		
		
                //data.fetchData('js/data/employees.json').then(function (people) {
		data.fetchData('http://localhost:4000/carreras/corredores').then(function (people) {
                  self.allPeople(people);
                }).fail(function (error) {
                    console.log('Error in getting People data: ' + error.message);
                });
                
	         self.parsePeople = function (response) {
                    return response['employees'];
                };

                self.model = oj.Model.extend({
                    idAttribute: 'empId'
                });

                self.collection = new oj.Collection(null, {
                    url: 'js/data/employees.json',
                    model: self.model
                });

                self.nameSearch = ko.observable('');

                self.filteredAllPeople = ko.computed(function () {
                    var peopleFilter = new Array();

                    if (self.allPeople().length !== 0) {
                        if (self.nameSearch().length === 0)
                        {
                            peopleFilter = self.allPeople();
                        } else {
                            ko.utils.arrayFilter(self.allPeople(),
                                    function (r) {
                                        var token = self.nameSearch().toLowerCase();
                                        if (r.nombre.toLowerCase().indexOf(token) === 0 || r.apellido.toLowerCase().indexOf(token) === 0) {
                                            peopleFilter.push(r);
                                        }
                                    });
                        }
                    }

                    self.ready(true);
                    return peopleFilter;
                });

                self.listViewDataSource = ko.computed(function () {
                    return new oj.ArrayTableDataSource(self.filteredAllPeople(), {idAttribute: 'id'});
                });

                self.cardViewPagingDataSource = ko.computed(function () {
                    return new oj.ArrayPagingDataSource((self.filteredAllPeople()));
                });

                self.cardViewDataSource = ko.computed(function () {
                    return self.cardViewPagingDataSource().getWindowObservable();
                });

                self.getPhoto = function (apellido, nombre) {
                    var src;
                    if (apellido != '') {
                        src = 'css/images/people/' + apellido + '_' + nombre + '.png';
                    } else {
                        src = 'css/images/people/nopic.png';
                    }
                    return src;
                };

                self.getEmail = function (emp) {
                    return "mailto:" + emp.email + '@example.net';
                };

                self.getFacetime = function (emp) {
                    return "#";
                };

                self.getChat = function (emp) {
                    return "#";
                };

                self.getOrg = function (org, event) {
                    alert('This will take you to the employee page and highlight the team infotile');
                };

                

                self.cardLayoutHandler = function () {
                    utils.createCookie('peopleLayout', 'peopleCardLayout');
                    self.peopleLayoutType('peopleCardLayout');
                };

                self.listLayoutHandler = function () {
                    utils.createCookie('peopleLayout', 'peopleListLayout');
                    self.peopleLayoutType('peopleListLayout');
                };

                self.loadPersonPage = function (emp) {
                    if (emp.id) {
                        // Temporary code until go('person/' + emp.id); is checked in 1.1.2
                        history.pushState(null, '', 'index.html?root=person&emp=' + emp.id);
                        oj.Router.sync();
                    } else {
                        // Default id for person is 100 so no need to specify.
                        oj.Router.rootInstance.go('person');
                    }
                };

                self.onEnter = function(data, event){
                    if(event.keyCode === 13){
                        var emp = {};
                        emp.id = data.id;
                        self.loadPersonPage(emp);
                    }
                    return true;
                };
                
                self.changeHandler = function (page, event) {
                    if (event.option === 'selection') {
                        if (event.value[0]) {
                            var emp = {};
                            emp.id = event.value[0];
                            self.loadPersonPage(emp);
                        }
                    }
                };

            }

            return PeopleViewModel;
        });
