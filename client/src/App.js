import React from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';

import User from './User';
import withUserCount from './withUserCount';
import { BASE_STYLE, BUTTON_STYLE, LOAD_BUTTON_STYLE } from './constants';

class App extends React.Component {
  constructor() {
    super();

    this.loadMore = this.loadMore.bind(this);

    this.state = { numLoaded: 1 };
  }

  loadMore() {
    this.setState(({ numLoaded: prevLoaded }) => ({ numLoaded: prevLoaded + 1 }));
  }

  refresh() {
    window.location.reload();
  }

  render() {
    const { count, error, loading } = this.props;

    if (error) {
      return <div>{error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    const hasNext = this.state.numLoaded < count;
    const users = times(this.state.numLoaded, id => <User key={id} id={id} />);

    return (
      <div className="App" style={BASE_STYLE}>
        <h1>Users</h1>
        <div>{users}</div>
        {hasNext ? (
          <button onClick={this.loadMore} style={LOAD_BUTTON_STYLE}>
            Load More
          </button>
        ) : (
          <div>
            <span>All users have been loaded</span>
            <button onClick={this.refresh} style={{ ...BUTTON_STYLE, marginLeft: '18px' }}>
              Refresh
            </button>
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  count: PropTypes.number,
  error: PropTypes.shape({
    message: PropTypes.string
  }),
  false: PropTypes.bool
};

App.defaultProps = {
  count: 0,
  loading: false
};

export default withUserCount(App);
