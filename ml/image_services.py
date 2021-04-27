from flask import Flask, request,jsonify
from PIL import Image 
import base64
from flask_cors import CORS
import json
import torch 
import torch.nn as nn
import torch.nn.functional as F
import torchvision
import numpy as np
import pandas as pd
import os
from PIL import Image
import matplotlib.pyplot as plt
from mpl_toolkits.axes_grid1 import ImageGrid
import uuid

app = Flask(__name__)
CORS(app)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

image_dir = './images/'
IMG_SIZE = 128

class FeatureExtractor(nn.Module):
  def __init__(self):
    super(FeatureExtractor,self).__init__()
    self.feature_extractor = torchvision.models.vgg19(pretrained=True, progress=False) 
    for param in self.feature_extractor.parameters():
            param.requires_grad = False
        
  def forward(self,input_image):
    features = self.feature_extractor(input_image)
    return features

normalization_mean = [0.485, 0.456, 0.406]
normalization_std = [0.229, 0.224, 0.225]
image_transforms = torchvision.transforms.Compose([torchvision.transforms.Resize((IMG_SIZE,IMG_SIZE)),torchvision.transforms.ToTensor(),
                                             torchvision.transforms.Normalize(mean=normalization_mean,
                                                                              std=normalization_std)])
def load_image(image_path,image_transformer,search_img=False):
  if not search_img:
    image = Image.open(os.path.join(image_dir,image_path))
  else:
    image = Image.open(os.path.join(image_path))
  transformed_image = image_transformer(image).unsqueeze(0)
  return transformed_image

def calculate_euclidean_distance(feature_vector_1,feature_vector_2):
  return torch.sum(torch.square(torch.subtract(feature_vector_1,feature_vector_2)))**(0.5)

def calculate_k_similar_images(input_image,search_list,k,model):
  score_list = []
  input_image_tensor = load_image(input_image,image_transforms,search_img=True).to(device)
  input_image_feature = model(input_image_tensor)
  for image in search_list:
    search_image_tensor = load_image(image,image_transforms).to(device)
    search_image_feature = model(search_image_tensor)
    euclidean_distance = calculate_euclidean_distance(input_image_feature,
                                                     search_image_feature)
    score_list.append({'image_id':image,'score':euclidean_distance.item()})
  
  k_images = sorted(score_list,reverse=False, key=lambda x: x['score'])[:k]
  return k_images 


@app.route('/save_img/', methods=['POST','GET'])
def image_save():
    try:
        form_data = json.loads(request.data)
        image_name = form_data['name']  
        image_name = image_name.split('uploads/')[1]
        base_64_img = form_data['image']
        img_file = base64.b64decode(str(base_64_img))
        f = open('./images/'+image_name, 'wb')
        f.write(img_file)
        f.close()
    except Exception as e:
        print(str(e))
        return jsonify(message=str(e))
    return jsonify(message='image saved to flask')

@app.route('/search_img/', methods=['POST','GET'])
def image_search():
    try:
        form_data = json.loads(request.data)
        base_64_img = form_data['image']
        img_file = base64.b64decode(str(base_64_img))
        image_name = str(uuid.uuid1()) + '.jpg'
        f = open(image_name, 'wb')
        f.write(img_file)
        f.close()
        print("Starting Image Search")
        model = FeatureExtractor()
        model = model.to(device)
        images_to_search = os.listdir('./images/')
        similar_images_score = calculate_k_similar_images(image_name,images_to_search,5,model)
        similar_images = []
        for image in similar_images_score:
          similar_images.append('/uploads/'+image['image_id'])
        print(similar_images)
        os.remove(image_name)
        return jsonify(similar_images=similar_images)
    except Exception as e:
        print(str(e))
        return jsonify(message=str(e))
    return jsonify(message='image saved to flask')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001,debug=True)