import React, { Component } from 'react';

import Panel from '../../commons/Panel';
import History from './HistoryList';
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
        <Panel title='History Logs' className='status-up'>
          <History events={history} />
        </Panel>
      );
  }
}

export default Panel;
