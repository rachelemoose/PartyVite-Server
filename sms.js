require('dotenv').config();
const client = require('twilio')(accountSid, authToken);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
// this array needs to popoulate with hosts's contacts 
const invitees = ['+15716436981', '+17187535298']

let body = "Rachel Moose has sent you a PartyVite! Send 'Yes' if you can make it, 'No' if you can't attend, and 'Maybe', if you're not sure."

Promise.all(
  invitees.map(invitee => {
    return client.messages.create({
      to: invitee,
      from: twilioNumber,
      body: body
    });
  })
)
  .then(messages => {
    console.log('Messages sent!');
  })
  .catch(err => console.error(err));