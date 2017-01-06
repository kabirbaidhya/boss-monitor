import Promise from 'bluebird';

global.Promise = Promise;

export default {
    logging: {
        level: process.env.LOGGING_LEVEL || 'info'
    },
    monitoring: {
        minInterval: 1000,
        maxInterval: 10000,
        method: 'OPTIONS',
        downStatus: '^(5..|4..)$',
    },
    services: [
        {
            name: 'Ontarget Java Web API',
            url: 'http://127.0.0.1:8080'
        },
        {
            name: 'Ontarget Model API',
            url: 'https://127.0.0.1:8000'
        },
        {
            name: 'Ontarget NIOS API',
            url: 'https://127.0.0.1:9001'
        },
        {
            name: 'Test python server',
            url: 'http://127.0.0.1:4321'
        }
    ]
};