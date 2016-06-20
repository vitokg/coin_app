/**
 * Created by Viktoriia_Goncharuk on 6/16/2016.
 */
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

require('./src/routes')(app);

app.listen(3000);