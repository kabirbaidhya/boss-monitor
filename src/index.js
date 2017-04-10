import config from './config/config';
import Monitor from './monitoring/Monitor';

config.services.forEach(service => {
    let serviceConfig = Object.assign({}, config.monitoring, service);
    let monitor = new Monitor(serviceConfig);

    monitor.start();
});
