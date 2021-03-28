import React from 'react';

import Auth from '../utils/auth';

//With these statements, we're importing the useQuery Hook from Apollo's React Hooks library. This will allow us to make requests to the GraphQL server we connected to and made available to the application using the <ApolloProvider> component in App.js earlier
import { useQuery } from '@apollo/react-hooks';
//We also imported the QUERY_THOUGHTS query we just created. Now we just need to use the query with the imported Hook functionality, and we'll be able to query thought data!
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

import ThoughtList from  '../components/ThoughtList';

import FriendList from '../components/FriendList';

const Home = () => {
  // use useQuery hook to make query request
  //Apollo's react-hooks library provides a loading property to indicate that the request isn't done just yet. When it's finished and we have data returned from the server, that information is stored in the destructured data property.
  //Working with Promise-based functionality in React can get cumbersome. But with the loading property, we'll be able to conditionally render data based on whether or not there is data to even display.
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  //Next we'll get the thought data out of the query's response, because every GraphQL response comes in a big data object. In this case, we'll need to access data.thoughts. Add the following code below the useQuery() statement in the Home component definition:

  //use object destructuring to extract 'data' from the 'useQuery' Hook's response and rename is 'userData' to be more descriptive
  const {data: userData } = useQuery(QUERY_ME_BASIC);

  //What we're saying is, if data exists, store data.thoughts in the thoughts constant we just created. If data is undefined, then save an empty array to the thoughts component.
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  //If you're logged in, the loggedIn variable will be true; otherwise, it will be false
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {/*With this, we use a ternary operator to conditionally render the <ThoughtList> component. If the query hasn't completed and loading is still defined, we display a message to indicate just that. Once the query is complete and loading is undefined, we pass the thoughts array and a custom title to the <ThoughtList> component as props*/}
          {loading ? (
            <div> Loading...</div>
          ) : (<ThoughtList thoughts= {thoughts} title= "Some Feed for Thought(s)..."/>
          
          )}

        </div>
        {/*Now if the value of loggedIn is true and there is data in the userData variable we created from the useQuery() Hook, we'll render a righthand column <div> that holds our <FriendList> component!*/}
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
         </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
