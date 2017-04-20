import twilio from 'twilio';
import config from '../config/config';

const ACCOUNT_SID = config.notifications.twilio.accountSid;
const AUTH_TOKEN = config.notifications.twilio.authToken;

let twilioClient = twilio(ACCOUNT_SID, AUTH_TOKEN);

export default twilioClient;
