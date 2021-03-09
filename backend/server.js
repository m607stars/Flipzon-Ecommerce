import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import mongoURI from './keys.js';
import userRouter from './routers/userRouter.js';

const app = express();


const db = mongoURI;

mongoose.connect(db,{useUnifiedTopology:true,useNewUrlParser:true}).then(()=>{
            console.log("MongoDB connected successfully")
        })
        .catch((err)=>{
            console.log("Error has occurred while connecting to the database: ",err);
        })

app.get('/api/products/:id',(req,res)=>{
    console.log('server.js');
    const product = data.products.find((x) => x._id === req.params.id);
    if (product){
        res.send(product);
    } else {
        res.status(404).send({message: 'Product not found' });
    }
});

app.get('/api/products',(req,res)=>{
    console.log('server.js');
    console.log('sending');
    console.log(data.products);
    res.send(data.products);
});

app.use('/api/users/',userRouter);

app.get('/',(req,res)=>{
    res.send('Server is ready');
});

app.use((err,req,res,next) =>{
    res.status(500).send({message:err.message});
});

const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log(`Serve at port ${port}`);
});