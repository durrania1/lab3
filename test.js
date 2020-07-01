
const express = require('express')
const app = express()
//const cors = require ('cors') //microservice
var port = process.env.PORT || 8080;
app.use (express.urlencoded({extended: false}))
//app.use(cors()) //microservice
app.listen(port)
console.log("US city Search Microservice is running on port" + port)
const MongoClient = require('mongodb').MongoClient;
const mongourl = "mongodb+srv://cca-durrania1:yJx7DSnUiYbATaJs@cca-durrania1.zdj2j.mongodb.net/cca-labs?retryWrites=true&w=majority" //from previous step
const dbClient = new MongoClient(mongourl,
{useNewUrlParser: true, useUnifiedTopology: true});
dbClient.connect(err => {
if (err) throw err;
console.log("Connected to the MongoDB cluster");
});

app.get("/", (req,res) =>{
    res.send("US City search microservice by Durrani");
});

app.get('/uscities-search/:zips(\\d{1,5})' , function(req, res){
    const db = dbClient.db();
    let zipRegEx = new RegExp (req.params.zips);
    let fields = {_id: false,
                   zips: true,
                   city : true,
                   state_id : true,
                   state_name : true,
                   country_name : true,
                   timezone : true};
    const cursor = db.collection("uscities").find({zips:zipRegEx}).project(fields);
    cursor.toArray(function(err,results){
        console.log(results); // output all records for debug only
        res.send(results);

    });

    });

app.get('/uscities-search/:city' , function(req, res){
    const db = dbClient.db();
    let cityRegEx = new RegExp (req.params.city, 'i');
    let fields = {_id: false,
                   zips: true,
                   city : true,
                   state_id : true,
                   state_name : true,
                   country_name : true,
                   timezone : true};
    const cursor = db.collection("uscities").find({city:cityRegEx}).project(fields);
    cursor.toArray(function(err,results){
        console.log(results); // output all records for debug only
        res.send(results);

    });

    });
