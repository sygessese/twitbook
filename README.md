<h1 align="center">
  Twitook 
</h1>

1. **Run local development**
   In shell tab, run the command: npm run watch:dev
   In a browser, open: localhost:8000

2. **Run local production in Docker**
   In shell tab, run the command: docker-compose build
   Once built, run the command: docker-compose up -d
   In a browser, open: localhost:8000

3. **Update production application on AWS**
   Navigate to folder with PEM key file
   SSH into ec2 container with command: ssh -i "FILENAME.pem" CONTAINER-URL
   Run the command (delete all untracked files): git clean
   Run the command (updates to the latest github commit): git pull
   Destroy outdated containers with the command: docker-compose down
   Create containers with updated files with the command: docker-compose build
   Then run the command: docker-compose up -d
