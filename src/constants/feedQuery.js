/* @flow */

import gql from 'graphql-tag';

import { Card } from '../components';

export default gql`
  query loginQuery($username: String!, $password: String!) {
    student(username: $username, password: $password) {
      isAuthorized
      schedule {
        ...CourseFragment
        weekday
      }
      transcript {
        semesters {
          year
          gpa
        }
      }
    }
  }
  ${Card.fragment}
`;
