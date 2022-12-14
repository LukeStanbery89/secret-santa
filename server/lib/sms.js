'use strict';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendSMS(params) {
    if (!params.body || !params.to) {
        throw new Error('Invalid SMS request format');
    }
    const message = {
        body: params.body,
        from: process.env.TWILIO_NUMBER,
        to: params.to,
    };
    if (process.env.SMS_ENABLED === true || process.env.SMS_ENABLED === 'true') {
        console.log(`Sending SMS to ${message.to}...`);
        return client.messages
            .create(message)
            .then(message => console.log(message.sid))
            .catch(error => console.error('Error sending SMS: ', error));
    } else {
        console.log('SMS message: ', message);
    }
}

module.exports = {
    sendSMS,
};