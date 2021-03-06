import React from 'react';

// apollo boost library statements 
//ApolloProvider, is a special type of React component that we'll use to provide data to all of the other components. We'll use the second, ApolloClient, to get that data when we're ready to use it.
import { ApolloProvider } from '@apollo/react-hooks';

import ApolloClient from 'apollo-boost';

import Header from './components/Header';

import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';


//BrowserRouter and Route are components that the React Router library provides. We renamed BrowserRouter to Router to make it easier to work with.
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//With this code, we establish a new connection to the GraphQL server using Apollo. We could pass many other options and configuration settings into this constructor function. We'll use another one down the road, but for now this is all we need.
//Notice how we have to use an absolute path to the server? The React environment runs at localhost:3000, and the server environment runs at localhost:3001. So if we just used /graphl, as we've done previously, the requests would go to localhost:3000/graphql—which isn't the address for the back-end server. We'll touch more on this soon; for now, let's get up and running
//establish the connection to the back-end server's /graphql endpoint
const client = new ApolloClient({

  //With this request configuration, we use the .setContext() method to set the HTTP request headers of every request to include the token, whether the request needs it or not. This is fine, because if the request doesn't need the token, our server-side resolver function won't check for it.

  //To recap, with auth.js we just created and implemented functionality that when a user signs up or logs in and receives an access token in return, we store it in localStorage. With this token, we can decode it to retrieve the logged-in user's nonsensitive data, check if the token is still valid, and use it to make requests to the server.
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  //Note how we wrap the entire returning JSX code with <ApolloProvider>. Because we're passing the client variable in as the value for the client prop in the provider, everything between the JSX tags will eventually have access to the server's API data through the client we set up

  //A few things have changed. We've wrapped the <div className="flex-column"> element in a Router component, which makes all of the child components on the page aware of the client-side routing that can take place now.
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              {/*The ? means this parameter is optional, so /profile and /profile/myUsername will both render the Profile component. Later on, we'll set up /profile to display the logged-in user's information*/}
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component= {NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
