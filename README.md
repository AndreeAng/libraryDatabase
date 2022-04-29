# libraryDatabase

1. Make sure to Install Node.js and then make sure to run ```npm install mysql``` from a terminal
2. In SQL in order to connect to the database make sure to run these two queries once before running the app for the first time to enable privileges:

   ```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';```
   
   ```flush privileges;```
   
3. To execute the project open a Terminal at your project location and type:
   
   ```node index.js``` 
   
4. To view the web app go to: http://127.0.0.1:3000/ in your browser

5. To exit the app click the terminal and hold ```ctrl+c```
