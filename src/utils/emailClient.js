import nodemailer from 'nodemailer';
import * as config from '../config/config';

const TRANSPORT_SETTINGS = config.get().notifications.email.transport;

let emailClient = nodemailer.createTransport(TRANSPORT_SETTINGS);

export default emailClient;
