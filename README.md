# playoassignmentdocumentation
<h2>
Welcome to the documentation of my project! This documentation will guide you through the different functionalities and features of the backend codebase. The backend is responsible for handling all the server-side operations, such as processing requests, communicating with the database, and serving responses.
<h2>
<h5>Before starting , I would like to tell you that , I was very interested in implementing my backend server in a react app but due to time constraint i was not able to so , however I will complete it in the near future.For (schedule cleanup of pending requests )i am using cron job but other things are also avalaible such as ttl and set ttl indexes , but again because of time consstraint i was not able to explore it fully but  set ttl indexes is a great concept.and i think more effiecint also.<h5>

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
      <li>userModel </li>
      <li>RequestModel(every request by default has pending status(enums))</li>
      <li>eventmodel </li>
    </ol>
 <img src = "https://user-images.githubusercontent.com/108891203/224583374-4b411c7d-df51-4885-b83b-f65e583bd3ee.png" />  
 <img src = "https://user-images.githubusercontent.com/108891203/224583176-9e84a107-cff3-4b46-b3d0-ea819f9d1a82.png" />  
  <img src="https://user-images.githubusercontent.com/108891203/224585140-71085a9c-96b2-4ff5-afae-75c9088e2c74.jpg">     
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
only register user if he don't have any account.it does not have any account we hash the password with pbdkf2 with sha512 which yield a 128 character hexadecimal string. and then we feed it to our database in the Usermodel collection.
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
 /eventschedule/createevent(POST) -->this is a important route. basically this route is responsible for creating the events.I am using Eventmodel for to interact with the mongodb. we first check whether a same event already exists or not,with the help of userid(eventcreatorid) and timings(). this is just to ensure that the eventorganiser could not make two same event with the same  timings .I am also checking whether the timings are of 
future or not, the event timings should always be greater than the timing when the date is feeded to db or only future dates are allowed.                                         
</li>
   
<li>
/eventschedule/updatestatus(Patch Request)-->this route is basically responsible for updating the requests ,it takes (newstatus,requestid)
requestid is the defaultid provided by the mongodb(it is not any kind of reference).so with the help of requestid , it will find 
request and then will update the status of the request.(only one request will either be rejected or accepted at a time)
</li>

<li>
/eventschedule/getrequest(get) -->It will fetch out all the request that have been come up for the eventorganiser, I am creating a reference in request collection and reference basically points to the userid of eventorganisor or eventcreator. so with the help of userid , i am able to fetch out all the requests associated to that event.
</li>
  
</ol>
                                 

</div>  
  

                             
                             
                             
                             

                             
                             
                             
<div style:"text-align:"center">
 <h2>joinevent Route/Controller </h2>                                
 <h4>app.use("/joinevent",joinEventRouter);</h4> ;                                
 <h3>Different routes in joinEventRouter are as follows. It is in the joinevent file in the routes directory</h3>
 
<ol>
                              
 <li>
 /joinevent(get) --This route is simple , it just use to load or get all the events , it first check the token and then loads all the events                                         
</li>
   
<li>
/joinevent/createrequest(POST)-->This route is for sending the request to an event. It is an important route as it has a lot of important 
logic. these fields(userid, emailOfJoinee,email,timings) comes from froentend ,where userid is the id of creator and emailofjoinee is the email of joinee, email comes from jwt and timings comes from frontend.(<b>A user can't request to his own event and a user can not request more than once</b>). After all validations and checkings we basically save the request to request collection.
</li>

 
<li>
/joinevent//allrequest(get) -->Get all the request made by the user with its email(email as joinee).It is a simple route
</li>
  
<li>
/joinevent//cancelrequest(delete) -->it basically deletes the request made by a user, A really important things is that he can delete only his requests because the emailid which i am using forsearching in request collections is coming from jwt, so it has to be of user only, he can't
delete others request
</li>  
  
  
</ol>
                                 

</div>  
  
  <h1>Thank you for giving your precious time and Have a great day ahead!</h2> 
  
                             
                             
                            
  
  
  
