require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
const express = require('express');
const app = express();
var PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
app.use(bodyParser());
// curl -d '{"invitees":[15716436981],"message":"Hello PartyVite"}' -H "Content-Type: application/json" -X POST localhost:3000/invite
// this array needs to popoulate with hosts's contacts 

app.post('/invite', (req, res) => {
    // const invitees = ['+15716436981', '+17187535298']
    // let message = "Rachel Moose has sent you a PartyVite! Send 'Yes' if you can make it, 'No' if you can't attend, and 'Maybe', if you're not sure."
    console.log(req.body)
    const invitees = req.body.invitees
    const message = req.body.message
    Promise.all(
    invitees.map(invitee => {
        return client.messages.create({
        to: invitee,
        from: twilioNumber,
        body: message
        });
    })
    )
    .then(messages => {
        console.log('Messages sent!');
    })
    .catch(err => console.error(err));
});


  app.listen(PORT, function() {
    console.log(
      "==> 🌎  [WEB] Server listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });