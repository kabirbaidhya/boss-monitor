import config from './config/config';
import logger from './foundation/logger';
import Monitor from './monitoring/Monitor';

config.services.forEach(service => {
    let serviceConfig = Object.assign({}, config.monitoring, service);
    let monitor = new Monitor(serviceConfig);

    monitor.start();
});
