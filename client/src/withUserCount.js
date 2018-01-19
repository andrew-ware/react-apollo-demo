import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  query GetUserCount {
    userCount
  }
`;

const options = {
  props: ({ data: { error, loading, userCount: count = 0 } }) => ({ error, loading, count })
};

export default graphql(query, options);
