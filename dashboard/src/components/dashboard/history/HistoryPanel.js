import React, { Component } from 'react';

import * as historyService from '../../../services/history';

import History from './HistoryList';
import Spinner from '../../commons/Spinner';

/**
 * Fetch list of history from the API and
 * provides to HistoryList component.
 */
class HistoryPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.fetchHistory();
  }

  /**
   * Fetch list of history.
   *
   * @returns {Promise}
   */
  async fetchHistory() {
    try {
      this.setState({ isLoading: true });
      const history = await historyService.fetchIncidents();

      this.setState({ isLoading: false, history });
    } catch (err) {
      this.setState({ isLoading: false });
      console.log('error ', err);
      // TODO: Error
    }
  }

  render() {
    const { isLoading, history } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    return <History incidents={history} />;
  }
}

export default HistoryPanel;
