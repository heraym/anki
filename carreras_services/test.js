var orawrap = require('./db/orawrap-master/lib/orawrap.js');
var dbConfig = {
    user: 'carreras',
    password: 'carreras',
    connectString: 'localhost/xe'
};

//Setting the connection info only needs to be done once as it's stored internally
orawrap.setConnectInfo(dbConfig);

//Orawrap's execute method will handle obtaining a connection and then release
//it after execution
orawrap.execute(
   'SELECT employee_id, ' +
   '   first_name, ' +
   '   last_name, ' +
   '   phone_number, ' +
   '   hire_date ' +
   'FROM employees',
   function(err, results) {
      if (err) {
         throw err;
      }

      //process results
   }
);