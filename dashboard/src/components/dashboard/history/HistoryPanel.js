import React, { Component } from 'react';

import * as statusService from '../../../services/status';

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
      const history = await statusService.fetchServiceHistory();

      this.setState({ isLoading: false, history });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading, history } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    return <History events={history} />;
  }
}

export default HistoryPanel;
