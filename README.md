
<h1 align = 'center'><b> Flipzon </b></h1>

<p align='center'>
An amazon-like ecommerce application built using the MERN stack.
<br>
</p>

<div align="center">
  
[![](https://img.shields.io/badge/Made_with-Flask-blue?style=for-the-badge&logo=Flask)](https://flask.palletsprojects.com/en/1.1.x/)
[![](https://img.shields.io/badge/Made_with-MongoDB-green?style=for-the-badge&logo=MongoDB)](https://www.mongodb.com/)
[![](https://img.shields.io/badge/Made_with-Express-lightgrey?style=for-the-badge&logo=Express)](http://expressjs.com/)
[![](https://img.shields.io/badge/Made_with-React-blue?style=for-the-badge&logo=React)](https://reactjs.org/)
[![](https://img.shields.io/badge/Made_with-NodeJS-darkgreen?style=for-the-badge&logo=Nodejs)](https://nodejs.org/en/)
</div>

<br>

## :information_source: About 
<p>
We wanted to built an ecommerce like application similar to amazon. This platform has all the various features of amazon like searching for product, adding the product to the cart, sorting the products according to the price or brand, giving reviews and rating to the product, etc. Apart from the buyer side features, there is the seller module which caters the sellers providing order history, order status, and a lot more. One distinguishing feature is the image based search. So lets say that the buyer does not know what the product is called in English, however he has a picture of the product. So he can simply upload the product's image and the deep learnign algrtihm will provide all the products similar to the uploaded image. 
</p>

### Image based search 

<p>
Image based search is based on image feature extraction using the Convolutional Neural Networks. We have used VGG-19 to extract the image features of the input image and the images present in the database and then compare them. We compute their similarity using the cosine similarity technique and then output the best 5 images. 
</p>


-----------------------------------

## :guide_dog: Installation Guide

A step by step series of examples that tell you how to get a development env running

1. Clone the repo:
  ```
  $ git clone https://github.com/m607stars/Flipzon-Ecommerce
  ```

2. Install the dependencies:
  ```
  $ npm install
  ```

3. Open two terminals, one for frontend and one for backend. For opening frontend, go to the frontend folder using:
  ```
  $ cd frontend
  ```

4. Run both the servers using:
  ```
  $ npm start
  ```
  
5. Start the flask server. Go to image_services.py in ml folder and then open terminal: 
  ```
  $ flask run
  ```

6. Navigate to [http://localhost:5000](http://localhost:5000)

You are done with the setup now!

------------------------------------------

## 📝 To-do List

- [ ] Make improvements in the ML algorithm. 
- [ ] Improve the frontend design. 
- [ ] Handle concurrencies. 

-----------------------------------

<h3 align="center"><b>Developed with :heart: by <a href="https://github.com/m607stars">Mayank</a>, <a href="https://github.com/aafiya-h"> Aafiya</a> and <a href="https://github.com/talha1503">Talha</a> </b></h1>
