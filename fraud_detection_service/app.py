from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load your model (make sure fraud_model.pkl is in this folder)
with open("fraud_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = data.get('features')
    if not features:
        return jsonify({'error': 'No features provided'}), 400
    # Convert the features to a NumPy array and reshape as needed
    features = np.array(features).reshape(1, -1)
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0].tolist()
    return jsonify({
        'prediction': str(prediction),
        'probability': probability
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
