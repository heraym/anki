
// Datos base de datos
var oracledb = require("oracledb");

usuarioDB = "carreras";
passwordDB = "carreras";
connectStringDB = "localhost/XE";
resultado = "";

// Obtener Carreras
  
 exports.obtenerCarreras = function() {
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
      "SELECT id, nombre "
    + "FROM carreras ",
      function(err, result)
      {
        if (err) { console.error(err.message); return; }
        var i = 0;
       this.resultado = "{ 'carreras': [";
       for (i=0;i<1;i++) {
         this.resultado = this.resultado + "{ 'id':" + result.rows[i][0] + "}";
       }
       this.resultado = this.resultado + "]}";
       console.log('resultado:' + this.resultado); 
      });
     });
       
   } 

exports.datos = function () {
console.log('resultado2:' + resultado);
return resultado;
}