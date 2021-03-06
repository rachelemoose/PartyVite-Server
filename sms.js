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
// curl -d '{"invitees":[15554443333],"message":"Hello PartyVite"}' -H "Content-Type: application/json" -X POST localhost:3000/invite
// this array needs to popoulate with hosts's contacts 

app.post('/invite', (req, res) => {
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
        res.status(204);
        res.send("")
    })
    .catch(err => {
        console.error(err); 
        res.status(404);
        res.send(err);

    });
});


  app.listen(PORT, function() {
    console.log(
      "==> 🌎  [WEB] Server listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });