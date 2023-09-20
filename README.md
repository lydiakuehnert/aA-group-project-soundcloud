# LoudCloud

LoudCloud is a soft clone of SoundCloud. It is a music site where users can upload songs, review songs, like and unlike songs, and play songs. LoudCloud was built using Flask and Python for the backend and React and Redux for the frontend. 

Live Link: https://loudcloud.onrender.com/	

## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  
 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

 ## Index

[Feature List](https://github.com/lydiakuehnert/aA-group-project-soundcloud/wiki/Feature-List) | [Database Schema](https://github.com/lydiakuehnert/aA-group-project-soundcloud/wiki/Database-Schema) | [User Stories](https://github.com/lydiakuehnert/aA-group-project-soundcloud/wiki/User-Stories) 

## Home Page
![splash](https://myaaprojects.s3.us-east-2.amazonaws.com/kora-splash.png)

## Song Page
![product](https://myaaprojects.s3.us-east-2.amazonaws.com/Kora-questions.png)

## Upload Page
![Review](https://myaaprojects.s3.us-east-2.amazonaws.com/Kora-answers.png)


# Endpoints
## Auth
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/auth/        | This fetch is sent upon initial app load and on subsequent refreshes.<br>It returns an object representing the current user, if user is logged in.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING<br>}<br>|
| POST /api/auth/unauthorized      | This endpoint will be routed to in the case that a protected route does not pass validations for the current user.<br>It returns an object with an errors property, which is an array with the value 'Unauthorized'          | {<br>&nbsp;&nbsp;&nbsp;'errors': ['Unauthorized']<br>}<br>|
| POST /api/auth/signup        | This fetch sends the form data signup from data to the backend to process the creation of a new user.<br>It returns an object representing the current user, after logging them in, if account creation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING<br>}<br>|
| POST /api/auth/login | This fetch attempts to login a user with the provided credentials.<br>It returns an object representing the current user, if validation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING<br>}<br>|                                                                        
| POST /api/auth/logout | This fetch will logout the current user.<br>It returns an object with the message 'User logged Out' if it succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'message': 'User logged out'<br>}<br>|

## Songs
| Request                        | Purpose                | Return Value  | 
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/songs        | This fetch is sent to get all the songs in the song table. Upon success, it returns an array of song objects.                 | [{<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING,<br>&nbsp;&nbsp;&nbsp;'audio': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'likes': INT,<br>}]<br>|
| POST /api/songs/upload        | This fetch is sent to add a new item to the song table. Upon success, it returns an object with the key of 'newSong' representing that item.                 | {<br>&nbsp;&nbsp;&nbsp;'newSong': <br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING,<br>&nbsp;&nbsp;&nbsp;'audio': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'likes': INT,<br>}}<br>|
| PUT /api/songs/<int:id>       | This fetch is sent to update a song. Upon success, it returns an object representing that song with the updated information.                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING,<br>&nbsp;&nbsp;&nbsp;'audio': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'likes': INT,<br>}<br>|
| DELETE /api/songs/<int:id>        | This fetch is sent to delete a song. Upon success, it returns an object of success with the string "successfully deleted", otherwise, we throw an error.                | {"Success": "successfully deleted"}<br>|
| GET /api/songs/<int:id>        | This fetch is sent to get one song based on id. Upon success, it returns the an object with that song.                | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING,<br>&nbsp;&nbsp;&nbsp;'audio': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'likes': INT,<br>}<br>|
| GET /api/songs/search        | This fetch is sent to get songs based on a filter. Upon success, it returns an array of song objects.                | [{<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING,<br>&nbsp;&nbsp;&nbsp;'audio': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'likes': INT,<br>}]<br>|

## Shipping Info
| Request                        | Purpose                | Return Value  | 
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/shipping/<int:user_id>        | This fetch is sent to retrieve all shipping info records for the user specified by the id. Upon success, we return an array of objects representing that data.           | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 200<br>|
| POST /api/shipping/add        | This fetch is sent to add a new entry to the shipping info table. Due to the existence of the Primary property, we update the frontend store by sending back an array of all entries and replacing the value of the current state upon success.        | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 201<br>|
| PUT /api/shipping/update/<int:shipping_id>        | This fetch is sent to update the shipping info record specified by the shipping id. Upon success, we return an array of objects representing all entries for current user.           | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 200<br>|
| DELETE /api/shipping/delete     | This fetch sends a shipping info id in the body of the request. Upon successful deletion we return the updated array of user entries. | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 200<br>|

## Billing Info
| Request                        | Purpose                | Return Value  | 
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/billing/<int:user_id>        | This fetch is sent to retrieve all billing info records for the user specified by the id. Upon success, we return an array of objects representing that data.           | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 200<br>|
| POST /api/billing/add        | This fetch is sent to add a new entry to the billing info table. Due to the existence of the Primary property, we update the frontend store by sending back an array of all entries and replacing the value of the current state upon success.        | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 201<br>|
| PUT /api/shipping/update/<int:billing_id>        | This fetch is sent to update the billing info record specified by the billing id. Upon success, we return an array of objects representing all entries for current user.           | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 200<br>|
| DELETE /api/billing/delete     | This fetch sends a billing info id in the body of the request. Upon successful deletion we return the updated array of user entries. | ARRAY[<br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;apt_number: INT,<br>&nbsp;&nbsp;&nbsp;city: STRING,<br>&nbsp;&nbsp;&nbsp;company: STRING,<br>&nbsp;&nbsp;&nbsp;country: STRING,<br>&nbsp;&nbsp;&nbsp;primary: BOOLEAN,<br>&nbsp;&nbsp;&nbsp;shipping_name: STRING,<br>&nbsp;&nbsp;&nbsp;state: STRING,<br>&nbsp;&nbsp;&nbsp;street: STRING,<br>&nbsp;&nbsp;&nbsp;user_id: INT,<br>&nbsp;&nbsp;&nbsp;zip: STRING,<br>&nbsp;&nbsp;&nbsp;},<br>]<br><br>Status: 200<br>|

# Feature List
1. Cart
2. Shipping Entries
3. Billing Accounts

# Future Implementation Goals

1. Reviews (w/AWS image uploads)
2. ChatHelpBot (websockets)
3. Search Bar
4. Sales Professionals
5. Payment Accounts (Credit Cards / PayPal)
6. Make pixel perfect to target site.

# Connect
[LinkedIn](https://www.linkedin.com/in/brian-kiesel-94475696/)