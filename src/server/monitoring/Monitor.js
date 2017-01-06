import config from './../config/config';
import logger from './../foundation/logger';
import { STATUS_UP, checkHostStatus, getCheckInterval } from './../services/status';
import { notify } from './../services/notifer';
import moment from 'moment';

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
        let currentTime = moment();
        let params = {
            name,
            status: newStatus,
            time: currentTime.clone(),
            lastStatusChanged: this.lastStatusChanged ? moment(this.lastStatusChanged).clone() : null
        };

        if (newStatus === STATUS_UP && this.lastStatusChanged) {
            let downtime = currentTime.diff(this.lastStatusChanged);
            params.downtime = moment.duration(downtime, 'milliseconds').humanize();

            logger.info(`${name} is up after ${params.downtime} of downtime.`);
        } else {
            logger.info(`${name} is ${newStatus}`);
        }

        // Send notifications
        notify(params);

        this.service.status = newStatus;
        this.lastStatusChanged = currentTime; // Set the status changed date to current time.
    }
}

export default Monitor;