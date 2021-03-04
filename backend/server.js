import express from 'express';
import data from './data.js';

const app = express();

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

app.get('/',(req,res)=>{
    res.send('Server is ready');
});

const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log(`Serve at port ${port}`);
});