# QUESTION-ANSWER-API

# Endpoints

You can use this base URL to test : https://question-answer-api-restful.herokuapp.com/
* users

      baseURL/api/users ==>GET ==> response = all users
      baseURL/api/users/:id ==>GET ==> response = single user info by id
       
* questions

      baseURL/api/questions/allquestions ==>GET ==> response = all questions
      baseURL/api/questions/:id ==>GET ==> response = single user info by id
      baseURL/api/questions/:id/like ==>GET ==> response = liked question info---you need access token for this operation!
      baseURL/api/questions/:id/undolike ==>GET ==> response = question info---you need access token for this operation!
      baseURL/api/questions/ask ==>POST ==> response = created question info---you need access token for this operation!
      baseURL/api/questions/:id/edit ==>PUT ==> response = edited question info---you need access token for this operation!
      baseURL/api/questions/:id/delete ==>DELETE ==> response = deleted question info---you need access token for this operation!
      
* answers

* authentication

# Scenario:

* In this Project you can access system with two roles:

     **Admin**
 
     **User**
 
 * As user you can:

 - ask Question
 
 - answer Question
 
 - get all Question by any user
 
 - get single Question/Answer
 
 - upload Profıle Image
 
 - reset your Password
 
 * In addition to users, admin has the following rights:
 
  -blocking a user
  
  -deleting a user
  
 

# Development Strategie:

* In this Project i have built Question-Answer RESTFUL API with Express.js

* I used mongo db as database

* For mail services i have used nodemailer




