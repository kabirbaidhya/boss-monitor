import nodemailer from 'nodemailer';
import config from '../config/config';

const TRANSPORT_SETTINGS = config.notifications.email.transport;

let emailClient = nodemailer.createTransport(TRANSPORT_SETTINGS);

export default emailClient;
