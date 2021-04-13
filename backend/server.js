import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import mongoURI from './keys.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import path from 'path';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const db = mongoURI;

mongoose.connect(db,{useUnifiedTopology:true,useNewUrlParser:true}).then(()=>{
            console.log("MongoDB connected successfully")
        })
        .catch((err)=>{
            console.log("Error has occurred while connecting to the database: ",err);
        })

app.use('/api/uploads',uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
const __dirname = path.resolve();
app.use('/uploads/',express.static(path.join(__dirname,'/uploads')))

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
        