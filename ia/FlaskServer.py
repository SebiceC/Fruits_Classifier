# -*- coding: utf-8 -*-
"""
Created on Mon Nov 20 20:04:12 2023

@author: USUARIO
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from torchvision import transforms, models
import torch
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Conéctate a tu base de datos MongoDB
client = MongoClient('mongodb+srv://sebartin9:sebartin9@projectia.qsfo3gu.mongodb.net/')
db = client['MachineLearningDb']

# Ruta del modelo preentrenado
model_path = 'FruitClassfierModel.pt'

# Cargar el modelo
model = models.resnet18(pretrained=False)
num_ftrs = model.fc.in_features
model.fc = torch.nn.Linear(num_ftrs, 5)  # Asegúrate de ajustar num_classes según tu modelo

model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model.eval()

# Transformación para preprocesar la imagen
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Nombres de las clases
class_names = ['Orange', 'Peach', 'Potato Sweet', 'Strawberry', 'Watermelon']  # Reemplaza estos nombres por los de tus clases reales

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Obtener la imagen del formulario
        file = request.files['file']
        image = Image.open(file)

        # Preprocesar la imagen
        input_tensor = preprocess(image)
        input_batch = input_tensor.unsqueeze(0)

        # Realizar la predicción
        with torch.no_grad():
            output = model(input_batch)

        # Obtener la clase predicha
        _, predicted_class = torch.max(output, 1)
        predicted_class = int(predicted_class)

        # Obtener el nombre de la clase basado en el número
        predicted_class_name = class_names[predicted_class]

        # Almacenar la predicción en la base de datos MongoDB
        db.predicciones.insert_one({'prediction': predicted_class_name})

        # Devolver el nombre de la clase predicha como respuesta JSON
        return jsonify({'class': predicted_class_name})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)