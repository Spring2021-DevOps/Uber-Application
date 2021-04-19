k**UBER REACT App**
- To test locally :
`
    npm update
	`
	`npm install`
	`npm run build`
	`npm start`
- Running on nginx :
    1. Update the app's .conf file in /etc/nginx 
	2. Add it to sites-available
	3. Add a symbolic link to sites-enabled
	4. sudo systemctl restart nginx
	
-  The application can be run on an AWS instance using the terraform script

