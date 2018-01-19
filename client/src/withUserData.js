import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      info {
        name
      }
    }
  }
`;

const options = {
  props: ({ data: { error, loading, user = {} } }) => ({ error, loading, user })
};

export default graphql(query, options);
