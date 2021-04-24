from flask import Flask, request
from PIL import Image 
import base64
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/save_img/', methods=['POST','GET'])
def welcome():
    print('hello in flask------------------------')
    form_data = request.form
    base_64_img = form_data['image']  
    img_file = base64.decodebytes(base_64_img)
    img_file = Image.open(img_file) 
    img_file.save('./images/'+form_data['name'])
    print('image saved in flask------------------------')
    return jsonify(message='image saved to flask')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)