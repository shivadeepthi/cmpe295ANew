
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fetchcharts=require('./routes/mongoapi')
  ,	ejs = require("ejs")
  ,bodyParser=require("body-parser"),
  multer = require('multer');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/dashboard',function(req,res){
	ejs.renderFile('./views/dashboard.ejs',{title:"hello"},function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end('an error occurred');
			console.log(err);
		}
	});
});

app.get('/dashboard/rulesengine',function(req,res){
	ejs.renderFile('./views/Rulesengine.ejs',{title:"hello"},function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end('an error occurred');
			console.log(err);
		}
	});
});

//app.get('/charts/dashboardtype/temperature',function(req,res){
//ejs.renderFile('./views/temperature.ejs',{title:"hello"},function(err,result){
//if(!err){
//	res.end(result);
//	}
//	
//	else{
//		res.end('an error occurred');
//		console.log(err);
//	}
//});
//});
//
app.post('/testrule',function(req,res){
   console.log('body: ' + JSON.stringify(req.body));
	var collectionnm=req.body.criteria;
	console.log(collectionnm);
	var conditionop=req.body.criteriaVal;
	console.log(conditionop);
	var condiValu=req.body.ruleval;
	console.log(condiValu);
if(collectionnm=="Temperature"){
var ct="temp";
fetchcharts.alertTemp(function(err,result){
			if(err){
				throw err;
		}
		else{
			//console.log("result");
			//console.log(result);
			//console.log(result.data_temp.temp_value);
			//res.send(result.data_temp.temp_value);
			var response = {
				    status  : 200,
				    success : 'found the record'
				};
			res.header("Access-Control-Allow-Origin", "*");
			res.end(JSON.stringify(response));
			//res.send(result);
		 }
		 },ct,conditionop,condiValu);
		
	}else if(collectionnm=="Humidity"){
		
	}
	});

//api for fetching charts
app.get('/charts/:chartType',function(req,res){
var ct=req.params.chartType;
console.log("inside app.get method");
if(ct=="temp"){
fetchcharts.fetchTempChart(function(err,result){
	if(err){
		throw err;
}
else{
	console.log("result data_temp");
	console.log(result.data_temp);
	console.log("result data_temp_avg");
	console.log(result.data_temp_avg);
	console.log("datarange");
	console.log(result.data_temp_range);
ejs.renderFile('./views/temperature.ejs',{title:result.name,
	                                      datapoints:result.data_temp,
	                                      datapoints_avg:result.data_temp_avg,
	                                      datapoint_range:result.data_temp_range},
function(err, results) {
	// render on success
	if (!err) {
		res.end(results);
	}
	// render or error
	else {
		res.end('An error occurred');
		console.log(err);
	}
});
	//res.send(result.data);
	
 }
 },ct);
}else if(ct=="humidity"){
	fetchcharts.fetchHumidityCharts(function(err,result){
		if(err){
			throw err;
	}
	else{
		console.log("result data_humidity");
		console.log(result.data_humidity);
		console.log("result data_humidity_avg");
		console.log(result.data_humidity_avg);
		console.log("datarange");
		console.log(result.data_humidity_range);
	ejs.renderFile('./views/humidity.ejs',{title:result.name,
		                                   datapoints:result.data_humidity,
		                                   datapoints_avg:result.data_humidity_avg,
		                                   datapoint_range:result.data_humidity_range},
	function(err, results) {
		// render on success
		if (!err) {
			res.end(results);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
	//	res.send(result.data);
	 }
	 },ct);
}
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
