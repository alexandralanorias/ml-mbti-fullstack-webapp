# model_generator.py

# Import libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier
from sklearn.linear_model import LogisticRegression
import joblib
from sklearn import datasets
from sklearn.metrics import accuracy_score

# Get the dataset
dataset = datasets.load_iris()

# Split the dataset into features and labels
X = dataset.data
y = dataset.target

# Split the dataset into training (80%) and testing (20%) data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state = 5, shuffle = True)

# Build the classifier and make prediction
classifier = DecisionTreeClassifier()
classifier.fit(X_train, y_train)
prediction = classifier.predict(X_test)

print(classifier.score(X_test, y_test))
accuracy = accuracy_score(y_test, prediction)
print("Accuracy",accuracy)

# XGBoost
xgb = XGBClassifier()
xgb.fit(X_train,y_train)
prediction2 = xgb.predict(X_test)

print(xgb.score(X_test, y_test))
accuracy2 = accuracy_score(y_test, prediction2)
print("Accuracy 2",accuracy2)

# Logistic Regression
logreg = LogisticRegression(max_iter=500)
logreg.fit(X_train, y_train)
prediction3 = xgb.predict(X_test)

print(logreg.score(X_test, y_test))
accuracy3 = accuracy_score(y_test, prediction3)
print("Accuracy 3",accuracy3)

# Print the confusion matrix
print("Confusion Matrix:")
print(confusion_matrix(y_test, prediction))

print("Confusion Matrix 2:")
print(confusion_matrix(y_test, prediction2))

print("Confusion Matrix 3:")
print(confusion_matrix(y_test, prediction3))

from sklearn.model_selection import GridSearchCV
import time

max_iter = [300, 500, 700]
C = np.linspace(0.1, 1.0, num=5)
penalty = ['l1', 'l2']

param_grid = dict(max_iter=max_iter, C=C, penalty=penalty)

lr_new = LogisticRegression(multi_class='multinomial')

grid = GridSearchCV(estimator=lr_new, param_grid=param_grid, cv=5)

start_time = time.time()
grid_result = grid.fit(X, y)

print(grid_result.best_score_, grid_result.best_params_)
print("Time", time.time() - start_time)

lr_best = LogisticRegression(multi_class='multinomial', C=0.55, max_iter=300, penalty='l2')
lr_best.fit(X_train, y_train)
print(lr_best.score(X_test, y_test))
prediction4 = lr_best.predict(X_test)

print("Confusion Matrix 4:")
print(confusion_matrix(y_test, prediction4))

# Save the model
joblib.dump(classifier, 'joblib/classifier.joblib')