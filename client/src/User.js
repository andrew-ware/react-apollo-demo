import React from 'react';
import PropTypes from 'prop-types';
import { isBoolean, isNil, isNumber, isObject, isString, merge } from 'lodash';

import withUserData from './withUserData';
import { BOX_WRAPPER_STYLE } from './constants';

function InfoLine({ label, value }) {
  if ([label, value].some(isNil)) {
    return null;
  }

  return (
    <div>
      {label}: {value}
    </div>
  );
}

function flattenData(data) {
  return Object.keys(data).reduce((flattened, key) => {
    const value = data[key];

    // __typename is a type key used by apollo,
    // since we're blindly iterating over the object keys, let's explicitly skip it
    if (key === '__typename') {
      return flattened;
    }

    if ([isString, isNumber, isBoolean].some(fn => fn(value))) {
      flattened[key] = value;
    } else if (isObject(value)) {
      merge(flattened, flattenData(value));
    }

    return flattened;
  }, {});
}

function User({ error, loading, user }) {
  if (error) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const userData = flattenData(user);
  const userInfo = Object.keys(userData).map(key => <InfoLine key={key} label={key} value={userData[key]} />);

  return <div style={BOX_WRAPPER_STYLE}>{userInfo}</div>;
}

User.propTypes = {
  id: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object
};

User.defaultProps = {
  loading: false,
  user: {}
};

export default withUserData(User);
