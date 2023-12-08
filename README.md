# Twitter-Clone
As the name suggest this project is a clone of the twitter website (now known as X) and so just like the twitter it has similar features such as:
1. Create and post a tweet.
2. Like a tweet.
3. Comment on a tweet.
4. Bookmark a tweet.
## Refer below steps to run the project
1. Create a .env file and enter the following in it:
   ```
    PORT = 4000
    CONNECTION_URI= "Enter Connection URI of your MongoDb Cloud database"
    SECRET = "Any secret of your choice"
   ```
2. Then open 2 terminals and write the following:
   
   -In the first terminal:
   ```
   cd backend
   nodemon server.js
   ```
   -In the second terminal:
   ```
   cd frontend
   npm start
   ```


