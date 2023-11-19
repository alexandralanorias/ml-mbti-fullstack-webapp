# Machine Learning Project 

**_AFTER FORKING THIS REPO, DELETE THE `venv` FOLDER FIRST!! YOU WILL CREATE A NEW ONE IN THE SUCCEEDING STEP!!_**

## How to Run Locally

Create a virtual environment then install all requirements

```
python -m venv venv # Command for Windows
venv\Scripts\activate.bat
cd server
pip install -r requirements.txt --user # Installs all necessary packages required
```

Note above that if there are compabilities issues with the versions, you could try installing from requirementsOLD (does not contain all, but contains most), and then installing any other packages that you require.

First run the server
```
cd server
# (MIGHT NEED TO RUN python app.py first so that it sets flask environment
# Or use FLASK_APP=app.py)
python -m flask run # Runs the server
```

Run the client. **Open another terminal window, as pressing** `ctrl + c` **will stop the server from running.** 
```
cd client
npm install # Installs node modules. No need to do this after first time
npm run dev # Runs the client
```

Then with the client and server running at the same time, the client can make requests to the server via an API endpoint request.

### Important Code Files:

```
server\app.py # Flask server
server\mbti_1.csv # Dataset from Kaggle
server\mbti_notebook.ipynb # Jupyter Notebook containing most info.
server\model_generator # Test how to generate joblib files from classifer.
server\requirements.txt # Packages/dependencies required
server\joblib # Joblib files (classifiers, cntizer, tfizer)

client\src\App.jsx # Majority of the frontend code (aside from styling)
```

## Background

This is a project that is aimed to learn how to deploy a Machine Learning model into production via a web application. Technologies used include React.js, Flask, Scikit-learn, JavaScript, Python, and Jupyter Notebook.

## Results

