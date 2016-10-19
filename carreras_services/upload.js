var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
 
// default options 
app.use(fileUpload());
 
app.post('/upload', function(req, res) {
    var sampleFile;
 
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
 
    archivo = req.body.apellido + "_" + req.body.nombre + ".png";
    sampleFile = req.files.sampleFile;
    sampleFile.mv('/apps/nodejs/carreras/css/images/people/' + archivo, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });
});

app.listen(4000);
console.log("Node server running on http:localhost:4000");