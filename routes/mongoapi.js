var mongodb = require('mongodb');
url='mongodb://cmpe295:cmpe295@ds031982.mongolab.com:31982/cmpe295';
var db;

function fetchTempChart (callback,chartname){
console.log("i am here mongo");
db = new mongodb.Db('cmpe295', new mongodb.Server('ds031982.mongolab.com', 31982, {auto_reconnect:true}), {});
db.open(function(err, p_client) {
	db.authenticate('cmpe295', 'cmpe295', function(err) {
		if (err) 
			throw err;
		   else
			   {
			 var collec=db.collection('attributes');
			  collec.findOne({"name": chartname}, function (err, recs) {
			   if(err){
				   throw err;
			   }else{
				   if(recs.length!=0){
					   console.log("insde find method");
					  console.log(recs);
					   callback(err,recs); 
				   }else{
					   callback(err,null);
				   }
			   }
			   });
			   }
			   });
	});
}

function alertTemp(callback, chartname,condi,adata){
	console.log("i am here mongo");
	db = new mongodb.Db('cmpe295', new mongodb.Server('ds031982.mongolab.com', 31982, {auto_reconnect:true}), {});
	db.open(function(err, p_client) {
		db.authenticate('cmpe295', 'cmpe295', function(err) {
			if (err) 
				throw err;
			   else
				   {
				 var collec=db.collection('attributes');
				 console.log("chartname"+chartname+"condi"+condi+"data"+adata);
//				 var suvqry="{"+condi+":"+adata+"}";
//				 var subq=JSON.parse(JSON.stringify(suvqry));
//				 var sq=subq.replace("\'", "");
//				 console.log(sq);
				 if(condi=="$gte"){
					 console.log("inside GTE");
					 console.log(adata);
				var numval=parseInt(adata);
				 var qury={$and:[{"name":chartname,"data_temp.temp_value":{$gte:numval}}]};
				 console.log(qury);
				 collec.findOne(qury,function (err, recs) {
				 if(err){
					   throw err;
				   }else{
					  if(recs){
						 console.log("insde find method");
						   console.log(recs);
						   callback(err,recs); 
						  }
				   
						   else{
                        //  callback(err,"rule not met");
							  console.log("rule not met");
				   }
					  
				   }
				   });
				 }else if (condi=="$gt"){
					 console.log("inside GT");
					 console.log(adata);
					 var numval=parseInt(adata);
					 var qury={$and:[{"name":chartname,"data_temp.temp_value":{$gt:numval}}]};
					 console.log(qury);
					 collec.findOne(qury,function (err, recs) {
					 if(err){
						   throw err;
					   }else{
						  if(recs){
							 console.log("insde find method");
							   console.log(recs);
							   callback(err,recs); 
							  }
					   
							   else{
//						//   callback(err,null);
								   console.log("something is wrng");
					   }
						  
					   }
					   });
				 }else if(condi=="$lt"){
					 console.log("inside LT");
					 console.log(adata);
					 var numval=parseInt(adata);
					 var qury={$and:[{"name":chartname,"data_temp.temp_value":{$lt:numval}}]};
					 console.log(qury);
					 collec.findOne(qury,function (err, recs) {
					 if(err){
						   throw err;
					   }else{
						  if(recs){
							 console.log("insde find method");
							   console.log(recs);
							   callback(err,recs); 
							  }
					   
							   else{
//						//   callback(err,null);
								   console.log("something is wrng");
					   }
						  
					   }
					   });
				 }else if(condi=="$lte"){
					 console.log("inside LTE");
					 console.log(adata);
					 var numval=parseInt(adata);
					 var qury={$and:[{"name":chartname,"data_temp.temp_value":{$lte:numval}}]};
					 console.log(qury);
					 collec.findOne(qury,function (err, recs) {
					 if(err){
						   throw err;
					   }else{
						  if(recs){
							 console.log("insde find method");
							   console.log(recs);
							   callback(err,recs); 
							  }
					   
							   else{
//						//   callback(err,null);
								   console.log("something is wrng");
					   }
						  
					   }
					   });
				 }
				   }
				   });
		
		});
}

function fetchHumidityCharts (callback,chartname){
	console.log("i am here mongo");
	db = new mongodb.Db('cmpe295', new mongodb.Server('ds031982.mongolab.com', 31982, {auto_reconnect:true}), {});
	db.open(function(err, p_client) {
		db.authenticate('cmpe295', 'cmpe295', function(err) {
			if (err) 
				throw err;
			   else
				   {
				   var collec=db.collection('attributes');
				  collec.findOne({"name": chartname}, function (err, recs) {
				   if(err){
					   throw err;
				   }else{
					   if(recs.length!=0){
						   console.log("insde find method");
						  console.log(recs);
						   callback(err,recs);
						   
					   }else{
						   callback(err,null);
					   }
				   }
				   });
				   }
				   });
		});
	}

exports.fetchTempChart = fetchTempChart;
exports.fetchHumidityCharts = fetchHumidityCharts;
exports.alertTemp=alertTemp;