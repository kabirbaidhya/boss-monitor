import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStatusInfo } from '../hoc/status';

import * as websocket from '../../services/websocket';
import * as statusService from '../../services/status';

import Panel from '../commons/Panel';
import ServiceList from './ServiceList';
import Spinner from '../commons/Spinner';

/**
 * Fetch list of services from the API and provides
 * to ServiceList component.
 */
class StatusPanel extends Component {
  componentDidMount() {
    const { handleWebSocketNotification } = this.props;

    this.fetchStatuses();
    websocket.initialize({ onMessage: handleWebSocketNotification });
  }

  /**
   * Fetch list of services.
   *
   * @returns {Promise}
   */
  async fetchStatuses() {
    const { updateStatus } = this.props;

    updateStatus({ isLoading: true, services: [] });

    try {
      let services = await statusService.fetchServiceStatuses();

      updateStatus({ services, isLoading: false });
    } catch (err) {
      // TODO: Show error messages
    }
  }

  render() {
    const { isLoading, services } = this.props.status;
    const statuses = services && services.map(service => JSON.parse(service.status));
    const { className, message } = statusService.getOutageParams(statuses);

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <>
        <Panel title={message} panelClassName={className} />
        <ServiceList services={services} />
      </>
    );
  }
}

StatusPanel.propTypes = {
  status: PropTypes.object,
  updateStatus: PropTypes.func,
  handleWebSocketNotification: PropTypes.func
};

export default withStatusInfo(StatusPanel);
