from flask import Flask, request, jsonify, make_response
from flask_restx import Api, Resource, fields
import joblib
import numpy as np
import pandas as pd

# Pre process
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Machine Learning Libraries
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer

# FLASK APP
flask_app = Flask(__name__)
app = Api(app=flask_app,
          version="1.0",
          title="ML React App",
          description="Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params',
    {'Text Input': fields.String(required=True,
                                description="Input Text to Determine your MBTI!",
                                help="Text Input cannot be blank..."),
    'Model Choice': fields.Integer(required=True,
                                description="Choose the ML Model which predicts your MBTI!",
                                help="Model Choice cannot be blank...")})

# DOWNLOAD NLTK WORDS AND INITIALIZE THESE VARIABLES
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')

# Load classifier from Joblib
# Loading Machine Learning Model
cntizer = joblib.load("joblib/cntizer.pkl")  # Load pre-trained CountVectorizer
# Load pre-trained TF-IDF Transformer
tfizer = joblib.load("joblib/tfizer.pkl")

lemmatizer = WordNetLemmatizer()
stops = stopwords.words('english')

b_Pers = {'I': 0, 'E': 1, 'N': 0, 'S': 1, 'F': 0, 'T': 1, 'J': 0, 'P': 1}
b_Pers_list = [{0: 'I', 1: 'E'}, {0: 'N', 1: 'S'},
               {0: 'F', 1: 'T'}, {0: 'J', 1: 'P'}]
# END OF INITIALIZATION

# API ROUTES


@name_space.route("/")
class MainClass(Resource):

    def options(self):
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response

    @app.expect(model)
    def post(self):
        try:
            formData = request.json

            data = [val for val in formData.values()]

            mydata = pd.DataFrame(data={'type': ['INFJ'], 'posts': [data[0]]})

            if (data[1] == 1):
                classifier_IE = joblib.load("joblib/model_IE:_Introversion_(I)___Extroversion_(E).joblib")
                classifier_NS = joblib.load("joblib/model_NS:_Intuition_(N)_–_Sensing_(S).joblib")
                classifier_FT = joblib.load("joblib/model_FT:_Feeling_(F)_-_Thinking_(T).joblib")
                classifier_JP = joblib.load("joblib/model_JP:_Judging_(J)_–_Perceiving_(P).joblib")
                print("SVC Loaded")
            else:
                classifier = joblib.load("joblib/rfbestmbticlassifier.joblib")
                print("RandomForest Loaded")

            my_posts, dummy = pre_process_text(
                mydata, remove_stop_words=True, remove_mbti_profiles=True)

            print("Preprocessed",my_posts)

            my_X_cnt = cntizer.transform(my_posts)
            # print(my_X_cnt)
            my_X_tfidf = tfizer.transform(my_X_cnt).toarray()
            # print(my_X_tfidf)

            # ML Predictions
            prediction_result = []
            for l in range(4):
                if l == 0:
                    y_pred = classifier_IE.predict(my_X_tfidf)
                    prediction_result.append(y_pred[0])
                elif l == 1:
                    y_pred = classifier_NS.predict(my_X_tfidf)
                    prediction_result.append(y_pred[0])
                elif l == 2:
                    y_pred = classifier_FT.predict(my_X_tfidf)
                    prediction_result.append(y_pred[0])
                elif l == 3:
                    y_pred = classifier_JP.predict(my_X_tfidf)
                    prediction_result.append(y_pred[0])
                

            print("Prediction Result:", prediction_result)

            response = jsonify({
                "statusCode": 200,
                "status": "Prediction made",
                "result": "Prediction: " + translate_back(prediction_result)
            })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        except Exception as error:
            return jsonify({
                "statusCode": 500,
                "status": "Could not make prediction",
                "error": str(error)
            })

# FUNCTIONS FOR PROCESSING THE INPUT AND OUTPUTS

def translate_personality(personality):
    # transform mbti to binary vector
    return [b_Pers[l] for l in personality]


def translate_back(personality):
    # transform binary vector to mbti personality
    s = ""
    for i, l in enumerate(personality):
        s += b_Pers_list[i][l]
    return s


def pre_process_text(data, remove_stop_words=True, remove_mbti_profiles=True):
    unique_type_list = ['INFJ', 'ENTP', 'INTP', 'INTJ', 'ENTJ', 'ENFJ', 'INFP', 'ENFP',
                        'ISFP', 'ISTP', 'ISFJ', 'ISTJ', 'ESTP', 'ESFP', 'ESTJ', 'ESFJ']

    unique_type_list = [x.lower() for x in unique_type_list]

    list_personality = []
    list_posts = []

    for row in data.iterrows():

        # Remove and clean comments
        posts = row[1].posts

    # Remove url links
        temp = re.sub(
            'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', ' ', posts)

    # Remove Non-words - keep only words
        temp = re.sub("[^a-zA-Z]", " ", temp)

    # Remove spaces > 1
        temp = re.sub(' +', ' ', temp).lower()

    # Remove multiple letter repeating words
        temp = re.sub(r'([a-z])\1{2,}[\s|\w]*', '', temp)

    # Remove stop words
        if remove_stop_words:
            temp = " ".join([lemmatizer.lemmatize(w)
                            for w in temp.split(' ') if w not in stops])
        else:
            temp = " ".join([lemmatizer.lemmatize(w) for w in temp.split(' ')])

    # Remove MBTI personality words from posts
        if remove_mbti_profiles:
            for t in unique_type_list:
                temp = temp.replace(t, "")

    # transform mbti to binary vector
        type_labelized = translate_personality(row[1].type)
        list_personality.append(type_labelized)
    # the cleaned data temp is passed here
        list_posts.append(temp)

    # returns the result
    list_posts = np.array(list_posts)
    list_personality = np.array(list_personality)
    return list_posts, list_personality
# END OF FUNCTIONS FOR PROCESSING INPUTS AND OUTPUTS
