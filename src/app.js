const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('./utils/weather')
const geocode = require('./utils/geocode')

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsDirectory = path.join(__dirname,'../templates/views');
const partialsDirectory = path.join(__dirname,'../templates/partials');
 
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handlebars and viewsclocation
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name : 'Aara'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name : 'Aara'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help',
        name : 'Aara'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please send necessary address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
        }
        weather(latitude,longitude,(error, response)=>{
            if(error){
                return res.send({error});
            }
            res.send({
            forecast: response,
            location,
            address: req.query.address
            }); 
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Page Not Found',
        message:'Article not found',
        name : 'Aara'
    });
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Page Not Found: 404',
        message:'Page not found',
        name : 'Aara'
    });
})


// app.com
// app.come/help
// app.com/about

app.listen('3000',()=>{
    console.log('server is up on port 3000');
})