import config from './../config/config';
import logger from './../foundation/logger';
import { STATUS_UP, checkHostStatus, getCheckInterval } from './../services/status';

class Monitor {
    constructor(service) {
        this.service = service;
        this.status = null;
        this.lastStatusChanged = null;
    }

    start() {
        logger.info(`Started watching ${this.service.name}`);
        this.doMonitor();
    }

    doMonitor() {
        let {url, name, minInterval, maxInterval} = this.service;

        checkHostStatus(url).then(status => {
            let interval = getCheckInterval(status, minInterval, maxInterval);
            logger.debug(`Status of ${name} service is ${status}`);

            // If the status has changed
            if (this.service.status !== status) {
                this.handleStatusChange(status);
            }
            logger.debug(`Check interval for ${name} = ${interval}`);
            setTimeout(this.doMonitor.bind(this), interval);
        });
    }

    handleStatusChange(newStatus) {
        let {name, status} = this.service;
        let currentTime = new Date();

        if (newStatus === STATUS_UP && this.lastStatusChanged) {
            let diff = calculateTimeDiff(this.lastStatusChanged, currentTime);

            logger.info(`${name} is up after ${diff} seconds of downtime.`);
        } else {
            logger.info(`${name} is ${newStatus}`);
        }

        this.service.status = newStatus;
        this.lastStatusChanged = currentTime; // Set the status changed date to current time.
    }
}

function calculateTimeDiff(date1, date2) {
    return Math.ceil(date2.getTime() - date1.getTime()) / 1000; // Seconds
}

export default Monitor;