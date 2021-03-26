import React from 'react';

// apollo boost library statements 
//ApolloProvider, is a special type of React component that we'll use to provide data to all of the other components. We'll use the second, ApolloClient, to get that data when we're ready to use it.
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';


//With this code, we establish a new connection to the GraphQL server using Apollo. We could pass many other options and configuration settings into this constructor function. We'll use another one down the road, but for now this is all we need.
//Notice how we have to use an absolute path to the server? The React environment runs at localhost:3000, and the server environment runs at localhost:3001. So if we just used /graphl, as we've done previously, the requests would go to localhost:3000/graphql—which isn't the address for the back-end server. We'll touch more on this soon; for now, let's get up and running
//establish the connection to the back-end server's /graphql endpoint
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

function App() {
  //Note how we wrap the entire returning JSX code with <ApolloProvider>. Because we're passing the client variable in as the value for the client prop in the provider, everything between the JSX tags will eventually have access to the server's API data through the client we set up
  return (
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
