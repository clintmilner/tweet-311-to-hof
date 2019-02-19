var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/pages'));
app.listen(PORT, function () {
    console.log('Example app listening on port 3000!');
});