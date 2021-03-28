import gql from 'graphql-tag';



//Again, we import the gql tagged template literal functionality to create a GraphQL mutation called login. This will accept two variables, $email and $password, whose values we'll set up to be passed in as arguments when we integrate this with the login form page
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//In return, we expect the logged-in user's data and the token. With this token, we'll be able to perform other actions unique to the logged-in user.

//Next, we need to create the mutation for creating a new user through the signup form page. Let's add the following mutation below the LOGIN_USER one we just created with the following code:

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//This mutation is essentially the same as the LOGIN_USER one we created earlier, with the exception that we are now asking for an email address as well. The returning data should be the same, so we don't have to add the extra step for users to log in after signing up.