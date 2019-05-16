import { update } from 'ramda';
import React, { Component } from 'react';

/**
 * HOC that wraps the status page component with state
 * containing latest status of services.
 */
export const withIncidentInfo = WrappedComponent => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        incident: {
          history: [],
          isLoading: false
        }
      };
    }

    setIncident = incident => {
      this.setState({ incident });
    };

    /**
     * Update the current status of services.
     */
    updateIncident = newIncident => {
      let updatedIncident = Object.assign({}, this.state.incident, newIncident);

      this.setIncident(updatedIncident);
    };

    handleWebSocketNotification = (e, data) => {
      let { incident } = this.state;

      // Updates the only the updated service data in the services list (Immutable).
      let history = insert(0, Object.assign({}, incident.history[0], data), incident.history);

      this.setIncident(Object.assign({}, incident, { history }));
    };

    render() {
      let { incident } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          incident={incident}
          updateIncident={this.updateIncident}
          handleWebSocketNotification={this.handleWebSocketNotification}
        />
      );
    }
  };
};
