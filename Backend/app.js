const dotenv =require('dotenv') 
dotenv.config();
const express=require('express')
const app=express()
const cookieParser=require('cookie-parser')
const connectToDB=require('./db/db')
connectToDB()
const UserRoutes=require('./router/user.rauter')
const captainRoutes=require('./router/captain.routes')
const mapRoutes=require('./router/maps.routes')
const rideRoutes = require('./router/ride.routes')
const cors=require('cors')
const path = require('path');

app.use(cors({
    origin: 'https://uberclone2-1.onrender.com',
    credentials: true
  }));
app.use(express.json())
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser())
app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/users',UserRoutes)
app.use('/captains',captainRoutes)
app.use('/maps',mapRoutes)
app.use('/rides',rideRoutes)

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

module.exports=app