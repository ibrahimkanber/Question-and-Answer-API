# QUESTION-ANSWER-API

![ProjectManagement2](https://user-images.githubusercontent.com/65809527/101241589-b9fb2c80-36f7-11eb-9767-21b21e73a674.gif)

# Endpoints

You can use this base URL to test : https://question-answer-api-restful.herokuapp.com/

* authentication

      baseURL/api/auth/register ==>POST ==> response = created user info
      
      baseURL/api/auth/login ==>POST ==> response = login info
      
      baseURL/api/auth/logout ==>POST ==> response = log out---you need access token for this operation!
      
      baseURL/api/auth/profile ==>GET ==> response = user profile---you need access token for this operation!
      
      baseURL/api/auth/forgotpassword ==>POST ==> response = success status ---you need access token for this operation!
      
      baseURL/api/auth/resetpassword ==>PUT ==> response = success status,token and password ---you need access token for this operation!
      
      baseURL/api/auth/resetpassword ==>PUT ==> response = success status,token and password ---you need access token for this operation!
      
      baseURL/api/auth/edit ==>PUT ==> response = edited profile info---you need access token for this operation!

* admin

      baseURL/api/admin/block/:id ==>GET ==> response = success status ---you need access token for this operation!
      
      baseURL/api/admin/user/:id ==>DELETE ==> response = success status ---you need access token for this operation!

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

      baseURL/api/questions/:id/answers==>GET ==> response = all answers by question id
      
      baseURL/api/questions/:id/answers==>POST ==> response = add new answer to selected question ---you need access token for this operation!
      
      baseURL/api/questions/:id/answers/:answer_id ==>GET ==> response = get single answer
      
      baseURL/api/questions/:id/answers/:answer_id/edit  ==>PUT ==> response = edited answer info---you need access token for this operation!
      
      baseURL/api/questions/:id/answers/:answer_id/like  ==>GET ==> response = liked answer info---you need access token for this operation!
      
      baseURL/api/questions/:id/answers/:answer_id/undolike  ==>GET ==> response =  answer info---you need access token for this operation!
      
      baseURL/api/questions/:id/answers/:answer_id/delete  ==>DELETE ==> response =   deleted answer info---you need access token for this operation!
      


      

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




