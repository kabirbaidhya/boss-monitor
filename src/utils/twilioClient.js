import twilio from 'twilio';
import config from '../config/config';

const AUTH_TOKEN = config.notifications.twilio.authToken;
const ACCOUNT_SID = config.notifications.twilio.accountSid;

let twilioClient = twilio(ACCOUNT_SID, AUTH_TOKEN);

export default twilioClient;
