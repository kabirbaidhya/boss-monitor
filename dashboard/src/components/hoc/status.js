import { update } from 'ramda';
import React, { Component } from 'react';

/**
 * HOC that wraps the status page component with state
 * containing latest status of services.
 */
export const withStatusInfo = WrappedComponent => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        status: {
          services: [],
          isLoading: false
        }
      };
    }

    setStatus = status => {
      this.setState({ status });
    }

    /**
     * Update the current status of services.
     */
    updateStatus = newStatus => {
      let updatedStatus = Object.assign({}, this.state.status, newStatus);

      this.setStatus(updatedStatus);
    }

    handleWebSocketNotification = (e, data) => {
      let { status } = this.state;

      // Updates the only the updated service data in the services list (Immutable).
      let index = status.services.findIndex(item => item.name === data.name);
      let services = update(index, Object.assign({}, status.services[index], data), status.services);

      this.setStatus(Object.assign({}, status, { services }));
    }

    render() {
      let { status } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          status={status}
          updateStatus={this.updateStatus}
          handleWebSocketNotification={this.handleWebSocketNotification}
        />
      );
    }
  };
};
