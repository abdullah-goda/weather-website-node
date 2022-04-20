const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Using the path module(Core module) to get the path of the dir the express(app var) will use.
const path = require('path');
// here, we're going to load in, express(3rd party module), configure it to serve something up and then we're going to start the server to get started.
const express = require('express');

const hbs = require('hbs');
const { application } = require('express');

// Define paths for express Express  configs
const publicDirectoryPath= path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// config for partials
hbs.registerPartials(partialsPath);

const app = express(); //express is a function
// Setup handlebars engines and views locations
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath)); //app.use to find the static pages
// console.log(publicDirectoryPath);



// This is a bad way , just for learning
// We will use app.use method. app will search inside the direcotry for a given page name
//It takes two argumwnets: 1. the route. 2. A function with request and response as parmaeters
// app.get('', (req,res) => {
//     res.send("Hi there")
// })  
// app.get('/help', (req,res) => {
//     res.send("Help page")
// })
// app.get('/weather', (req,res) => {
//     res.send("Weather Page")
// })  
// app.get('/about', (req,res) => {
//     res.send("About page")
// })  



// So once again, with handlebars, we'll be able to render dynamic content and will be able to easily
// use and reuse little pieces of markup throughout the various pages in our app.
// Now HBS uses handlebars behind the scenes.HBS just makes it really easy to integrate with Express.
// To install it : npm i hbs@4.0.1
// All we need to do is tell express which templating engine we installed and we do that by using a new method on app that is app dot set.
app.set('view engine','hbs');
// Now set allows you to set a value for a given express setting and there are a few we have a key, the setting name and we have
//  a value, the value we want to set for the setting in our case to set up a view engine like express the value is view space engine.
// And it is important that this matches up exactly with the spacing and capitalization taken into account.
// the value we use is the name of the module we installed in this case, HB s and there we go.
// That single line is all we need. To get handlebars set up now, we can actually use it to create some dynamic templates.
// We will create the handlebars in the views directory.Now when we're working with Express, it expects all of your views in 
// this case are handlebars, templates to live in a specific folder that is in the route of the project. It's supposed to live in
//  a folder called Views.
// We are going to add index.hbs and remove index.html
// Set up a route to access the template(view) of index.hbs
app.get('',(req,res)=>{
    //render takes two arguments. The file and the dynamic data that you will use 
    res.render('index',{
        title:'Weather app',
        name: 'Abdullah'
    })
    //now go to the index.hbs and use these values using {{}}
})
// So by calling response render express goes off and it gets that. It then converts it into HTML and to make sure that HTML gets 
// back to the requester
// So public dir is for static documents and views dir is for dynamic  and reusability

app.get('/about',(req,res)=>{
    //render takes two arguments. The file and the dynamic data that you will use 
    res.render('about',{                          // must be without extension
        title:'About',
        name: 'Abdullah'
    })
    //now go to the index.hbs and use these values using {{}}
})

app.get('/help',(req,res)=>{
    //render takes two arguments. The file and the dynamic data that you will use 
    res.render('help',{                          // must be without extension
        helpText:'This is helpful text!',
        title:'help page',
        name: 'Abdullah'
    })
    //now go to the index.hbs and use these values using {{}}
})

// Main dunctionality page that will get you the weather.
app.get('/weather',(req,res) =>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide a address term'
        })
    }
    geocode(req.query.address, (error,data) => {
        if(error){
        //   return console.log(error);
          return res.send(error);
        }
        forecast(data.longitude, data.latitude, (error, forecastData) => {
          if (error){
            return res.send( {error} );
            // return console.log(error);
        } 
          
        console.log('Location is '+data.location);
        console.log(forecastData);
        res.send({
            address:req.query.address,
            weather: forecastData
    
        })
        }
        )
      })
    console.log(req.query);
    // res.send({
    //     address:req.query.address,
    //     weather: forecastData.condition

    // })
})

app.get('/products',(req,res) =>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
        //We used return statement so that the code stops. If the code continues to run, it will give you an error in the console
        //saying that you are trying to send a second response to the server. Express handles one response per a request.
    }
    console.log(req.query);
    res.send({
        product:[]
    })
})

// handle 404 errors
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})
app.get('*', (req, res) => {
res.render('404', {
title: '404',
name: 'Andrew Mead',
errorMessage: 'Page not found.'
})
})
  

// Spining up the server and listen to point 3000 for dev purposes
// The second argument is optional
app.listen(3000, () => {
    console.log("App is listing on 3000")
});        
