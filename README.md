# PartyVite-Server
Server portion for Twilio functions in react native app

### To run locally 
curl -d '{"invitees":[phonenumber],"message":"invitation message"}' -H "Content-Type: application/json" -X POST localhost:3000/invite

### Deployed Server
curl -d '{"invitees":[phonenumber],"message":"invitation message"}' -H "Content-Type: application/json" -X POST https://fierce-sea-42604.herokuapp.com/invite
