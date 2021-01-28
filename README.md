   <h1 align="center"> Twitook </h1><br />

1. **Run local development**<br />
		In shell tab, run the command: npm run watch:dev
   	In a browser, open: localhost:8000
	
2. **Run development in Docker**<br />
   Edit docker-compose.yml web command to: "npm run watch:dev"
   <br />
   In shell tab, run the command: docker-compose build
   Once built, run the command: docker-compose up -d
   <br />
   In a browser, open: localhost:8000<br />
   <br />
   IMPORTANT<br />
   Before pushing changes to github, edit docker-compose.yml back to: "npm start"<br />
   Failing to do so will result in environment variable errors <br />

3. **Update production application on AWS**<br />
   Navigate to folder with PEM key file<br />
   SSH into ec2 container with command: ssh -i "FILENAME.pem" CONTAINER-URL<br />
   Run the command (delete all untracked files): git clean<br />
   Run the command (updates to the latest github commit): git pull<br />
   Destroy outdated containers with the command: docker-compose down<br />
   Create containers with updated files with the command: docker-compose build<br />
   Then run the command: docker-compose up -d<br />
