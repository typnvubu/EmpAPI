require('dotenv').config();
const express=require('express');
const PORT=8000;
const helmet=require('helmet');
const compression=require('compression');

const routes=require('./Routes/Employee');

const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI ,
{useNewUrlParser: true,
    retryWrites: true,
    w: "majority"
}
,(err) => {
    if (err) return console.log("Error: ", err);
    console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
});


var app=express();

app.use(express.json());
app.use(helmet());
app.use(compression());

app.use('/uploads',express.static('./uploads'));
app.use('/',routes);

app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

app.listen(PORT,()=>{
    console.log('Server is running....');
})