The Data that we will be looking at is the (MBTI) Myer-Briggs Personality Type Dataset. Myer Briggs Type Indicator (MBTI) is a famous personality type system that divide people into 16 personality types. There are many questionnaires that people can fill out (ex. [16personalities](https://www.16personalities.com/free-personality-test)) to get their MBTI. Although humans are complex and classified so easily, many people have said that those tests are fairly accurate. 

This dataset contains over 8600 rows of data, which the columns being the type of the user, and the second column being the last 50 things they have posted (with each post being separated by "|||"). Using the dataset, we are trying to explore if it is possible to determine a person's MBTI just from what they post.

Firstly, we can examine the dataset by counting the number of posts for each type. We can notice that ENFJ has the highest number of posts, followed by ENFP, ENTJ, etc. It is interesting to note that the users with the highest number of posts are all Extroverts. We could come to an inference that extroverted people tend to post more. Now another thing to point out is that this is an unbalanced dataset, whereby we have fewer data for introverted users. This may pose to be a problem as we get into the machine learning portion.

![Dataplot1](/screenshots/plot1.png?raw=true "Server input")

After looking at the data, to proceed with the Machine Learning section, we would need to pre-process the data. **Disclaimer:** Note that since this dataset was extremely difficult to handle correctly, I required assistance from a Kaggle Notebook. Much of the pre-process code comes from [MBTI Kaggle](https://www.kaggle.com/code/rajshreev/mbti-personality-predictor-using-machine-learning). However, I have read,understood the code and learned from it. The first iteration of preprocessing required the removing of links (since links were not indicative of personality), punctuations, stopwords (like 'uh'), short words, and random mbti within the sentences itself. I then utilized Logistic Regression as the classification model. However, this proved to be inaccurate and I had a second iteration of preprocessing of data.

The reason for this second stage is that the model must choose between 1 of 16 classifications. Instead, it would be more accurate to split each letter of type so that it is 4 sections. Then, the model would only need to classify 1 out of 2 letters (but four times). More information about this can be seen in the Jupyter Notebook.

Then, further preprocessing was done. Additions included lemmatization, and changing the 'type' into binary form. (Ex. INFJ = 0 0 0 0 and ESTP = 1 1 1 1). There is also a function to revert from binary back to MBTI form. Next, I utilized CountVectorizer and TF-IDF. CountVectorizer converts text data so that it is easily used in machine learning models. In other words, it turns the text into a "bag-of-words", whereby the matrix represents the count that each word appears. TF-IDF, or term frequency-inverse document frequency, is a weighting system that evaluates the importance of each word based on how often it appears in other documents. 

Now, we can go into the Machine Learning section for the final pre-processed data. I first implemented a RandomForest model, which was trained individually for each personality type. In other words, it would spit out a result for I/E, N/S, F/T, J/P and append it to a list for every iteration. It would happen 4 times, so the list would be a list of 4 binary numbers (ex. 1 0 1 0). From that list, we can translate it back into an MBTI! How awesome is that!

Now after creating the model, I tested it out using a letter from the Former President of the United States, Barack Obama. The letter was kept in string convert, but it was converetd to a pd.Dataframe because this was the format that the model was familiar with. This is important because it is something that would also need to be done on the Flask Server after putting the model into production. The RandomForest model predicted Barack Obama to be of type INTP. Internet sources say he is ENxx, potentially ENTP.. so the model is not far off, but I wanted to try making it more accurate.

Normally I would have implemented GridSearchCV and go through multiple parameters, but because of time constraints and the fact that the model needs to run four times, I settled for a quicker yet less effective option. I created a RandomGrid containing hyper-parameters like n_estimator and max_depth. Then I put it through a RandomSearchCV, and this gave four best performing models for each of the I/E, N/S, F/T, and J/P iterations. Since I could not find a way to have a single model that has different hyper-parameters and deals with the four cases separately, I had to choose one set of hyper-parameters that would be the best model for all four. After choosing the best model, I re-ran the test and it predicted Barack Obama to be ESTP. Comparing the 'best model' with the original random forest, the accuracies were not very different. Likely this 'best model' was not actually a best model at all, since the RandomSearchCV was not extensive enough. 

Regardless, I exported this best RF model out as a joblib file. This is when I started setting up the Flask Server and was having issues, but I realized one of the things I also had to export was the trained and fitted CountVectorizer and TF-IDF transformer. I could not initialize a new cntizer or tfizer on the Flask Server, since they were not fitted with the vocabulary.

Next, I wanted to explore another model called Support Vector Classification, which is an SVM Classifier. Using the same process as above, I trained and tested SVC with an original model, and also tried to find a best model. I had similar issues with finding the best hyper-parameters because I did not have a hyper-parameter that worked for all four iterations. Regardless, I had to choose one set. 

The table of all machine learning models can be found below in the format (training score, testing score):

-Original RF Score: (0.99, 0.616)
-Best RF Score: (0.939, 0.611)
-Original SVC Score: (0.899, 0.629)
-Best SVC SCore: (0.983, 0.635)

Now that we had the Best Model for SVC, it was exported out using joblib for use in the server!

### React.js Frontend and Flask Backend Server

As discussed above and in the proposal, the frontend was done using React.js and the backend was created using Flask. 

For the backend the main part was that I needed to load the Classifier, CountVectorizer, and TF-IDF Transformer using joblib. I also realized that I had to initialize many pre-processing variables and functions, because the string that was passed in via JSON needed to be in the same format as what the model originally received. I was stuck on this for quite some time, but managed to figure out all the bugs and issues. 

I added one JSON input field where model would accept a text input, and that would be preprocessed and passed into the cntizer, tf-idf, and then finally the classifier model. Similar to in the notebook, it needed to be ran four times, and the result is appended to a list. Then the list is converted back into an MBTI type, and that is returned back to the frontend as a response.

The second JSON input field that I added was the model-choice number, which was an integer. I thought it would be interesting to have the ability to choose different ML models. Since I already had two, RF and SVC, I thought that I could implement this. Basically, if the user passed in "1", then the classifier will load the SVC, else the classifier will load RF.

Now for the frontend, which was done in React.js, it was a simple single page web application where I had a textarea for the input, a selection for the model choice, and then finally a submit button. I also included buttons which would automatically fill the textarea with text so that the user can test out the web app without typing too much. The values from the text area and the selection are sent to the Flask server backend via a POST request, which is then sent back as a response. The response is set to a variable, and it is shown on the page.

See screenshots of the Server and Frontend below:

![Server Input](/screenshots/Server_input.png?raw=true "Server input")
![Server Response](/screenshots/Server_response.png?raw=true "Server response")
![Frontend 1](/screenshots/frontend1.png?raw=true "Server response")
![Frontend 2](/screenshots/frontend2.png?raw=true "Server response")

## Interpretation

The motivation for this project that was mentioned in the proposal was that I was interested in creating a fullstack web application that served a machine learning model on the backend. I believe that I was able to successful create a fairly decent fullstack application, and I am satisfied with my results in that respect. 

I went through a Kaggle Notebook and learned a lot about preprocessing text data, then explored multiple machine learning models, then was able to set up a Flask backend that served two ML models, finally created a React.js frontend and integrated them all together.

However, the 'question' that I touched upon in the proposal was if it was possible to create a ML model  that can accurately predict the MBTI based on text. Sadly, I do not believe I was able to fully accomplish this with great accuracy. The machine learning models from my Jupyter Notebook had training accuracies of around 60%, which is acceptable. However, I noticed that when I loaded the joblib models, my responses from the Flask server were fairly inconsistent to what I would expect the model to be. Even if it was 60%, I noticed that the model would consistently respond with [0 0 0 0] or [1 1 1 1] (INFJ or ESTP respectively). Likely I would need to research on how to better load the machine learning model on the flask server. 

## Reflection

There were a couple deviations from the proposal. Firstly, the tutorial that I was more interested in following was from [deploymachinelearning](https://www.deploymachinelearning.com/), and it involved a very extensive project which aimed for to have features such as "handle many API endpoints (with each having an ML algorithm), fast deployments and continuous integration, support monitoring and algorithm diagnostic (A/B tests), is scalable (with containers), and has a user interface". I followed along with the tutorial and got it working, but there were a lot of stuff that I did not understand. So I did not go along with this project because there would have been a lot of backend server code that was not written by me, and also I did not understand. 

I went with the tutorial from [towardsdatascience](https://towardsdatascience.com/create-a-complete-machine-learning-web-application-using-react-and-flask-859340bddb33), which proved to be a lot easier to follow, and I understood every part of it and was able to make it into my own project. 

A positive deviation was that I had only planned on using one Machine Learning model in the proposal, but I managed to test 3 models (LogReg, RF, and SVC) and used joblib to serve two ML models. Additionally, I was scared that I would not have been able to figure out the MBTI dataset, and thought about using Heart Disease dataset as a backup, which luckily I did not have to do that. 

I did, however, need to use a resource which was the [MBTI Kaggle Notebook](https://www.kaggle.com/code/rajshreev/mbti-personality-predictor-using-machine-learning) that I keep mentioning throughout this report. This would be another deviation since I did not mention it in my proposal. The notebook was extremely helpful especially for the pre-processing stage, but also it had guidelines for the Machine Learning section as wells (ex. training the model for 4 iterations).

## Resources Used

The resources that I used were from: [TowardsDataScience](https://towardsdatascience.com/create-a-complete-machine-learning-web-application-using-react-and-flask-859340bddb33) for the full-stack tutorial and a [MBTI Kaggle Notebook](https://www.kaggle.com/code/rajshreev/mbti-personality-predictor-using-machine-learning) for the preprocessing of the dataset.

I used the flask server template from TowardsDataScience, but added many things to the file. The React.js frontend was completely created by myself. The Dataset that I used was from Kaggle, and I found a helpful notebook that assisted me in clearing up some difficulties in pre-processing  the data. Using the knowledge from the Kaggle notebook, along with my background knowledge from the Machine Learning course and Big Data course, I was able to successfully pre-process the MBTI posts. Note that the pre-processing step was difficult for this MBTI dataset, so a lot of my code in that section was heavily inspired from the Notebook, which I have read and learnt from. The other sections of this project was mainly written by me, with some inspiration from other resources like the previously-mentioned Kaggle Notebook and the Flask template.
