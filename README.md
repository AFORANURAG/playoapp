# playoassignment
<h2>
Welcome to the documentation of my project! This documentation will guide you through the different functionalities and features of the backend codebase. The backend is responsible for handling all the server-side operations, such as processing requests, communicating with the database, and serving responses.
<h2>
<h3>Before starting , I would like to tell you that , I was very interested in implementing my backend server in a react app but due to time constraint i was not able to so , however I will complete it in the near future.<h3>

#Tech-Stack
  
  <div>  
  <img src = "https://img.shields.io/badge/mongodb-black?style=for-the-badge&logo=mongodb&logoColor=green" />
  <img src = "https://img.shields.io/badge/nodejs-black?style=for-the-badge&logo=nodejs&logoColor=green" />
  <img src = "https://img.shields.io/badge/express-black?style=for-the-badge&logo=expressjs&logoColor=white" />
  <img src = "https://img.shields.io/badge/mongoose-black?style=for-the-badge&logo=mongoose&logoColor=green" />
  <img src = "https://img.shields.io/badge/redis-red?style=for-the-badge&logo=redis&logoColor=white" />
  <img src = "https://img.shields.io/badge/jsonwebtoken-black?style=for-the-badge&logo=jsonwebtoken&logoColor=white" />
  <img src = "https://img.shields.io/badge/postman-white?style=for-the-badge&logo=postman&logoColor=black" />
  <img src = "https://img.shields.io/badge/pbdkf2-black?style=for-the-badge&logo=pbdkf2&logoColor=white" />
  <img src = "https://img.shields.io/badge/node-cron-black?style=for-the-badge&logo=node-cron&logoColor=white" />
  </div>

  <h2>
  I will first describe the different components of this assignment or project so that it will be easier for me explain the workings.
  </h2>
  
  <h2>controllers/routes </h2>
  
  
  
  <p>The Routes folder is used to handle routing logic and it basically communicate with the database and it handle the request and response</p>
  <div>
    <p>There are three controller in total</p>  
    <ol>
      <li>authencation route</li>
      <li>joinevent route</li>
      <li>schedule eventroute</li>
    </ol>
  </div>
  
  <h2>models</h2>
  
  <p>The Models directory is used to define the database schema logic</p>
  <div>
    <p>There are three models</p>
    <ol>
      <li>userModel
      <img src = "https://user-images.githubusercontent.com/108891203/224583176-9e84a107-cff3-4b46-b3d0-ea819f9d1a82.png" />  
      </li>
      <li>RequestModel</li>
      <li>eventmodel </li>
    </ol>
  </div>
  
  <h2>middlewares and validators(validators are also middlewares)</h2>
    <p>It contain token validator,email validator and password validator </p>
  <div>
    <p>There are three middleware ensures that the information which is coming is safe or not invalid</p>
    <ol>
      <li>email validator in the validator directory check for the validity of the email</li>
      <li>token validator in middleware directory checks for the validity of jsonwebtoken</li>
      <li>password validator checks for the validity of strenght of password, password must be length 8 it should contain atleast one numeric digit,one uppercase,one lowercase and one special character </li>
    </ol>
  </div>

  
  
  
  
  
  
  <div style:"text-align:"center">
 <h2>Authentication Route </h2>                                
 <h4>app.use("/authentication",Authrouter)</h4> ;                                
                              <h3>Different routes in authenication router are as follows.It is the routes folder.</h3>
 
<ol>
                              
 <li>
  authentication/login-->It handles all the login logic, it first checks whether the user have a accout or not , if yes ,then just login otherwise it will just display this message "it looks like ,you don't have an account,please register first".Here we are using email and password validator also just keep or have valid email and password.                     
</li>
   
<li>
authentication/signup -->As its name suggest it handles the signup process, first we check whther the user is has an accound or not. we will
only register user if he don't have any account.
</li>

<li>
authentication/logout -->It implements the concept of caching and blacklisting, basically when a user is is logging out , we just put his jwt
in redis set with the help of redis client and SAdd command , so when tries to login back with same token , we can stop him , we can check
whether that token is blaklisted or not with sismember command. (just a small functionality to revise redis). 
</li>
  
</ol>
                                 

</div>
  
  
  
  
  
  
  
  
  
<div style:"text-align:"center">
 <h2>scheduleevent Route </h2>                                
 <h4>app.use("/eventschedule",eventRouter)</h4> ;                                
 <h3>Different routes in eventRouter are as follows. It is in the schedule event file in the routes directory</h3>
 
<ol>
                              
 <li>
 /createevent(POST) -->this is a important route. basically this route is responsible for creating the events. 
                                              
</li>
   
<li>
authentication/signup -->As its name suggest it handles the signup process, first we check whther the user is has an accound or not. we will
only register user if he don't have any account.
</li>

<li>
authentication/logout -->It implements the concept of caching and blacklisting, basically when a user is is logging out , we just put his jwt
in redis set with the help of redis client and SAdd command , so when tries to login back with same token , we can stop him , we can check
whether that token is blaklisted or not with sismember command. (just a small functionality to revise redis). 
</li>
  
</ol>
                                 

</div>  
  
  
  
  
  
  
