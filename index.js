const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//document.querySelector("submit").innerHTML="send";

app.get("/",function(req,res){
    //res.sendFile(__dirname+"/style.css");
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const city=req.body.cityName;
    const appid="c2c6a52d535ee4ec509dba50c57d190b"
    const units="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+units+"";
   https.get(url , function(response){
    //console.log(response.statusCode);=200
   response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp = weatherData.main.temp;
    const temp1=weatherData.weather[0].description
    const icon =weatherData.weather[0].icon
    const imageURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    res.write("<h1>The temperature of "+city+" is: " + temp + " degree celcius </h1>");
    res.write("<h3>The Weather-discpiption is : "+ temp1 +"</h3>")
    
    res.write("<img src=" + imageURL +">")
    res.send();
        })
    })
})
    //res.send("server is up & running");
//})
 
app.listen(3000,function(){
    console.log("server is running on port 3000");
});