
// Datos base de datos
var oracledb = require("oracledb");

usuarioDB = "carreras";
passwordDB = "carreras";
connectStringDB = "localhost/XE";
 

//  Carreras

exports.obtenerCorredores = function(callback) {

     var conexion; 
     var corredores = [];
     
     oracledb.getConnection(
      {
       user          : "carreras",
       password      : "carreras",
       connectString : "localhost/XE"
      },
     function(err, connection)
      {
       if (err) { console.error(err); return; }

       connection.execute(
      "SELECT id, apellido, nombre, puesto, empresa, cantcarreras, cantganadas, email, telefono, twitter, tiempo "
    + "FROM corredores ",
      function(err, result)
      {
        if (err) { console.error(err.message); return; }
        
       for (i=0;i<result.rows.length;i++) {
         var corredor = {id:0,apellido:"",nombre:"",puesto:"",empresa:"",cantcarreras:0,cantganadas:0,email:"",telefono:"",twitter:"",tiempo:0};
   
         corredor.id = result.rows[i][0];
         corredor.apellido = result.rows[i][1];
         corredor.nombre = result.rows[i][2];
         corredor.puesto = result.rows[i][3];
         corredor.empresa = result.rows[i][4];
         corredor.cantcarreras = result.rows[i][5];
         corredor.cantganadas = result.rows[i][6];
         corredor.email = result.rows[i][7];
         corredor.telefono = result.rows[i][8];
         corredor.twitter = result.rows[i][9];         
	 corredor.tiempo = result.rows[i][10];
         
         corredores.push(corredor);
       }
       return callback(corredores);
      });
     });
       
   } 

 exports.nuevoCorredor = function(apellido, nombre, puesto, empresa, email, telefono, twitter) {
     var conexion;
     oracledb.getConnection(
      {
       user          : "carreras",
       password      : "carreras",
       connectString : "localhost/XE"
      },
     function(err, connection)
      {
       if (err) { console.error(err); return; }
       
   
       connection.execute(
    "insert into corredores (apellido, nombre, puesto, empresa, email, telefono, twitter) "
    + " values('" + apellido+ "','" + nombre + "','" + puesto + "','" + empresa + "','" + email + "','" + telefono + "','" + twitter + "')",
      function(err, result)
      {
        if (err) { console.error(err.message); return; }
        connection.commit();
        
      });
     });
       
   } 
  
 

 exports.iniciarCarrera = function(nombre, lugar, corredor1, corredor2, corredor3, corredor4) {
     var conexion;
     oracledb.getConnection(
      {
       user          : "carreras",
       password      : "carreras",
       connectString : "localhost/XE"
      },
     function(err, connection)
      {
       if (err) { console.error(err); return; }
       console.log(
  "insert into carreras (nombre, descripcion, corredor1, corredor2, corredor3, corredor4) "
    + " values('" + nombre + "','" + lugar + "'," + corredor1 + "," + corredor2 + "," + corredor3 + "," + corredor4 + ")");
  
       connection.execute(
      "insert into carreras (nombre, descripcion, corredor1, corredor2, corredor3, corredor4) "
    + " values('" + nombre + "','" + lugar + "'," + corredor1 + "," + corredor2 + "," + corredor3 + "," + corredor4 + ")",
      function(err, result)
      {
        if (err) { console.error(err.message); return; }
        connection.commit();
        
      });
     });
       
   } 


exports.obtenerCarreras = function(callback) {

     var conexion; 
     var carreras = [];
     
     oracledb.getConnection(
      {
       user          : "carreras",
       password      : "carreras",
       connectString : "localhost/XE"
      },
     function(err, connection)
      {
       if (err) { console.error(err); return; }

       connection.execute(
      "SELECT id, nombre "
    + "FROM carreras ",
      function(err, result)
      {
        if (err) { console.error(err.message); return; }
        
       for (i=0;i<result.rows.length;i++) {
         var carrera = {id:0,nombre:"",descripcion:"",fecha:"",corredor1:0,corredor2:0,corredor3:0,corredor4:0,primero:0,segundo:0,tercero:0,cuarto:0,tiempo:""};
   
         carrera.id = result.rows[i][0];
         carrera.nombre = result.rows[i][1];
         carrera.descripcion = result.rows[i][2];
         carrera.fecha = result.rows[i][3];
         carrera.corredor1 = result.rows[i][4];
         carrera.corredor2 = result.rows[i][5];
         carrera.corredor3 = result.rows[i][6];
         carrera.corredor4 = result.rows[i][7];
         carrera.primero = result.rows[i][8];
         carrera.segundo = result.rows[i][9];         
	 carrera.tercero = result.rows[i][10];
         carrera.cuarto = result.rows[i][11];
         carrera.tiempo = result.rows[i][12];
         carreras.push(carrera);
       }
       return callback(carreras);
      });
     });
       
   } 