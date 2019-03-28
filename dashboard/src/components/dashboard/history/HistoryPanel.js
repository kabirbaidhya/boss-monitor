import React, { Component } from 'react';

import * as historyService from '../../../services/status';

import History from './HistoryList';
import Spinner from '../../commons/Spinner';

class HistoryPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        history: [],
        isLoading: false,
    }
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
      let history = await historyService.fetchServiceHistory();

      this.setState({ isLoading: false, history });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  render() {
      let { isLoading, history } = this.state;

      if(isLoading) {
        return (
          <Spinner />
        );
      }

      return (
        <History events={history}/>
      );
  }
}

export default HistoryPanel;
