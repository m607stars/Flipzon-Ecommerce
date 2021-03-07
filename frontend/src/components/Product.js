import React from 'react';
import Rating from './Rating';
import {Link} from 'react-router-dom';

export default function Product(props) {
    const {product} = props;
    console.log('Product.js');
    console.log(props); 
    /*should be dictionary having two keys:
    key,
    product
     */

    return (
        <div key={product._id} className="card">
                <Link to={`/product/${product._id}`}>
                  <img
                    className="medium"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
                <div className="card-body">
                  <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                  </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} ></Rating>
                  <div className="price">${product.price}</div>
                </div>
              </div>
    );
}