import React, { Component } from 'react';

import History from './HistoryList';
import CommonPanel from '../../commons/Panel';
import Spinner from '../../commons/Spinner';

import * as statusService from '../../../services/status';

class Panel extends Component {
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
      const history = await statusService.fetchServiceHistory();

      this.setState({ isLoading: false, history });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  render() {
      const { isLoading, history } = this.state;

      if(isLoading) {
        return (
          <Spinner />
        );
      }

      return (
        <CommonPanel title='History Logs' className='status-up'>
          <History events={history} />
        </CommonPanel>
      );
  }
}

export default Panel;
